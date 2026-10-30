import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Outlet, useLocation } from 'react-router-dom'
import Alert from '../ui/alert.jsx'
import DashboardHeader from './DashboardHeader.jsx'
import Sidebar from './Sidebar.jsx'
import { isApiConfigured } from '../../services/apiClient.js'
import { dashboardService } from '../../services/dashboardService.js'
import './dashboard.css'

function DashboardLayout() {
  const [summary, setSummary] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [summaryError, setSummaryError] = useState('')
  const [notificationError, setNotificationError] = useState('')
  const dismissedNotificationIds = useRef(new Set())
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let active = true

    dashboardService
      .getSummary()
      .then((data) => {
        if (active) setSummary(data)
      })
      .catch((requestError) => {
        if (active) {
          setSummaryError(
            requestError instanceof Error
              ? requestError.message
              : 'Não foi possível carregar o dashboard.',
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    const refresh = async () => {
      try {
        const nextNotifications = await dashboardService.getNotifications()
        if (active) {
          setNotifications(
            nextNotifications.filter(
              (notification) =>
                !dismissedNotificationIds.current.has(notification.id),
            ),
          )
          setNotificationError('')
        }
      } catch (requestError) {
        if (active) {
          setNotificationError(
            requestError instanceof Error
              ? requestError.message
              : 'Não foi possível carregar as notificações.',
          )
        }
      }
    }

    refresh()
    if (!isApiConfigured()) return () => {
      active = false
    }

    const intervalId = window.setInterval(refresh, 30_000)
    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [])

  const titleByPath = {
    '/dashboard': 'Dashboard Principal',
    '/consumo-diario': 'Consumo Diário',
    '/consumo-mensal': 'Consumo Mensal',
    '/alertas': 'Gerenciamento de Alertas',
    '/ativos': 'Acompanhamento de Ativo',
  }
  const title = titleByPath[location.pathname] ?? 'Dashboard Principal'

  function dismissNotification(notificationId) {
    dismissedNotificationIds.current.add(notificationId)
    setNotifications((current) =>
      current.filter((notification) => notification.id !== notificationId),
    )
  }

  return (
    <div className="dashboard-shell">
      <Sidebar
        activeAlertsValue={summary?.metrics.find(
          (metric) => metric.id === 'active-alerts',
        )?.value}
        carbonFootprint={summary?.carbonFootprint}
        notifications={notifications}
        onDismissNotification={dismissNotification}
      />
      <div className="dashboard-workspace">
        <DashboardHeader
          title={title}
          user={summary?.user}
        />
        <main className="dashboard-main">
          {summaryError && (
            <Alert variant="destructive">{summaryError}</Alert>
          )}
          {notificationError && (
            <Alert variant="destructive">{notificationError}</Alert>
          )}
          <motion.div
            className="dashboard-route-content"
            key={location.pathname}
            initial={reduceMotion ? false : { y: 5 }}
            animate={{ y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            <Outlet context={{ summary, summaryError }} />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

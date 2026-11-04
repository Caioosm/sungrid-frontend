import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DashboardIcon from './DashboardIcons.jsx'

const ACKNOWLEDGEMENT_DELAY = 1200
const FADE_DURATION = 800
const RESHOW_DELAY = 5 * 60 * 1000

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Consumo Diário', path: '/consumo-diario', icon: 'calendar' },
  { label: 'Consumo Mensal', path: '/consumo-mensal', icon: 'calendar' },
  { label: 'Alertas', path: '/alertas', icon: 'alert' },
  {
    label: 'Acompanhamento de Ativo',
    path: '/ativos',
    icon: 'activity',
  },
]

function Sidebar({
  activeAlertsValue,
  carbonFootprint,
  notifications = [],
}) {
  const latestNotification = notifications[0]
  const notificationId = latestNotification?.id
  const [cardState, setCardState] = useState({
    notificationId: null,
    phase: 'visible',
  })
  const acknowledgementTimer = useRef(null)
  const fadeTimer = useRef(null)
  const reshowTimer = useRef(null)
  const phase =
    cardState.notificationId === notificationId ? cardState.phase : 'visible'

  useEffect(
    () => () => {
      window.clearTimeout(acknowledgementTimer.current)
      window.clearTimeout(fadeTimer.current)
      window.clearTimeout(reshowTimer.current)
    },
    [notificationId],
  )

  function acknowledgeNotification(delay = ACKNOWLEDGEMENT_DELAY) {
    if (!latestNotification || phase !== 'visible') return

    window.clearTimeout(acknowledgementTimer.current)
    acknowledgementTimer.current = window.setTimeout(() => {
      setCardState({ notificationId, phase: 'fading' })
      fadeTimer.current = window.setTimeout(() => {
        setCardState({ notificationId, phase: 'hidden' })
        reshowTimer.current = window.setTimeout(() => {
          setCardState({ notificationId, phase: 'visible' })
        }, RESHOW_DELAY)
      }, FADE_DURATION)
    }, delay)
  }

  function cancelAcknowledgement() {
    if (phase === 'visible') {
      window.clearTimeout(acknowledgementTimer.current)
    }
  }

  return (
    <aside className="dashboard-sidebar">
      <Link
        className="brand-lockup"
        to="/dashboard"
        aria-label="SunGrid, início"
      >
        <img src="/sungrid-logo.jpg" alt="" />
        <span>SunGrid</span>
      </Link>

      <nav className="sidebar-navigation" aria-label="Navegação principal">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
            }
            end={item.path === '/dashboard'}
            key={item.path}
            to={item.path}
          >
            <DashboardIcon name={item.icon} size={17} />
            <span>{item.label}</span>
            {item.path === '/dashboard' && (
              <span className="sidebar-active-mark" aria-hidden="true" />
            )}
          </NavLink>
        ))}
      </nav>

      <section className="carbon-card" aria-label="Alertas recentes">
        <div
          aria-hidden={Boolean(latestNotification) && phase !== 'visible'}
          className={`carbon-card__alert carbon-card__alert--${phase}`}
          onBlurCapture={cancelAcknowledgement}
          onFocusCapture={() => acknowledgeNotification()}
          onPointerEnter={() => acknowledgeNotification()}
          onPointerLeave={cancelAcknowledgement}
        >
          {latestNotification ? (
            <>
              <div className="carbon-card__heading">
                <DashboardIcon name="alert" size={15} />
                <span>Alertas ativos</span>
                <span className="carbon-card__count">
                  {activeAlertsValue ?? '—'}
                </span>
              </div>
              <article className="carbon-card__notification">
                <div className="carbon-card__notification-heading">
                  <strong>{latestNotification.title}</strong>
                  <button
                    type="button"
                    aria-label="Marcar alerta como visto"
                    onClick={() => acknowledgeNotification(0)}
                  >
                    <DashboardIcon name="close" size={13} />
                  </button>
                </div>
                <p>{latestNotification.message}</p>
                <span className="carbon-card__time">
                  {latestNotification.occurredAt}
                </span>
              </article>
              <Link className="carbon-card__link" to="/alertas">
                Ver todos os alertas
              </Link>
            </>
          ) : (
            <div className="carbon-card__heading">
              <DashboardIcon name="alert" size={15} />
              <span>Alertas ativos</span>
              <span className="carbon-card__count">
                {activeAlertsValue ?? '—'}
              </span>
            </div>
          )}
        </div>
        {!latestNotification && (
          <p>Nenhum alerta ativo. A instalação está operando normalmente.</p>
        )}
        {carbonFootprint && (
          <p className="carbon-card__impact">
            <DashboardIcon name="leaf" size={12} />
            <span>
              {carbonFootprint.reducedKg} kg de CO₂ reduzidos{' '}
              {carbonFootprint.periodLabel}
            </span>
          </p>
        )}
      </section>
    </aside>
  )
}

export default Sidebar

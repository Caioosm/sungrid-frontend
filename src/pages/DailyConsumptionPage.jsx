import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Alert from '../components/ui/alert.jsx'
import DailyConsumptionChart from '../components/dashboard/DailyConsumptionChart.jsx'
import { isApiConfigured } from '../services/apiClient.js'
import { dashboardService } from '../services/dashboardService.js'

function DailyConsumptionPage() {
  const [dailyData, setDailyData] = useState(null)
  const [error, setError] = useState('')
  const { summaryError } = useOutletContext()

  useEffect(() => {
    let active = true

    dashboardService
      .getDailyConsumption()
      .then((data) => {
        if (active) setDailyData(data)
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Não foi possível carregar o consumo diário.',
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (!dailyData) {
    return (
      <>
        {error && <Alert variant="destructive">{error}</Alert>}
        <div className="dashboard-loading" role="status">
          {error || summaryError
            ? 'Não foi possível carregar os dados de consumo diário.'
            : 'Carregando consumo diário...'}
        </div>
      </>
    )
  }

  return (
    <>
      {!isApiConfigured() && (
        <p className="demo-data-note">Dados demonstrativos</p>
      )}
      <DailyConsumptionChart data={dailyData} />
      <section
        className="daily-metrics-grid"
        aria-label="Indicadores de consumo diário"
      >
        {dailyData.metrics.map((metric) => (
          <article className="daily-metric-card" key={metric.id}>
            <h2>{metric.label}</h2>
            <p
              className={`daily-metric-card__value${metric.tone ? ` daily-metric-card__value--${metric.tone}` : ''}`}
            >
              {metric.value}
            </p>
            <p
              className={`daily-metric-card__caption${metric.tone === 'positive' ? ' daily-metric-card__caption--positive' : ''}`}
            >
              {metric.caption}
            </p>
          </article>
        ))}
      </section>
    </>
  )
}

export default DailyConsumptionPage

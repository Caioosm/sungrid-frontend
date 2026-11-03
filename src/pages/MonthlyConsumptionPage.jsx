import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Alert from '../components/ui/alert.jsx'
import MetricCard from '../components/dashboard/MetricCard.jsx'
import MonthlyConsumptionChart from '../components/dashboard/MonthlyConsumptionChart.jsx'
import { isApiConfigured } from '../services/apiClient.js'
import { dashboardService } from '../services/dashboardService.js'

function MonthlyConsumptionPage() {
  const [monthlyData, setMonthlyData] = useState(null)
  const [error, setError] = useState('')
  const { summaryError } = useOutletContext()

  useEffect(() => {
    let active = true

    dashboardService
      .getMonthlyConsumption()
      .then((data) => {
        if (active) setMonthlyData(data)
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Não foi possível carregar o consumo mensal.',
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (!monthlyData) {
    return (
      <>
        {error && <Alert variant="destructive">{error}</Alert>}
        <div className="dashboard-loading" role="status">
          {error || summaryError
            ? 'Não foi possível carregar os dados de consumo mensal.'
            : 'Carregando consumo mensal...'}
        </div>
      </>
    )
  }

  return (
    <>
      {!isApiConfigured() && (
        <p className="demo-data-note">Dados demonstrativos</p>
      )}
      <section
        className="metrics-grid monthly-metrics-grid"
        aria-label="Indicadores de consumo mensal"
      >
        {monthlyData.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>
      <MonthlyConsumptionChart data={monthlyData} />
      <div className="monthly-insights-grid">
        <section
          className="monthly-insight-card"
          aria-labelledby="monthly-comparison-title"
        >
          <h2 id="monthly-comparison-title">
            {monthlyData.comparison.title}
          </h2>
          <p>{monthlyData.comparison.description}</p>
          <div className="comparison-period">
            <div className="comparison-period__heading">
              <span>{monthlyData.comparison.current.label}</span>
              <strong>{monthlyData.comparison.current.value}</strong>
            </div>
            <div
              className="comparison-bar"
              role="meter"
              aria-label={`Consumo ${monthlyData.comparison.current.label}`}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={monthlyData.comparison.current.barPercentage}
            >
              <span
                className="comparison-bar__fill comparison-bar__fill--current"
                style={{
                  width: `${monthlyData.comparison.current.barPercentage}%`,
                }}
              />
            </div>
          </div>
          <div className="comparison-period">
            <div className="comparison-period__heading">
              <span>{monthlyData.comparison.previous.label}</span>
              <strong>{monthlyData.comparison.previous.value}</strong>
            </div>
            <div
              className="comparison-bar"
              role="meter"
              aria-label={`Consumo ${monthlyData.comparison.previous.label}`}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={monthlyData.comparison.previous.barPercentage}
            >
              <span
                className="comparison-bar__fill comparison-bar__fill--previous"
                style={{
                  width: `${monthlyData.comparison.previous.barPercentage}%`,
                }}
              />
            </div>
          </div>
        </section>
        <section
          className="monthly-insight-card"
          aria-labelledby="monthly-savings-title"
        >
          <h2 id="monthly-savings-title">
            {monthlyData.estimatedSavings.title}
          </h2>
          <p>{monthlyData.estimatedSavings.description}</p>
          <div className="savings-values">
            <div className="savings-value">
              <span>Redução Total</span>
              <strong className="savings-value__reduction">
                {monthlyData.estimatedSavings.totalReduction}
              </strong>
            </div>
            <div className="savings-value">
              <span>Financeiro Estimado</span>
              <strong className="savings-value__financial">
                {monthlyData.estimatedSavings.estimatedFinancial}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default MonthlyConsumptionPage

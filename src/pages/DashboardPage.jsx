import { useOutletContext } from 'react-router-dom'
import MetricCard from '../components/dashboard/MetricCard.jsx'
import WeeklyConsumptionChart from '../components/dashboard/WeeklyConsumptionChart.jsx'

function DashboardPage() {
  const { summary, summaryError } = useOutletContext()

  if (!summary) {
    return (
      <div className="dashboard-loading" role="status">
        {summaryError
          ? 'Não foi possível carregar os dados do dashboard.'
          : 'Carregando dados do dashboard...'}
      </div>
    )
  }

  return (
    <>
      {!import.meta.env.VITE_API_BASE_URL && (
        <p className="demo-data-note">
          DADOS DEMONSTRATIVOS!!
        </p>
      )}
      <section className="metrics-grid" aria-label="Indicadores de energia">
        {summary.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>
      <WeeklyConsumptionChart data={summary.weeklyConsumption} />
    </>
  )
}

export default DashboardPage

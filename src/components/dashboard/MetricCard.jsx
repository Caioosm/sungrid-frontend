import DashboardIcon from './DashboardIcons.jsx'

function MetricCard({ metric }) {
  const TrendIcon = metric.trendDirection === 'negative' ? 'arrowDown' : 'arrowUp'

  return (
    <article className="metric-card">
      <div className="metric-card__topline">
        <h2>{metric.label}</h2>
        <span className={`metric-icon metric-icon--${metric.tone}`}>
          <DashboardIcon name={metric.icon} size={18} />
        </span>
      </div>
      <p className="metric-card__value">{metric.value}</p>
      <p className={`metric-card__trend metric-card__trend--${metric.trendDirection}`}>
        {metric.trendDirection !== 'warning' && (
          <DashboardIcon name={TrendIcon} size={13} />
        )}
        {metric.trendDirection === 'warning' && (
          <DashboardIcon name="alert" size={13} />
        )}
        <span>{metric.trend}</span>
      </p>
    </article>
  )
}

export default MetricCard

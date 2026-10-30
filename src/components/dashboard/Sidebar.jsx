import { Link, NavLink } from 'react-router-dom'
import DashboardIcon from './DashboardIcons.jsx'

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
  onDismissNotification,
}) {
  const latestNotification = notifications[0]

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
        <div className="carbon-card__heading">
          <DashboardIcon name="alert" size={15} />
          <span>Alertas ativos</span>
          <span className="carbon-card__count">{activeAlertsValue ?? '—'}</span>
        </div>
        {latestNotification ? (
          <article className="carbon-card__notification">
            <div className="carbon-card__notification-heading">
              <strong>{latestNotification.title}</strong>
              <button
                type="button"
                aria-label={`Dispensar alerta: ${latestNotification.title}`}
                onClick={() => onDismissNotification(latestNotification.id)}
              >
                <DashboardIcon name="close" size={13} />
              </button>
            </div>
            <p>{latestNotification.message}</p>
            <span className="carbon-card__time">
              {latestNotification.occurredAt}
            </span>
          </article>
        ) : (
          <p>Nenhum alerta ativo. A instalação está operando normalmente.</p>
        )}
        <Link className="carbon-card__link" to="/alertas">
          Ver todos os alertas
        </Link>
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

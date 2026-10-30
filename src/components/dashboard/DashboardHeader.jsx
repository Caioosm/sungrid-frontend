import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dashboardService } from '../../services/dashboardService.js'
import DashboardIcon from './DashboardIcons.jsx'

function DashboardHeader({ title, user }) {
  const [query, setQuery] = useState('')
  const [assets, setAssets] = useState([])
  const [searchError, setSearchError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const normalizedQuery = query.trim()

  useEffect(() => {
    if (!normalizedQuery) {
      return undefined
    }

    let active = true
    const timeoutId = window.setTimeout(() => {
      dashboardService
        .getAssets(normalizedQuery)
        .then((results) => {
          if (active) {
            setAssets(results)
            setSearchError('')
            setIsSearching(false)
          }
        })
        .catch((requestError) => {
          if (active) {
            setAssets([])
            setSearchError(
              requestError instanceof Error
                ? requestError.message
                : 'Não foi possível pesquisar os ativos.',
            )
            setIsSearching(false)
          }
        })
    }, 250)

    return () => {
      active = false
      window.clearTimeout(timeoutId)
    }
  }, [normalizedQuery])

  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
      <div className="dashboard-header__tools">
        <div className="asset-search">
          <DashboardIcon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setAssets([])
              setSearchError('')
              setIsSearching(Boolean(event.target.value.trim()))
            }}
            placeholder="Pesquisar ativos..."
            aria-label="Pesquisar ativos"
            aria-controls="asset-search-results"
            aria-expanded={Boolean(normalizedQuery)}
          />
          {normalizedQuery && (
            <ul className="asset-search-results" id="asset-search-results">
              {searchError ? (
                <li role="alert">{searchError}</li>
              ) : assets.length > 0 ? (
                assets.map((asset) => (
                  <li key={asset.id}>
                    <span>{asset.name}</span>
                    <span
                      className={
                        asset.status === 'Operacional'
                          ? 'asset-search-status asset-search-status--ok'
                          : 'asset-search-status asset-search-status--warning'
                      }
                    >
                      {asset.status}
                    </span>
                  </li>
                ))
              ) : (
                <li role="status">
                  {isSearching
                    ? 'Pesquisando ativos...'
                    : 'Nenhum ativo encontrado.'}
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="dashboard-user">
          <span className="dashboard-user__avatar" aria-hidden="true">
            {user?.name
              ?.split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('') || 'SG'}
          </span>
          <span className="dashboard-user__details">
            <strong>{user?.name ?? 'Usuário SunGrid'}</strong>
            <span>{user?.role ?? 'Operador'}</span>
          </span>
        </div>
        <Link className="dashboard-logout" to="/login">
          Sair
        </Link>
      </div>
    </header>
  )
}

export default DashboardHeader

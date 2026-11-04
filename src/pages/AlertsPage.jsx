import { useEffect, useState } from 'react'
import Alert from '../components/ui/alert.jsx'
import { dashboardService } from '../services/dashboardService.js'

const statusFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'ativo', label: 'Ativos' },
  { value: 'resolvido', label: 'Resolvidos' },
]

const priorityFilters = [
  { value: 'all', label: 'Todas Prioridades' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
]

const statusLabels = {
  ativo: 'Ativo',
  resolvido: 'Resolvido',
}

const priorityLabels = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

function formatDateTime(value) {
  const date = new Date(value)
  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`
}

function escapeCsvCell(value) {
  const text = String(value ?? '')
  const safeText = /^[\t\r\n ]*[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safeText.replaceAll('"', '""')}"`
}

function exportAlerts(alerts) {
  const rows = [
    ['Status', 'Data / Hora', 'Descrição', 'Prioridade'],
    ...alerts.map((alert) => [
      statusLabels[alert.status] ?? alert.status,
      formatDateTime(alert.createdAt),
      alert.description,
      priorityLabels[alert.priority] ?? alert.priority,
    ]),
  ]
  const csv = `\uFEFF${rows.map((row) => row.map(escapeCsvCell).join(';')).join('\r\n')}`
  const file = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = `relatorio-alertas-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

function AlertsPage() {
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [result, setResult] = useState({
    filterKey: '',
    alerts: [],
    error: '',
  })
  const filterKey = `${status}:${priority}`

  useEffect(() => {
    let active = true

    dashboardService
      .getAlerts({ status, priority })
      .then((data) => {
        if (active) setResult({ filterKey, alerts: data, error: '' })
      })
      .catch((requestError) => {
        if (active) {
          setResult({
            filterKey,
            alerts: [],
            error:
              requestError instanceof Error
                ? requestError.message
                : 'Não foi possível carregar os alertas.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [filterKey, priority, status])

  const isLoading = result.filterKey !== filterKey
  const alerts = isLoading ? [] : result.alerts
  const error = isLoading ? '' : result.error

  return (
    <section className="alerts-page" aria-label="Gerenciamento de alertas">
      <div className="alerts-toolbar">
        <span className="alerts-toolbar__label">Filtrar por:</span>
        <div className="alerts-filter-group" role="group" aria-label="Status">
          {statusFilters.map((filter) => (
            <button
              aria-pressed={status === filter.value}
              className="alerts-filter-button"
              key={filter.value}
              onClick={() => setStatus(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div
          className="alerts-filter-group alerts-filter-group--priority"
          role="group"
          aria-label="Prioridade"
        >
          {priorityFilters.map((filter) => (
            <button
              aria-pressed={priority === filter.value}
              className="alerts-filter-button"
              key={filter.value}
              onClick={() => setPriority(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button
          className="alerts-export-button"
          disabled={isLoading || alerts.length === 0}
          onClick={() => exportAlerts(alerts)}
          type="button"
        >
          Exportar Relatório
        </button>
      </div>

      {error && <Alert variant="destructive">{error}</Alert>}

      {!error && (
        <div className="alerts-table-card">
          {isLoading ? (
            <p className="alerts-feedback" role="status">
              Carregando alertas...
            </p>
          ) : alerts.length === 0 ? (
            <p className="alerts-feedback" role="status">
              Nenhum alerta encontrado para os filtros selecionados.
            </p>
          ) : (
            <>
              <div className="alerts-table-scroll">
                <table className="alerts-table">
                  <thead>
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Data / Hora</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Prioridade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((alert) => (
                      <tr key={alert.id}>
                        <td>
                          <span
                            className={`alert-badge alert-badge--${alert.status}`}
                          >
                            {statusLabels[alert.status] ?? alert.status}
                          </span>
                        </td>
                        <td className="alerts-table__date">
                          {formatDateTime(alert.createdAt)}
                        </td>
                        <td className="alerts-table__description">
                          {alert.description}
                        </td>
                        <td>
                          <span
                            className={`alert-badge alert-badge--${alert.priority}`}
                          >
                            {priorityLabels[alert.priority] ?? alert.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="alerts-result-count" aria-live="polite">
                {alerts.length}{' '}
                {alerts.length === 1
                  ? 'alerta encontrado'
                  : 'alertas encontrados'}
              </p>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default AlertsPage

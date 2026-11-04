import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Alert from '../components/ui/alert.jsx'
import AssetHistoryChart from '../components/dashboard/AssetHistoryChart.jsx'
import DashboardIcon from '../components/dashboard/DashboardIcons.jsx'
import { isApiConfigured } from '../services/apiClient.js'
import { dashboardService } from '../services/dashboardService.js'

const demoAssetId = 1

const statusLabels = {
  operando: 'Operando',
  alerta: 'Em alerta',
  offline: 'Offline',
  manutencao: 'Em manutenção',
}

function AssetTrackingPage() {
  const [searchParams] = useSearchParams()
  const assetId = searchParams.get('asset') || demoAssetId
  const [retryCount, setRetryCount] = useState(0)
  const [assetResult, setAssetResult] = useState({
    requestKey: '',
    data: null,
    error: '',
  })
  const [actionFeedback, setActionFeedback] = useState('')
  const [pendingAction, setPendingAction] = useState('')
  const requestKey = `${assetId}:${retryCount}`

  useEffect(() => {
    let active = true
    dashboardService
      .getAssetOverview(assetId)
      .then((data) => {
        if (active) setAssetResult({ requestKey, data, error: '' })
      })
      .catch((requestError) => {
        if (active) {
          setAssetResult({
            requestKey,
            data: null,
            error:
              requestError instanceof Error
                ? requestError.message
                : 'Não foi possível carregar os dados do ativo.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [assetId, requestKey])

  const isLoading = assetResult.requestKey !== requestKey
  const assetData = isLoading ? null : assetResult.data
  const error = isLoading ? '' : assetResult.error

  async function runAssetAction(action) {
    setPendingAction(action)
    setActionFeedback('')

    try {
      const result =
        action === 'restart'
          ? await dashboardService.restartAsset(assetData.asset.id)
          : await dashboardService.requestAssetSupport(assetData.asset.id)

      setActionFeedback(
        result?.message ??
          (action === 'restart'
            ? 'Solicitação de reinício enviada.'
            : 'Chamado solicitado com sucesso.'),
      )

      dashboardService
        .getAssetOverview(assetData.asset.id)
        .then((data) =>
          setAssetResult({ requestKey, data, error: '' }),
        )
        .catch((refreshError) =>
          setAssetResult({
            requestKey,
            data: assetData,
            error:
              refreshError instanceof Error
                ? `A ação foi enviada, mas não foi possível atualizar os dados: ${refreshError.message}`
                : 'A ação foi enviada, mas não foi possível atualizar os dados do ativo.',
          }),
        )
    } catch (requestError) {
      setAssetResult({
        requestKey,
        data: assetData,
        error:
          requestError instanceof Error
            ? requestError.message
            : 'Não foi possível concluir a ação para este ativo.',
      })
    } finally {
      setPendingAction('')
    }
  }

  function handleRestart() {
    if (
      window.confirm(
        `Confirma o reinício do ativo ${assetData.asset.code}?`,
      )
    ) {
      runAssetAction('restart')
    }
  }

  if (isLoading) {
    return (
      <div className="dashboard-loading" role="status">
        Carregando dados do ativo...
      </div>
    )
  }

  if (!assetData) {
    return (
      <>
        {error && <Alert variant="destructive">{error}</Alert>}
        <button
          className="alerts-export-button asset-retry-button"
          onClick={() => setRetryCount((current) => current + 1)}
          type="button"
        >
          Tentar novamente
        </button>
      </>
    )
  }

  const { asset, metrics, history } = assetData

  return (
    <section className="asset-page" aria-label="Acompanhamento de ativo">
      {!isApiConfigured() && (
        <p className="demo-data-note">Dados demonstrativos</p>
      )}

      {error && <Alert variant="destructive">{error}</Alert>}
      {actionFeedback && <Alert>{actionFeedback}</Alert>}

      <section className="asset-summary" aria-label="Ativo selecionado">
        <div className="asset-summary__identity">
          <div className="asset-summary__title">
            <h2>{asset.name}</h2>
            <span className={`asset-status asset-status--${asset.status}`}>
              {statusLabels[asset.status] ?? asset.status}
            </span>
          </div>
          <p>
            ID do Ativo: #{asset.code}
            {asset.manufacturer && (
              <>
                <span aria-hidden="true"> | </span>
                Fabricante: {asset.manufacturer}
              </>
            )}
          </p>
        </div>
        <div className="asset-summary__actions">
          <button
            className="asset-action-button asset-action-button--secondary"
            disabled={Boolean(pendingAction)}
            onClick={handleRestart}
            type="button"
          >
            {pendingAction === 'restart' ? 'Reiniciando...' : 'Reiniciar Ativo'}
          </button>
          <button
            className="asset-action-button asset-action-button--primary"
            disabled={Boolean(pendingAction)}
            onClick={() => runAssetAction('support')}
            type="button"
          >
            {pendingAction === 'support'
              ? 'Solicitando...'
              : 'Solucionar Chamado'}
          </button>
        </div>
      </section>

      <section className="asset-metrics-grid" aria-label="Métricas do ativo">
        {metrics.map((metric) => (
          <article
            className={`asset-metric-card asset-metric-card--${metric.id}`}
            key={metric.id}
          >
            <div className="asset-metric-card__heading">
              <h3>{metric.label}</h3>
              <span
                className={`asset-metric-card__icon asset-metric-card__icon--${metric.tone}`}
              >
                <DashboardIcon name={metric.icon} size={16} />
              </span>
            </div>
            <p className="asset-metric-card__value">{metric.value}</p>
            <p
              className={`asset-metric-card__caption asset-metric-card__caption--${metric.tone}`}
            >
              <DashboardIcon
                name={metric.tone === 'warning' ? 'alert' : 'arrowUp'}
                size={12}
              />
              <span>{metric.caption}</span>
            </p>
          </article>
        ))}
      </section>

      <AssetHistoryChart data={history} />
    </section>
  )
}

export default AssetTrackingPage

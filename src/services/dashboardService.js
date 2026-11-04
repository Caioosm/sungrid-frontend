import { apiRequest, isApiConfigured } from './apiClient.js'
import {
  dashboardDemoAlerts,
  dashboardDemoAssetOverview,
  dashboardDemoAssets,
  dashboardDemoDailyConsumption,
  dashboardDemoMonthlyConsumption,
  dashboardDemoNotifications,
  dashboardDemoSummary,
} from '../data/dashboardDemoData.js'

function getLocalDate() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}

export const dashboardService = {
  //Service puxa da classe de dados simulados: dashboardDemoData.js
  
  getSummary() {
    if (!isApiConfigured()) {
      return Promise.resolve(dashboardDemoSummary)
    }

    return apiRequest('/dashboard/summary')
  },

  getDailyConsumption(date = getLocalDate()) {
    if (!isApiConfigured()) {
      return Promise.resolve(dashboardDemoDailyConsumption)
    }

    return apiRequest(`/consumption/daily?date=${encodeURIComponent(date)}`)
  },

  getMonthlyConsumption(month = getLocalDate().slice(0, 7)) {
    if (!isApiConfigured()) {
      return Promise.resolve(dashboardDemoMonthlyConsumption)
    }

    return apiRequest(`/consumption/monthly?month=${encodeURIComponent(month)}`)
  },

  getNotifications() {
    if (!isApiConfigured()) {
      return Promise.resolve(dashboardDemoNotifications)
    }

    return apiRequest('/notifications')
  },

  getAlerts({ status = 'all', priority = 'all' } = {}) {
    const params = new URLSearchParams()
    if (status !== 'all') params.set('status', status)
    if (priority !== 'all') params.set('priority', priority)
    const query = params.toString()

    if (!isApiConfigured()) {
      return Promise.resolve(
        dashboardDemoAlerts.filter(
          (alert) =>
            (status === 'all' || alert.status === status) &&
            (priority === 'all' || alert.priority === priority),
        ),
      )
    }

    return apiRequest(`/alerts${query ? `?${query}` : ''}`)
  },

  getAssets(search) {
    if (!isApiConfigured()) {
      const normalizedSearch = search.toLocaleLowerCase('pt-BR')
      return Promise.resolve(
        dashboardDemoAssets.filter((asset) =>
          asset.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch) ||
          asset.code.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
        ),
      )
    }

    return apiRequest(`/assets?search=${encodeURIComponent(search)}`)
  },

  getAssetOverview(assetId) {
    if (!isApiConfigured()) {
      if (String(assetId) !== String(dashboardDemoAssetOverview.asset.id)) {
        return Promise.reject(
          new Error('Não há dados demonstrativos para este ativo.'),
        )
      }

      return Promise.resolve(dashboardDemoAssetOverview)
    }

    return apiRequest(`/assets/${encodeURIComponent(assetId)}/overview`)
  },

  restartAsset(assetId) {
    return apiRequest(`/assets/${encodeURIComponent(assetId)}/restart`, {
      method: 'POST',
      body: {},
    })
  },

  requestAssetSupport(assetId) {
    return apiRequest(`/assets/${encodeURIComponent(assetId)}/tickets`, {
      method: 'POST',
      body: {},
    })
  },
}

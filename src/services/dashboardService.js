import { apiRequest, isApiConfigured } from './apiClient.js'
import {
  dashboardDemoAssets,
  dashboardDemoDailyConsumption,
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

  getNotifications() {
    if (!isApiConfigured()) {
      return Promise.resolve(dashboardDemoNotifications)
    }

    return apiRequest('/notifications')
  },

  getAssets(search) {
    if (!isApiConfigured()) {
      const normalizedSearch = search.toLocaleLowerCase('pt-BR')
      return Promise.resolve(
        dashboardDemoAssets.filter((asset) =>
          asset.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
        ),
      )
    }

    return apiRequest(`/assets?search=${encodeURIComponent(search)}`)
  },
}

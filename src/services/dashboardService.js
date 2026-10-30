import { apiRequest, isApiConfigured } from './apiClient.js'
import {
  dashboardDemoAssets,
  dashboardDemoNotifications,
  dashboardDemoSummary,
} from '../data/dashboardDemoData.js'

export const dashboardService = {
  //Service puxa da classe de dados simulados: dashboardDemoData.js
  
  getSummary() {
    if (!isApiConfigured()) {
      return Promise.resolve(dashboardDemoSummary)
    }

    return apiRequest('/dashboard/summary')
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

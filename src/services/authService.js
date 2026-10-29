import { apiRequest } from './apiClient.js'

export const authService = {
  login(credentials) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  },

  register(user) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: user,
    })
  },

  requestPasswordReset(email) {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    })
  },
}

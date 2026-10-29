const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

export async function apiRequest(path, { body, ...options } = {}) {
  if (!apiBaseUrl) {
    throw new Error(
      'Erro' + Error
      // 'A API ainda não foi configurada. Defina VITE_API_BASE_URL no arquivo .env.',
    )
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })

  const responseText = await response.text()
  let payload = null

  if (responseText) {
    try {
      payload = JSON.parse(responseText)
    } catch {
      payload = { message: responseText }
    }
  }

  if (!response.ok) {
    throw new Error(
      payload?.message || `A solicitação falhou (HTTP ${response.status}).`,
    )
  }

  return payload
}

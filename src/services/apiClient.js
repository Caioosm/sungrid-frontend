const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

export function isApiConfigured() {
  return Boolean(apiBaseUrl)
}

export async function apiRequest(path, { body, ...options } = {}) {
  if (!isApiConfigured()) {
    throw new Error('Defina VITE_API_BASE_URL para conectar a API.')
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
    } catch (parseError) {
      if (response.ok) {
        throw new Error('A API retornou uma resposta que não é JSON válido.', {
          cause: parseError,
        })
      }

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

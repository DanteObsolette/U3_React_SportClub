const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api"

export function getApiBase() {
  return API_BASE
}

function getAuthHeaders() {
  const token = localStorage.getItem("token")
  const headers = { "Content-Type": "application/json" }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export function flattenErrors(errors) {
  if (!errors || typeof errors !== "object") return []

  const lines = []

  Object.keys(errors).forEach((key) => {
    const value = errors[key]

    if (Array.isArray(value)) {
      value.forEach((item) => lines.push(`${key}: ${String(item)}`))
    } else if (value) {
      lines.push(String(value))
    }
  })

  return lines
}

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE.replace(/\/$/, "")}${path}`
  const init = {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  }

  if (init.json !== undefined) {
    init.body = JSON.stringify(init.json)
    delete init.json
  }

  let response

  try {
    response = await fetch(url, init)
  } catch {
    throw new Error(
      `No se pudo conectar con la API (${getApiBase()}). Verifique que el backend esté ejecutándose en http://localhost:3000`,
    )
  }

  let body = null

  try {
    body = await response.json()
  } catch {
    body = {}
  }

  if (!response.ok) {
    const error = new Error(body.message || "Error en la solicitud.")
    error.status = response.status
    error.body = body
    throw error
  }

  return body
}

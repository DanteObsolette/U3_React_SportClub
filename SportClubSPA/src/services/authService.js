import { apiRequest } from "./apiClient"

const TOKEN_KEY = "token"
const USER_KEY = "user"

export async function loginUser({ email, password }) {
  return apiRequest("/auth/login", {
    method: "POST",
    json: {
      email: String(email).trim().toLowerCase(),
      password,
    },
  })
}

export async function registerUser(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    json: payload,
  })
}

export async function getMe() {
  return apiRequest("/auth/me", { method: "GET" })
}

export async function updateMe(payload) {
  return apiRequest("/auth/me", {
    method: "PUT",
    json: payload,
  })
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function mergeSessionFromUser(user) {
  if (!user) return

  const previous = getUser() || {}
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({ ...previous, ...user, token: previous.token || getToken() }),
  )
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getDisplayName(user = getUser()) {
  return user?.full_name || user?.name || user?.email || ""
}

export function isAuthenticated() {
  return Boolean(getToken())
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function redirectPathForRole(role) {
  if (role === "admin") return "/admin/dashboard"
  if (role === "coach") return "/coach/dashboard"
  return "/user/dashboard"
}

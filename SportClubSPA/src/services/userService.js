import { apiRequest } from "./apiClient"

export function getUsers() {
  return apiRequest("/users", { method: "GET" })
}

export function createUser(userData) {
  return apiRequest("/users", {
    method: "POST",
    json: userData,
  })
}

export function updateUser(id, userData) {
  return apiRequest(`/users/${encodeURIComponent(id)}`, {
    method: "PUT",
    json: userData,
  })
}

export function deleteUser(id) {
  return apiRequest(`/users/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}

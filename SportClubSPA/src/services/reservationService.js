import { getSports } from "./sportService"

const STORAGE_KEY = "sportclub_reservations"

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    return data && typeof data === "object" ? data : {}
  } catch {
    return {}
  }
}

function writeAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export async function getAvailableClasses() {
  const response = await getSports()
  const sports = Array.isArray(response.data) ? response.data : []
  return sports.filter((sport) => sport.status)
}

export function getUserReservations(userId) {
  if (!userId) return []

  const all = readAll()
  return Array.isArray(all[String(userId)]) ? all[String(userId)] : []
}

export function createReservation(userId, sport) {
  const reservations = getUserReservations(userId)
  const alreadyReserved = reservations.some((item) => item.sportId === sport.id)

  if (alreadyReserved) {
    throw new Error("Ya tienes una reserva activa para esta clase.")
  }

  const reservation = {
    id: `${sport.id}-${Date.now()}`,
    sportId: sport.id,
    sportName: sport.name,
    objective: sport.objective,
    duration: sport.duration,
    reservedAt: new Date().toISOString(),
    userId,
  }

  const all = readAll()
  all[String(userId)] = [reservation, ...reservations]
  writeAll(all)

  return reservation
}

export function cancelReservation(userId, reservationId) {
  const all = readAll()
  const current = getUserReservations(userId)
  const filtered = current.filter((item) => item.id !== reservationId)

  all[String(userId)] = filtered
  writeAll(all)

  return filtered
}

export function isSportReserved(userId, sportId) {
  return getUserReservations(userId).some((item) => item.sportId === sportId)
}

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

export function formatSpanishDate(dateString) {
  if (!dateString) return "—"

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "—"

  const day = String(date.getDate()).padStart(2, "0")
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()

  return `${day} de ${month} de ${year}`
}

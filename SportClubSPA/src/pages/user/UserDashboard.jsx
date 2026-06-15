import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getDisplayName, getUser } from "../../services/authService"
import {
  cancelReservation,
  createReservation,
  getAvailableClasses,
  getUserReservations,
  isSportReserved,
} from "../../services/reservationService"

function UserDashboard() {
  const user = getUser()
  const displayName = getDisplayName(user)
  const [classes, setClasses] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const availableClasses = await getAvailableClasses()
      setClasses(availableClasses)
      setReservations(getUserReservations(user?.id))
    } catch (error) {
      Swal.fire("Error", error.message || "No se pudieron cargar las clases disponibles.", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user?.id])

  const handleReserve = async (sport) => {
    const result = await Swal.fire({
      title: "¿Confirmar reserva?",
      html: `<strong>${sport.name}</strong><br>Duración: ${sport.duration} min`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Reservar",
      cancelButtonText: "Cancelar",
    })

    if (!result.isConfirmed) return

    try {
      createReservation(user.id, sport)
      setReservations(getUserReservations(user.id))
      Swal.fire("Reserva confirmada", `Tu clase de ${sport.name} fue reservada.`, "success")
    } catch (error) {
      Swal.fire("Advertencia", error.message, "warning")
    }
  }

  const handleCancel = async (reservation) => {
    const result = await Swal.fire({
      title: "¿Cancelar reserva?",
      text: `Se cancelará tu clase de ${reservation.sportName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
    })

    if (!result.isConfirmed) return

    cancelReservation(user.id, reservation.id)
    setReservations(getUserReservations(user.id))
    Swal.fire("Reserva cancelada", "La clase fue eliminada de tus reservas.", "success")
  }

  const progressPercent = Math.min(reservations.length * 20, 100)

  return (
    <>
      <h2>Dashboard Usuario</h2>
      <p className="dashboard-welcome">
        Sesión iniciada como: <strong>{displayName}</strong>
      </p>

      <section className="dashboard-panel">
        <div className="panel">
          <h3>Mi Perfil</h3>
          <p>
            Nombre: <span>{displayName}</span>
          </p>
          <p>
            Email: <span>{user?.email}</span>
          </p>
          <p>Objetivos personales:</p>
          <ul>
            <li>Mejorar resistencia</li>
            <li>Asistir 3 veces por semana</li>
          </ul>
        </div>

        <div className="panel">
          <h3>Progreso</h3>
          <p>Avance: {progressPercent}%</p>
          <p>Reservas activas: {reservations.length}</p>
        </div>

        <div className="panel" id="clases">
          <h3>Clases Disponibles</h3>
          {loading ? (
            <p>Cargando clases...</p>
          ) : classes.length === 0 ? (
            <p>No hay clases activas en este momento.</p>
          ) : (
            <ul className="class-list">
              {classes.map((sport) => {
                const reserved = isSportReserved(user?.id, sport.id)

                return (
                  <li key={sport.id} className="class-item">
                    <div>
                      <strong>{sport.name}</strong>
                      <p>{sport.objective}</p>
                      <small>Duración: {sport.duration} min</small>
                    </div>
                    <button
                      type="button"
                      disabled={reserved}
                      onClick={() => handleReserve(sport)}
                    >
                      {reserved ? "Reservada" : "Reservar"}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="panel panel-wide" id="reservas">
          <h3>Mis Reservas</h3>
          {reservations.length === 0 ? (
            <p>Aún no tienes clases reservadas.</p>
          ) : (
            <ul className="class-list">
              {reservations.map((reservation) => (
                <li key={reservation.id} className="class-item">
                  <div>
                    <strong>{reservation.sportName}</strong>
                    <p>{reservation.objective}</p>
                    <small>
                      Duración: {reservation.duration} min · Reservada el{" "}
                      {new Date(reservation.reservedAt).toLocaleString("es-CL")}
                    </small>
                  </div>
                  <button type="button" onClick={() => handleCancel(reservation)}>
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

export default UserDashboard

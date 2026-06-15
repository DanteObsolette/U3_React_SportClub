import { getDisplayName, getUser } from "../../services/authService"

function CoachDashboard() {
  const user = getUser()
  const displayName = getDisplayName(user)

  return (
    <>
      <h2>Dashboard Coach</h2>
      <p className="dashboard-welcome">
        Sesión iniciada como: <strong>{displayName}</strong> ({user?.email})
      </p>

      <section className="dashboard-panel">
        <div className="panel">
          <h3>Mis alumnos</h3>
          <p>Alumno 1 - Email</p>
          <p>Alumno 2 - Email</p>
          <p>Alumno 3 - Email</p>
        </div>

        <div className="panel">
          <h3>Mi Horario</h3>
          <p>Lunes - Spinning 18:00</p>
          <p>Miércoles - Boxeo 11:00</p>
          <p>Viernes - CrossFit 10:00</p>
        </div>

        <div className="panel">
          <h3>Reportes</h3>
          <p>Ver detalles de progreso</p>
        </div>
      </section>
    </>
  )
}

export default CoachDashboard

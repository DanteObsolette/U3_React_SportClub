import { getDisplayName, getUser } from "../../services/authService"

function UserDashboard() {
  const user = getUser()
  const displayName = getDisplayName(user)

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
          <p>Avance: 60%</p>
        </div>

        <div className="panel">
          <h3>Clases Disponibles</h3>
          <p>Spinning - Reservar</p>
          <p>CrossFit - Reservar</p>
          <p>Boxeo - Reservar</p>
        </div>
      </section>
    </>
  )
}

export default UserDashboard

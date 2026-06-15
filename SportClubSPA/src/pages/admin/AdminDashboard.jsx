import { Link } from "react-router-dom"
import { getDisplayName, getUser } from "../../services/authService"

function AdminDashboard() {
  const user = getUser()
  const displayName = getDisplayName(user)

  return (
    <>
      <h2>Dashboard Administrador</h2>
      <p className="dashboard-welcome">
        Sesión iniciada como: <strong>{displayName}</strong> ({user?.email})
      </p>

      <section className="dashboard-panel">
        <div className="panel">
          <h3>Panel de control</h3>
          <p>Gestione usuarios, deportes y accesos del sistema SportClub.</p>
          <div className="dashboard-links">
            <Link to="/admin/users" className="dashboard-button">
              Ir a Gestión de Usuarios
            </Link>
            <Link to="/admin/sports" className="dashboard-button">
              Ir a Gestión de Deportes
            </Link>
          </div>
        </div>

        <div className="panel">
          <h3>Estadísticas (demo)</h3>
          <p>Los módulos de usuarios y deportes consumen la API del backend SportClub E3.</p>
        </div>
      </section>
    </>
  )
}

export default AdminDashboard

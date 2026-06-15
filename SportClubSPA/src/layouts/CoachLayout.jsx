import { Outlet, useNavigate } from "react-router-dom"
import SiteFooter from "../components/SiteFooter"
import SiteHeader from "../components/SiteHeader"
import { logout } from "../services/authService"

function CoachLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="page-coach">
      <SiteHeader
        links={[
          { to: "/", label: "Inicio" },
          { to: "/perfil", label: "Mi perfil" },
          { to: "#", label: "Mis Alumnos", external: true },
          { to: "#", label: "Mi Horario", external: true },
          { to: "#", label: "Reportes", external: true },
        ]}
        showLogout
        onLogout={handleLogout}
      />

      <main>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}

export default CoachLayout

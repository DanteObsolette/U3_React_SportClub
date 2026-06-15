import { Outlet, useNavigate } from "react-router-dom"
import SiteFooter from "../components/SiteFooter"
import SiteHeader from "../components/SiteHeader"
import { logout } from "../services/authService"

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="page-admin">
      <SiteHeader
        links={[
          { to: "/", label: "Inicio" },
          { to: "/perfil", label: "Mi perfil" },
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/users", label: "Usuarios" },
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

export default AdminLayout

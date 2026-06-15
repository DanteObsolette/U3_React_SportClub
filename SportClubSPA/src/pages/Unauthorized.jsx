import { Link } from "react-router-dom"
import SiteFooter from "../components/SiteFooter"

function Unauthorized() {
  return (
    <div className="page-login">
      <main>
        <section>
          <h2>Acceso no autorizado</h2>
          <p className="dashboard-welcome">No tienes permisos para ver esta página.</p>
          <div className="form-footer-link">
            <Link to="/">Volver al inicio</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Unauthorized

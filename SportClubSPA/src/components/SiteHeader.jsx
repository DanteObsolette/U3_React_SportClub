import { Link } from "react-router-dom"

function SiteHeader({ links = [], showLogout = false, onLogout }) {
  return (
    <header>
      <Link to="/" className="brand-link">
        <span className="brand-logo">SportClub</span>
      </Link>

      <nav>
        {links.map((link) =>
          link.external ? (
            <a key={link.label} href={link.to}>
              {link.label}
            </a>
          ) : (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ),
        )}
        {showLogout && (
          <button type="button" onClick={onLogout}>
            Cerrar Sesión
          </button>
        )}
      </nav>
    </header>
  )
}

export default SiteHeader

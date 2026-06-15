import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SiteHeader from "../components/SiteHeader"
import SiteFooter from "../components/SiteFooter"
import { getApiBase } from "../services/apiClient"
import { loginUser, redirectPathForRole, saveSession } from "../services/authService"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await loginUser({ email, password })
      saveSession(data.data.token, data.data.user)
      navigate(redirectPathForRole(data.data.user.role))
    } catch (err) {
      setError(err.message || "No se pudo acceder al sitio")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-login">
      <SiteHeader
        links={[
          { to: "/", label: "Inicio" },
          { to: "#", label: "Planes", external: true },
          { to: "#", label: "Reservas", external: true },
        ]}
      />

      <main>
        <section id="login">
          <h2>Iniciar Sesión</h2>
          <p className="form-hint">
            Credenciales de prueba (seed): <code>user1@demo.cl</code> / <code>12345678</code> · <code>coach1@demo.cl</code> · <code>admin1@demo.cl</code> (misma contraseña). Requiere API en <code>{getApiBase().replace("/api", "")}</code>.
          </p>

          <form id="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <p>
              <Link to="/recuperar">Recuperar contraseña</Link>
            </p>
            <p>
              <Link to="/registro">Registrarse</Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter text="© 2026 Club Deportivo" />
    </div>
  )
}

export default Login

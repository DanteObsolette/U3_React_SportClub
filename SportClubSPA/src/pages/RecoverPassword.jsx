import { useState } from "react"
import { Link } from "react-router-dom"
import SiteHeader from "../components/SiteHeader"
import SiteFooter from "../components/SiteFooter"

function RecoverPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleRecover = () => {
    if (!email.trim()) {
      window.alert("Por favor ingresa tu correo electrónico.")
      return
    }

    setSent(true)
  }

  return (
    <div className="page-recover">
      <SiteHeader
        links={[
          { to: "/", label: "Inicio" },
          { to: "#", label: "Planes", external: true },
          { to: "#", label: "Reservas", external: true },
        ]}
      />

      <main>
        <section id="recuperar">
          <h2>Recuperar Contraseña</h2>

          {!sent ? (
            <form id="recoveryForm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="button" id="recoveryButton" onClick={handleRecover}>
                Recuperar
              </button>
            </form>
          ) : (
            <div id="message">
              <p>Enlace de recuperación enviado a su correo</p>
              <Link to="/login">
                <button type="button">Volver al Login</button>
              </Link>
            </div>
          )}
        </section>
      </main>

      <SiteFooter text="© 2026 Club Deportivo" />
    </div>
  )
}

export default RecoverPassword

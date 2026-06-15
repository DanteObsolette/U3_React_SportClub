import { useState } from "react"
import { Link } from "react-router-dom"
import SiteHeader from "../components/SiteHeader"
import SiteFooter from "../components/SiteFooter"
import { flattenErrors } from "../services/apiClient"
import { registerUser } from "../services/authService"
import { validateRegisterForm } from "../utils/validation"

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    birth_date: "",
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    setFieldErrors({})

    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      birth_date: form.birth_date || null,
      metadata: { sports: [] },
    }

    const clientErrors = validateRegisterForm(payload, form.confirm_password)

    if (Object.keys(clientErrors).length) {
      setFieldErrors(clientErrors)
      setError(
        "Revise los campos marcados. La contraseña debe tener mínimo 8 caracteres y coincidir con la confirmación.",
      )
      return
    }

    try {
      await registerUser(payload)
      setSuccess("Registro exitoso. Ya puede iniciar sesión con su correo y contraseña.")
      setForm({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
        birth_date: "",
      })
    } catch (err) {
      const apiErrors = err.body?.errors || {}
      const mapped = {}

      Object.keys(apiErrors).forEach((key) => {
        const value = apiErrors[key]
        mapped[key] = Array.isArray(value) ? value.join(" ") : String(value)
      })

      setFieldErrors(mapped)
      setError(
        err.body?.message ||
          flattenErrors(apiErrors).join(" ") ||
          err.message ||
          "No fue posible completar el registro.",
      )
    }
  }

  return (
    <div className="page-register">
      <SiteHeader
        links={[
          { to: "/", label: "Inicio" },
          { to: "/login", label: "Iniciar sesión" },
        ]}
      />

      <main>
        <section id="registro">
          <h2>Registro de Usuario</h2>
          <p className="form-hint">
            Se registrará con rol <strong>Usuario</strong> mediante <code>POST /api/auth/register</code>.
          </p>

          <form id="register-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="full_name">Nombre completo</label>
            <input
              type="text"
              id="full_name"
              placeholder="Nombre y apellido"
              required
              minLength={3}
              maxLength={150}
              autoComplete="name"
              value={form.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
            />
            <p className="field-error">{fieldErrors.full_name || ""}</p>

            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              placeholder="correo@sportclub.cl"
              required
              maxLength={150}
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <p className="field-error">{fieldErrors.email || ""}</p>

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Mínimo 8 caracteres, letra y número"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
            <p className="field-error">{fieldErrors.password || ""}</p>

            <label htmlFor="confirm_password">Confirmar contraseña</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Repita la contraseña"
              required
              autoComplete="new-password"
              value={form.confirm_password}
              onChange={(e) => updateField("confirm_password", e.target.value)}
            />
            <p className="field-error">{fieldErrors.confirm_password || ""}</p>

            <label htmlFor="birth_date">Fecha de nacimiento (opcional)</label>
            <input
              type="date"
              id="birth_date"
              value={form.birth_date}
              onChange={(e) => updateField("birth_date", e.target.value)}
            />
            <p className="field-error">{fieldErrors.birth_date || ""}</p>

            <button type="submit">Registrarse</button>
          </form>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="form-success" role="status">
              {success}
            </p>
          )}

          <p className="form-footer-link">
            <Link to="/login">¿Ya tiene cuenta? Inicie sesión</Link>
          </p>
        </section>
      </main>

      <SiteFooter text="© 2026 Club Deportivo" />
    </div>
  )
}

export default Register

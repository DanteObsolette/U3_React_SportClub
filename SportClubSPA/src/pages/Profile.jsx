import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SiteFooter from "../components/SiteFooter"
import SiteHeader from "../components/SiteHeader"
import { flattenErrors } from "../services/apiClient"
import {
  getDisplayName,
  getMe,
  getUser,
  logout,
  mergeSessionFromUser,
  updateMe,
} from "../services/authService"
import { DASHBOARD_BY_ROLE, getRoleLabel } from "../utils/validation"

function Profile() {
  const navigate = useNavigate()
  const session = getUser()
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "",
    birth_date: "",
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [displayName, setDisplayName] = useState(getDisplayName(session))

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getMe()
        const user = response.data
        mergeSessionFromUser(user)
        setForm({
          full_name: user.full_name || "",
          email: user.email || "",
          role: getRoleLabel(user.role),
          birth_date: user.birth_date || "",
        })
        setDisplayName(user.full_name || user.email || "")
      } catch (err) {
        setError(err.body?.message || err.message || "No se pudieron cargar los datos.")
      }
    }

    loadProfile()
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    setFieldErrors({})

    const payload = {
      full_name: form.full_name.trim(),
      birth_date: form.birth_date || null,
    }

    try {
      const response = await updateMe(payload)
      const updated = response.data
      mergeSessionFromUser(updated)
      setDisplayName(updated.full_name || updated.email || "")
      setSuccess("Perfil actualizado correctamente.")
    } catch (err) {
      const apiErrors = err.body?.errors || {}

      setFieldErrors({
        full_name: apiErrors.full_name ? String(apiErrors.full_name) : "",
        birth_date: apiErrors.birth_date ? String(apiErrors.birth_date) : "",
      })

      setError(
        err.body?.message ||
          flattenErrors(apiErrors).join(" ") ||
          err.message ||
          "No se pudo guardar el perfil.",
      )
    }
  }

  const dashboardPath = DASHBOARD_BY_ROLE[session?.role] || "/user/dashboard"

  return (
    <div className="page-login">
      <SiteHeader
        links={[
          { to: "/", label: "Inicio" },
          { to: dashboardPath, label: "Mi panel" },
        ]}
        showLogout
        onLogout={handleLogout}
      />

      <main>
        <section>
          <h2>Mi perfil</h2>
          <p className="dashboard-welcome">
            Hola, <strong>{displayName}</strong>
          </p>
          <p className="form-hint">
            Puede actualizar su nombre y fecha de nacimiento. El correo y el rol no se pueden modificar desde aquí.
          </p>

          <form id="profile-form" className="profile-form" onSubmit={handleSubmit}>
            <label htmlFor="full_name">Nombre completo</label>
            <input
              type="text"
              id="full_name"
              required
              minLength={3}
              maxLength={150}
              autoComplete="name"
              value={form.full_name}
              onChange={(e) => setForm((current) => ({ ...current, full_name: e.target.value }))}
            />
            <p className="field-error">{fieldErrors.full_name || ""}</p>

            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              readOnly
              className="input-readonly"
              autoComplete="off"
              value={form.email}
            />

            <label htmlFor="role">Rol</label>
            <input
              type="text"
              id="role"
              readOnly
              className="input-readonly"
              tabIndex={-1}
              value={form.role}
            />

            <label htmlFor="birth_date">Fecha de nacimiento</label>
            <input
              type="date"
              id="birth_date"
              value={form.birth_date}
              onChange={(e) => setForm((current) => ({ ...current, birth_date: e.target.value }))}
            />
            <p className="field-error">{fieldErrors.birth_date || ""}</p>

            <button type="submit">Guardar cambios</button>
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
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Profile

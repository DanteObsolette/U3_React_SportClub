const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRegisterForm(payload, confirmPassword) {
  const errors = {}

  if (!payload.full_name || payload.full_name.length < 3) {
    errors.full_name = "El nombre completo debe tener al menos 3 caracteres."
  }

  if (!payload.email) {
    errors.email = "El correo es obligatorio."
  } else if (!EMAIL_RE.test(payload.email)) {
    errors.email = "El correo no tiene un formato válido."
  }

  if (!payload.password) {
    errors.password = "La contraseña es obligatoria."
  } else if (payload.password.length < 8) {
    errors.password = "La contraseña debe tener mínimo 8 caracteres."
  } else if (!/[A-Za-z]/.test(payload.password) || !/\d/.test(payload.password)) {
    errors.password = "Use una contraseña más segura: al menos una letra y un número."
  }

  if (confirmPassword !== payload.password) {
    errors.confirm_password = "Las contraseñas no coinciden."
  }

  return errors
}

export function getRoleLabel(role) {
  if (role === "admin") return "Administrador"
  if (role === "coach") return "Coach"
  return "Usuario"
}

export const DASHBOARD_BY_ROLE = {
  user: "/user/dashboard",
  coach: "/coach/dashboard",
  admin: "/admin/dashboard",
}

function UserCard({ user }) {
  return (
    <article className="user-card">
      <img src={user.photo} alt={user.name} className="user-photo" />

      <h2>{user.name}</h2>

      <p><strong>Usuario:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Empresa:</strong> {user.company}</p>
      <p><strong>País:</strong> {user.country}</p>
    </article>
  )
}

export default UserCard
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">SportClub</Link> | <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar

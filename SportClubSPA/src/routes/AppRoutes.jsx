import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import RecoverPassword from "../pages/RecoverPassword"
import Profile from "../pages/Profile"
import Unauthorized from "../pages/Unauthorized"
import UserDashboard from "../pages/user/UserDashboard"
import CoachDashboard from "../pages/coach/CoachDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"
import UsersPage from "../pages/admin/UsersPage"
import SportsPage from "../pages/admin/SportsPage"
import UserLayout from "../layouts/UserLayout"
import CoachLayout from "../layouts/CoachLayout"
import AdminLayout from "../layouts/AdminLayout"
import ProtectedRoute from "./ProtectedRoute"
import RoleRoute from "./RoleRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<RecoverPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <RoleRoute allowedRoles={["user"]}>
              <UserLayout />
            </RoleRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        <Route
          path="/coach"
          element={
            <RoleRoute allowedRoles={["coach"]}>
              <CoachLayout />
            </RoleRoute>
          }
        >
          <Route path="dashboard" element={<CoachDashboard />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="sports" element={<SportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

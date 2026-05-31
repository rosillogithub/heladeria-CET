import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Home from '../pages/Home'
import Productos from '../pages/Productos'
import Ingredientes from '../pages/Ingredientes'
import Login from '../pages/Login'
import Ventas from '../pages/Ventas'

function AppRouter() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/productos"
        element={<Productos />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Ingredientes: solo admin y empleado */}
      <Route
        path="/ingredientes"
        element={
          user?.rol === 'admin' ||
          user?.rol === 'empleado'
            ? <Ingredientes />
            : <Navigate to="/" />
        }
      />

      {/* Ventas: admin, empleado y cliente */}
      <Route
        path="/ventas"
        element={
          user
            ? <Ventas />
            : <Navigate to="/login" />
        }
      />
    </Routes>
  )
}

export default AppRouter
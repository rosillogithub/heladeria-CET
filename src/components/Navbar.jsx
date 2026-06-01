import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  
  return (
    <nav className="bg-pink-500 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        🍨 FrostByte Ice Cream
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/">Inicio</Link>

        <Link to="/productos">
          Productos
        </Link>

        {/* Público */}
        {!user && (
          <Link to="/login">
            Login
          </Link>
        )}

        {/* Cliente */}
        {user?.rol === 'cliente' && (
          <>
            <Link to="/ventas">
              Ventas
            </Link>

            <button onClick={logout}>
              Salir
            </button>
          </>
        )}

        {/* Empleado */}
        {user?.rol === 'empleado' && (
          <>
            <Link to="/ingredientes">
              Ingredientes
            </Link>

            <Link to="/ventas">
              Ventas
            </Link>

            <button onClick={logout}>
              Salir
            </button>
          </>
        )}

        {/* Administrador */}
        {user?.rol === 'admin' && (
          <>
            <Link to="/ingredientes">
              Ingredientes
            </Link>

            <Link to="/ventas">
              Ventas
            </Link>

            <button onClick={logout}>
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
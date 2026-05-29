import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-pink-500 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        🍨 FrostByte Ice Cream
      </h1>

      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/ingredientes">Ingredientes</Link>
        <Link to="/ventas">Ventas</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar

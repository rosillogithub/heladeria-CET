import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Productos from '../pages/Productos'
import Ingredientes from '../pages/Ingredientes'
import Login from '../pages/Login'
import Ventas from '../pages/Ventas'


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/productos" element={<Productos />} />

      <Route path="/ingredientes" element={<Ingredientes />} />

      <Route path="/login" element={<Login />} />

      <Route path="/ventas" element={<Ventas />} />

    </Routes>
  )
}

export default AppRouter
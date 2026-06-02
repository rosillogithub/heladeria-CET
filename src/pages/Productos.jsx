import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'

function Productos() {
  const [productos, setProductos] = useState([])

  const { user } = useAuth()

  useEffect(() => {
    obtenerProductos()
  }, [])

  const obtenerProductos = async () => {
    try {
      // Rentabilidad y costo
      const { data: rentabilidadData, error: rentabilidadError } =
        await supabase
          .from('v_rentabilidad_producto')
          .select('*')

      if (rentabilidadError) {
        console.error(rentabilidadError)
        return
      }

      // Calorías
      const { data: caloriasData, error: caloriasError } =
        await supabase
          .from('v_calorias_producto')
          .select('*')

      if (caloriasError) {
        console.error(caloriasError)
        return
      }

      // Relaciones producto-ingrediente
      const { data: relacionesData, error: relacionesError } =
        await supabase
          .from('producto_ingrediente')
          .select(`
            producto_id,
            ingredientes (
              nombre
            )
          `)

      if (relacionesError) {
        console.error(relacionesError)
        return
      }

      // Construir objeto de ingredientes por producto
      const ingredientesPorProducto = {}

      relacionesData.forEach((relacion) => {
        if (!ingredientesPorProducto[relacion.producto_id]) {
          ingredientesPorProducto[relacion.producto_id] = []
        }

        ingredientesPorProducto[relacion.producto_id].push(
          relacion.ingredientes.nombre
        )
      })

      // Unir toda la información
      const productosCompletos = rentabilidadData.map((producto) => {
        const calorias =
          caloriasData.find(
            (c) => c.producto_id === producto.producto_id
          )?.total_calorias || 0

        return {
          ...producto,
          calorias,
          ingredientes:
            ingredientesPorProducto[producto.producto_id] || []
        }
      })

      setProductos(productosCompletos)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Productos 🍨
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductCard
              key={producto.producto_id}
              producto={producto}
              user={user}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Productos
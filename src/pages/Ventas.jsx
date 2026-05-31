import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'

function Ventas() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')

    if (error) {
      console.error(error)
      return
    }

    setProductos(data || [])
  }

  const venderProducto = async (producto) => {
    try {
      // Obtener ingredientes asociados al producto

      const {
        data: relaciones,
        error: errorRelaciones,
      } = await supabase
        .from('producto_ingrediente')
        .select('*')
        .eq('producto_id', producto.id)

      if (errorRelaciones) {
        console.error(errorRelaciones)
        alert('Error consultando ingredientes')
        return
      }

      // Validar inventario

      for (const relacion of relaciones) {
        const {
          data: ingrediente,
          error,
        } = await supabase
          .from('ingredientes')
          .select('*')
          .eq('id', relacion.ingrediente_id)
          .single()

        if (error) {
          console.error(error)
          alert('Error consultando inventario')
          return
        }

        if (ingrediente.inventario <= 0) {
          alert(
            `No hay inventario disponible para ${ingrediente.nombre}`
          )
          return
        }
      }

      // Descontar inventario

      for (const relacion of relaciones) {
        const { data: ingrediente } = await supabase
          .from('ingredientes')
          .select('*')
          .eq('id', relacion.ingrediente_id)
          .single()

        await supabase
          .from('ingredientes')
          .update({
            inventario: ingrediente.inventario - 1,
          })
          .eq('id', ingrediente.id)
      }

      // Registrar venta

      const { error: errorVenta } = await supabase
        .from('ventas')
        .insert([
          {
            producto_id: producto.id,
            cantidad: 1,
            total: producto.precio_publico,
          },
        ])

      if (errorVenta) {
        console.error(errorVenta)
        alert('Error registrando venta')
        return
      }

      alert('Producto vendido 🍦')
    } catch (error) {
      console.error(error)
      alert('Ocurrió un error inesperado')
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Ventas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-2xl font-bold">
                {producto.nombre}
              </h2>

              <p className="mt-2">
                Precio: ${producto.precio_publico}
              </p>

              <button
                onClick={() => venderProducto(producto)}
                className="bg-pink-500 text-white px-4 py-2 rounded mt-4"
              >
                Vender
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Ventas
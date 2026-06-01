import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'

export default function Ventas() {
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
      // 1. Obtener relaciones producto-ingrediente
      const { data: relaciones, error: errorRelaciones } = await supabase
        .from('producto_ingrediente')
        .select('*')
        .eq('producto_id', producto.id)

      if (errorRelaciones) {
        console.error(errorRelaciones)
        alert('Error consultando ingredientes')
        return
      }

      if (!relaciones || relaciones.length === 0) {
        alert('Este producto no tiene ingredientes configurados')
        return
      }

      // 2. Validar inventario
      for (const r of relaciones) {
        const { data: ingrediente, error } = await supabase
          .from('ingredientes')
          .select('*')
          .eq('id', r.ingrediente_id)
          .single()

        if (error) {
          console.error(error)
          alert('Error consultando inventario')
          return
        }

        const consumo = r.cantidad || 1

        if (ingrediente.inventario < consumo) {
          alert(`No hay inventario suficiente para ${ingrediente.nombre}`)
          return
        }
      }

      // 3. Descontar inventario
      for (const r of relaciones) {
        const { data: ingrediente, error } = await supabase
          .from('ingredientes')
          .select('*')
          .eq('id', r.ingrediente_id)
          .single()

        if (error) {
          console.error(error)
          alert('Error actualizando inventario')
          return
        }

        const consumo = r.cantidad || 1

        await supabase
          .from('ingredientes')
          .update({
            inventario: Number(ingrediente.inventario) - consumo,
          })
          .eq('id', ingrediente.id)
      }

      // 4. Registrar venta
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
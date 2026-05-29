import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'

function Ventas() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const { data } = await supabase
      .from('productos')
      .select('*')

    setProductos(data)
  }

  const venderProducto = async (producto) => {
    await supabase.from('ventas').insert([
      {
        producto_id: producto.id,
        cantidad: 1,
        total: producto.precio_publico,
      },
    ])

    alert('Producto vendido 🍦')
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Ventas
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-2xl font-bold">
                {producto.nombre}
              </h2>

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

import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function Productos() {
  const [productos, setProductos] = useState([])

  const { user } = useAuth()

  useEffect(() => {
    obtenerProductos()
  }, [])

  const obtenerProductos = async () => {
    const { data, error } = await supabase
      .from('v_rentabilidad_producto')
      .select('*')

    if (error) {
      console.error(error)
      return
    }

    setProductos(data || [])
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Productos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.producto_id}
              className="bg-white shadow-xl rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {producto.nombre}
              </h2>

              <p className="mt-2">
                Precio: ${producto.precio_publico}
              </p>

              {/* Solo empleado y admin */}
              {(user?.rol === 'empleado' ||
                user?.rol === 'admin') && (
                <p>
                  Costo: ${producto.costo}
                </p>
              )}

              {/* Solo admin */}
              {user?.rol === 'admin' && (
                <p>
                  Rentabilidad: ${producto.rentabilidad}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Productos
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([])

  useEffect(() => {
    obtenerIngredientes()
  }, [])

  const obtenerIngredientes = async () => {
    const { data, error } = await supabase
      .from('ingredientes')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    setIngredientes(data)
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Ingredientes 🧁
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredientes.map((ingrediente) => (
            <div
              key={ingrediente.id}
              className="bg-white shadow-xl rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {ingrediente.nombre}
              </h2>

              <p className="mt-2">
                Precio: ${ingrediente.precio}
              </p>

              <p>
                Calorías: {ingrediente.calorias}
              </p>

              <p>
                Inventario: {ingrediente.inventario}
              </p>

              <p>
                Tipo: {ingrediente.tipo}
              </p>

              <p>
                Vegetariano:
                {' '}
                {ingrediente.es_vegetariano
                  ? 'Sí'
                  : 'No'}
              </p>

              <p>
                Saludable:
                {' '}
                {ingrediente.es_sano
                  ? 'Sí'
                  : 'No'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Ingredientes
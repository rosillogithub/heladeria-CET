/*
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([])

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')

  useEffect(() => {
    obtenerIngredientes()
  }, [])

  const obtenerIngredientes = async () => {
    const { data } = await supabase
      .from('ingredientes')
      .select('*')

    setIngredientes(data)
  }

  const crearIngrediente = async () => {
    await supabase.from('ingredientes').insert([
      {
        nombre,
        precio,
        calorias: 100,
        inventario: 10,
        es_vegetariano: true,
        es_sano: true,
        tipo: 'base',
      },
    ])

    obtenerIngredientes()
  }

  const eliminarIngrediente = async (id) => {
    await supabase
      .from('ingredientes')
      .delete()
      .eq('id', id)

    obtenerIngredientes()
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Ingredientes
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            placeholder="Nombre"
            className="border p-2"
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            placeholder="Precio"
            className="border p-2"
            onChange={(e) => setPrecio(e.target.value)}
          />

          <button
            onClick={crearIngrediente}
            className="bg-green-500 text-white px-4 rounded"
          >
            Crear
          </button>
        </div>

        <table className="w-full bg-white shadow">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Inventario</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.id}>
                <td className="p-2">{ingrediente.nombre}</td>
                <td className="p-2">
                  ${ingrediente.precio}
                </td>
                <td className="p-2">
                  {ingrediente.inventario}
                </td>

                <td className="p-2">
                  <button
                    onClick={() =>
                      eliminarIngrediente(ingrediente.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Ingredientes
*/

/*
import Navbar from '../components/Navbar'

function Ingredientes() {
  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold">
          Ingredientes 🧁
        </h1>
      </div>
    </>
  )
}

export default Ingredientes
*/

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
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([])

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [calorias, setCalorias] = useState('')
  const [inventario, setInventario] = useState('')
  const [tipo, setTipo] = useState('base')
  const [sabor, setSabor] = useState('')
  const [esVegetariano, setEsVegetariano] = useState(false)
  const [esSano, setEsSano] = useState(true)

  useEffect(() => {
    obtenerIngredientes()
  }, [])

  const obtenerIngredientes = async () => {
    const { data, error } = await supabase
      .from('ingredientes')
      .select('*')
      .order('id')

    if (error) {
      console.log(error)
      return
    }

    setIngredientes(data)
  }

  const crearIngrediente = async () => {
    const { error } = await supabase
      .from('ingredientes')
      .insert([
        {
          nombre,
          precio: Number(precio),
          calorias: Number(calorias),
          inventario: Number(inventario),
          tipo,
          sabor,
          es_vegetariano: esVegetariano,
          es_sano: esSano,
        },
      ])

    if (error) {
      console.log(error)
      alert('Error al crear ingrediente')
      return
    }

    setNombre('')
    setPrecio('')
    setCalorias('')
    setInventario('')
    setTipo('base')
    setSabor('')
    setEsVegetariano(false)
    setEsSano(true)

    obtenerIngredientes()
  }

  const eliminarIngrediente = async (id) => {
    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar este ingrediente?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('ingredientes')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
      alert('No se pudo eliminar')
      return
    }

    obtenerIngredientes()
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Ingredientes 🧁
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Nuevo Ingrediente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Calorías"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Inventario"
              value={inventario}
              onChange={(e) => setInventario(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Sabor"
              value={sabor}
              onChange={(e) => setSabor(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="base">
                Base
              </option>

              <option value="complemento">
                Complemento
              </option>
            </select>
          </div>

          <div className="flex gap-6 mt-4">
            <label>
              <input
                type="checkbox"
                checked={esVegetariano}
                onChange={(e) =>
                  setEsVegetariano(e.target.checked)}
              />
              {' '}Vegetariano
            </label>

            <label>
              <input
                type="checkbox"
                checked={esSano}
                onChange={(e) =>
                  setEsSano(e.target.checked)}
              />
              {' '}Saludable
            </label>
          </div>

          <button
            onClick={crearIngrediente}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Guardar ingrediente
          </button>
        </div>

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
                Sabor: {ingrediente.sabor || 'N/A'}
              </p>

              <p>
                Vegetariano:{' '}
                {ingrediente.es_vegetariano
                  ? 'Sí'
                  : 'No'}
              </p>

              <p>
                Saludable:{' '}
                {ingrediente.es_sano
                  ? 'Sí'
                  : 'No'}
              </p>

              <button
                onClick={() =>
                  eliminarIngrediente(
                    ingrediente.id
                  )}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Ingredientes
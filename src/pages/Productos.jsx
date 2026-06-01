/*
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

              {}
              {(user?.rol === 'empleado' ||
                user?.rol === 'admin') && (
                <p>
                  Costo: ${producto.costo}
                </p>
              )}

              {}
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
*/

import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import { useAuth } from '../context/AuthContext'

function Productos() {
  const { role } = useAuth()

  const [productos, setProductos] = useState([])
  const [form, setForm] = useState({
    nombre: '',
    precio_publico: '',
    tipo: 'copa',
    vaso: '',
    volumen_onzas: ''
  })

  const [editingId, setEditingId] = useState(null)

  // ======================
  // READ
  // ======================
  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true })

    if (!error) setProductos(data)
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  // ======================
  // CREATE / UPDATE
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (role !== 'admin') {
      alert('No autorizado')
      return
    }

    if (editingId) {
      // UPDATE
      await supabase
        .from('productos')
        .update(form)
        .eq('id', editingId)
    } else {
      // CREATE
      await supabase
        .from('productos')
        .insert([form])
    }

    setForm({
      nombre: '',
      precio_publico: '',
      tipo: 'copa',
      vaso: '',
      volumen_onzas: ''
    })

    setEditingId(null)
    fetchProductos()
  }

  // ======================
  // DELETE
  // ======================
  const deleteProducto = async (id) => {
    if (role !== 'admin') {
      alert('No autorizado')
      return
    }

    await supabase
      .from('productos')
      .delete()
      .eq('id', id)

    fetchProductos()
  }

  // ======================
  // EDIT MODE
  // ======================
  const startEdit = (producto) => {
    if (role !== 'admin') return

    setForm(producto)
    setEditingId(producto.id)
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* FORM (solo admin) */}
      {role === 'admin' && (
        <form onSubmit={handleSubmit} className="space-y-2 mb-6">

          <input
            className="border p-2 w-full"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            className="border p-2 w-full"
            placeholder="Precio público"
            type="number"
            value={form.precio_publico}
            onChange={(e) => setForm({ ...form, precio_publico: e.target.value })}
          />

          <select
            className="border p-2 w-full"
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          >
            <option value="copa">Copa</option>
            <option value="malteada">Malteada</option>
          </select>

          <input
            className="border p-2 w-full"
            placeholder="Vaso"
            value={form.vaso}
            onChange={(e) => setForm({ ...form, vaso: e.target.value })}
          />

          <input
            className="border p-2 w-full"
            placeholder="Volumen onzas"
            type="number"
            value={form.volumen_onzas}
            onChange={(e) => setForm({ ...form, volumen_onzas: e.target.value })}
          />

          <button className="bg-blue-500 text-white px-4 py-2">
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      )}

      {/* LISTADO */}
      <div className="space-y-3">
        {productos.map((p) => (
          <div key={p.id} className="border p-3 flex justify-between">

            <div>
              <p className="font-bold">{p.nombre}</p>
              <p>${p.precio_publico}</p>
              <p>{p.tipo}</p>
            </div>

            {role === 'admin' && (
              <div className="space-x-2">
                <button
                  onClick={() => startEdit(p)}
                  className="bg-yellow-500 px-2 py-1"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteProducto(p.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productos
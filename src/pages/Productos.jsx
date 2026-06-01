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


/* Version 2
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

      {}
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

      {}
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
*/


/* Version 3
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function Productos() {
  const [productos, setProductos] = useState([])

  const { user, role } = useAuth()

  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    precio_publico: ''
  })

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

  const guardarProducto = async (e) => {
    e.preventDefault()

    if (role !== 'admin') {
      alert('No autorizado')
      return
    }

    if (editingId) {
      const { error } = await supabase
        .from('productos')
        .update({
          nombre: form.nombre,
          precio_publico: form.precio_publico
        })
        .eq('id', editingId)

      if (error) {
        console.error(error)
        alert('Error actualizando producto')
        return
      }
    } else {
      const { error } = await supabase
        .from('productos')
        .insert([
          {
            nombre: form.nombre,
            precio_publico: form.precio_publico,
            tipo: 'copa'
          }
        ])

      if (error) {
        console.error(error)
        alert('Error creando producto')
        return
      }
    }

    setEditingId(null)

    setForm({
      nombre: '',
      precio_publico: ''
    })

    obtenerProductos()
  }

  const editarProducto = (producto) => {
    setEditingId(producto.producto_id)

    setForm({
      nombre: producto.nombre,
      precio_publico: producto.precio_publico
    })
  }

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm(
      '¿Desea eliminar este producto?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      alert('No fue posible eliminar el producto')
      return
    }

    obtenerProductos()
  }

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Productos
        </h1>

        {role === 'admin' && (
          <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingId
                ? 'Editar Producto'
                : 'Crear Producto'}
            </h2>

            <form
              onSubmit={guardarProducto}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Nombre"
                className="border p-2 w-full rounded"
                value={form.nombre}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nombre: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Precio Público"
                className="border p-2 w-full rounded"
                value={form.precio_publico}
                onChange={(e) =>
                  setForm({
                    ...form,
                    precio_publico: e.target.value
                  })
                }
              />

              <button
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                {editingId
                  ? 'Actualizar'
                  : 'Crear Producto'}
              </button>
            </form>
          </div>
        )}

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

              {(user?.rol === 'empleado' ||
                user?.rol === 'admin') && (
                <p>
                  Costo: ${producto.costo}
                </p>
              )}

              {user?.rol === 'admin' && (
                <p>
                  Rentabilidad: ${producto.rentabilidad}
                </p>
              )}

              {role === 'admin' && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      editarProducto(producto)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      eliminarProducto(
                        producto.producto_id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
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

              {(user?.rol === 'empleado' ||
                user?.rol === 'admin') && (
                <p>
                  Costo: ${producto.costo}
                </p>
              )}

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

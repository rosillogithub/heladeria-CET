import { useState } from 'react'
import { supabase } from '../api/supabase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('correo', correo)
      .eq('password', password)
      .single()

    if (error) {
      alert('Credenciales incorrectas')
      return
    }

    login(data, data.rol)

    navigate('/')
  }

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-xl shadow-xl w-96"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        Login
      </h2>

      <input
        type="email"
        placeholder="Correo"
        className="border p-2 w-full mb-4"
        onChange={(e) => setCorreo(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-pink-500 text-white p-2 rounded w-full">
        Ingresar
      </button>
    </form>
  )
}

export default LoginForm

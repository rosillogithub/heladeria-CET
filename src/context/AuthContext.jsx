/*
Este archivo crea un “contexto global” de autenticación. Es decir:
1. guardar el usuario logueado
2. compartir el usuario entre componentes
3. saber el rol (admin, empleado, cliente)
4. proteger rutas
5. mostrar/ocultar funcionalidades
Sin Context API se tendría que pasar el usuario manualmente entre componentes
*/

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()    // Aquí nace el contenedor global.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // user → usuario actual. 
                                        // setUser → cambia usuario
                                        // Inicialmente: null porque nadie ha iniciado sesión.

  return (
    <AuthContext.Provider value={{ user, setUser }}> 
      {children}
    </AuthContext.Provider>
  )
}

// <AuthContext.Provider value={{ user, setUser }}>  permite hacer: const { user } = useAuth()
// desde cualquier componente

export const useAuth = () => useContext(AuthContext)

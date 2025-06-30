import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Header from "./components/Header"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Footer from "./components/Footer"
import { createContext, useState, useEffect } from 'react'

// Creamos el contexto de usuario que será compartido globalmente
export const UserContext = createContext(null)
import Perfil from "./pages/Perfil"

function App() {
  // Estado global para el usuario logueado.
  // Al iniciar la app, intenta cargarlo desde localStorage.
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user') // Busca en el almacenamiento local
    return saved ? JSON.parse(saved) : null    // Si existe, lo convierte de texto a objeto
  })

  // Cada vez que el estado "user" cambia, lo guarda o elimina del localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)) // Guarda el usuario en localStorage
    } else {
      localStorage.removeItem('user') // Elimina si no hay usuario (ej: logout)
    }
  }, [user]) // Se ejecuta solo cuando cambia "user"

  return (
    // Provee el estado del usuario (user y setUser) a toda la app usando Context
    <UserContext.Provider value={{ user, setUser }}>
      {/* Envolvemos todo con Router para manejar rutas */}
      <Router>
        {/* Contenedor principal que ocupa al menos el alto total de la ventana */}
        <div className="d-flex flex-column min-vh-100">
          
          {/* Componente de cabecera (siempre visible) */}
          <Header />

          {/* Contenido principal de cada ruta (crece para empujar el footer hacia abajo) */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Inicio />} />           {/* Página de inicio */}
              <Route path="/login" element={<Login />} />       {/* Página de login */}
              <Route path="/registro" element={<Registro />} /> {/* Página de registro */}
              <Route path="/*" element={<Navigate to="/" />} /> {/* Redirige todo lo no definido a / */}
            </Routes>
          </main>

          {/* Componente de pie de página (siempre visible y al final) */}
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  )
}

/*function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}*/

export default App

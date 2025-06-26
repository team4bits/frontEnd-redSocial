import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Footer from "./components/Footer"

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <Inicio /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/registro" element={ <Registro /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App

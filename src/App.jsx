import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Header from "./components/Header"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App

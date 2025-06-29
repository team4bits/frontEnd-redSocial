// Importamos hooks y dependencias necesarias
import { useState, useContext } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' // Componentes UI de Bootstrap
import { useNavigate } from 'react-router-dom' // Para redirigir al usuario después del login
import { UserContext } from '../App' // Traemos el contexto del usuario desde App.jsx

const Login = () => {
  // Estados para manejar los campos del formulario y errores
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Accedemos a la función setUser para guardar el usuario logueado
  const { setUser } = useContext(UserContext)

  // Hook para navegar a otra página
  const navigate = useNavigate()

  // Función que se ejecuta al enviar el formulario
  const handleLogin = async (e) => {
    e.preventDefault() // Evita el comportamiento por defecto (recarga de página)

    // Validamos la contraseña fija
    if (password !== '123456') {
      setError('Contraseña incorrecta')
      return
    }

    try {
      // Solicitamos la lista completa de usuarios al backend
      const res = await fetch('http://localhost:3000/users') // modificar la ruta o hacer un .env?
      const users = await res.json()

      // Buscamos un usuario cuyo nickName coincida con el ingresado
      const user = users.find(u => u.nickName === nickName)

      if (!user) {
        // Si no se encuentra, mostramos un mensaje de error
        setError('Usuario no encontrado')
      } else {
        // Si el usuario es válido, lo guardamos en el contexto
        setUser(user)
        // Redirigimos a la página de inicio
        navigate('/')
      }
    } catch (err) {
      // Si ocurre un error al hacer la petición (fallo de red o servidor)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    // Tarjeta centrada con estilos responsivos y sombra
    <Card
      className="w-100 w-md-75 w-lg-50 mx-auto my-5 shadow"
      style={{
        maxWidth: '60vw', // ancho máximo para evitar que se estire demasiado
        minHeight: '20rem',
        backgroundColor: '#f8f9fa' // fondo gris claro
      }}
    >
      <Card.Body className="p-4">
        {/* Título centrado */}
        <Card.Title className="mb-4 text-center">Iniciar sesión</Card.Title>

        {/* Si hay error, se muestra en una alerta roja */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Formulario controlado */}
        <Form onSubmit={handleLogin}>
          {/* Campo Nickname */}
          <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              value={nickName} // Valor actual del input
              onChange={(e) => setNickName(e.target.value)} // Actualiza el estado
              placeholder="Ingrese su nickname"
              required
              className="rounded-pill" // Hace los bordes redondeados
              style={{ fontSize: '1rem', padding: '0.75rem' }} // Aumenta el tamaño y padding
            />
          </Form.Group>

          {/* Campo Contraseña */}
          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              className="rounded-pill"
              style={{ fontSize: '1rem', padding: '0.75rem' }}
            />
          </Form.Group>

          {/* Botón de login centrado y más angosto */}
          <div className="text-center">
            <Button variant="primary" type="submit" className="px-4">
              Iniciar sesión
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Login

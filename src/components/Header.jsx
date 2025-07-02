import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  // Este componente representa la cabecera de la aplicación
  // Si hay un usuario logueado, desabilita el enlace de Login y de Registrarse
  const {user, setUser} = useContext(UserContext);
  // Función para cerrar sesión
  const cerrarSesion = () => {
    //La lógica para salir del context
    setUser(null);

  }

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">AntiSocial Social Net</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/registro" disabled={!!user}>
                Registrarse
              </Nav.Link>
              <Nav.Link as={Link} to="/login" disabled={!!user}>
                Iniciar Sesión
              </Nav.Link>
              <NavDropdown title={user ? user.nickName : "Usuario"} disabled={!user} id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/perfil">
                  Mi Cuenta
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/editar-perfil">
                  Editar Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item 
                as={Link} 
                to="/inicio"
                onClick={cerrarSesion}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
};

export default Header;
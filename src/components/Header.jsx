import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
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
              <Nav.Link as={Link} to="/registro">
                Registrarse
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Iniciar Sesión
              </Nav.Link>
              <NavDropdown title="Nick Name" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/perfil">
                  Mi Cuenta
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/editar-perfil">
                  Editar Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/actividad">
                  Mi Actividad
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout">
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
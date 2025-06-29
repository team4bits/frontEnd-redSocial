import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">AntiSocial Social Net</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Inicio</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Nick Name" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Mi Cuenta
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Editar Perfil
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Mi Actividad
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
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
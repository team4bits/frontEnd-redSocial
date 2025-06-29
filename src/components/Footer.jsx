import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <div className="text-center">
          <p className="mb-1">AntiSocial Social Net &reg;</p>
          <small className="text-light d-block">Todos los derechos reservados 2025</small>
          <small className="text-secondary">
            Desarrollado por{' '}
            <a 
              href="https://github.com/team4bits" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary text-decoration-none"
            >
              Team 4 Bits
            </a>
          </small>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
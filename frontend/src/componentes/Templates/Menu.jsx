import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Certifique-se de que está usando o Link correto do React Router

export default function Menu(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/eventos">Eventos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ingressos">Ingressos</NavDropdown.Item> {/* Mantido Ingressos */}
                        </NavDropdown>
                        <Nav.Link as={Link} to="/sair">Sair</Nav.Link> {/* Mantido o botão "Sair" */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

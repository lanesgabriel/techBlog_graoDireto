import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          TechBlog
        </Navbar.Brand>
        <Button variant="outline-light" onClick={() => navigate('/login')}>
          Sair
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;

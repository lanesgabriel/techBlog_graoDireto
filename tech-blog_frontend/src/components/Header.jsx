import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  return (
    <Navbar bg="white" className="mb-4 border-bottom">
      <Container>
        <Navbar.Brand className="fw-bold" onClick={() => navigate('/articles')} style={{ cursor: 'pointer' }}>
          TechBlog
        </Navbar.Brand>
        {
          location.pathname === '/' ? 
          (<Button variant="link" className="text-primary-green fw-bold text-decoration-none" onClick={() => navigate('/login')}> Entrar</Button>) 
          : 
          (<Button className="btn-logout" onClick={() => navigate('/login')}> <FiLogOut size={24} /> </Button>)
        }
      </Container>
    </Navbar>
  );
};

export default Header;

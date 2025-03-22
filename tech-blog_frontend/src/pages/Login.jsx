import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../styles/global.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Preencha todos os campos!');
      return;
    }

    setError('');
    navigate('/articles');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center fw-bold mb-4">Bem-vindo de volta</h2>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="custom-input w-100"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="custom-input w-100"
            />
          </Form.Group>

          <Button 
            type="submit" 
            className="btn-primary-green w-100" 
            disabled={!email || !password}
          >
            Entrar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;

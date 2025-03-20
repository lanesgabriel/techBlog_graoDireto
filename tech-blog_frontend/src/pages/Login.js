import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

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

    // Simulação de login bem-sucedido
    setError('');
    navigate('/articles');
  };

  return (
    <Container className="text-center mt-5" style={{ maxWidth: '400px' }}>
      <h2>Bem-vindo de volta</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Control 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        <Button 
          variant="success" 
          type="submit" 
          className="w-100" 
          disabled={!email || !password}
        >
          Entrar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

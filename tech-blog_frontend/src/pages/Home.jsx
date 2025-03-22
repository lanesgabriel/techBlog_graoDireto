import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container className="container text-center d-flex flex-column justify-content-center align-items-center vh-100 mt-5">
      <h1 className="display-1 fw-bold mb-0">Insights & Learning</h1>
      <p className="fs-4">Explorando tendências Tech, um post por vez</p>
      <Button className="btn-primary-green" onClick={() => navigate('/login')}>Começar a ler</Button>
    </Container>
  );
};

export default Home;
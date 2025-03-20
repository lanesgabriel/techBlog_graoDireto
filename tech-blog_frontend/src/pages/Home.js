import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Insights & Learning</h1>
      <p>Explorando tendências Tech, um post por vez</p>
      <Link to="/login" className="btn btn-success">Começar a ler</Link>
    </div>
  );
};

export default Home;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import Login from './pages/Login';
import AllArticles from './pages/AllArticles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
        
      </Routes>
    </Router>
  );
}

export default App;
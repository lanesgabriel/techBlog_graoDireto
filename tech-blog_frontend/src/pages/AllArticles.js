import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../services/api';
import { Container, ListGroup, Button, Badge, Row, Col, Form } from 'react-bootstrap';

const AllArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const articlesPerPage = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
      setFilteredArticles(data);
    };

    fetchArticles();
  }, []);

  // Filtra artigos por tag ou pesquisa
  useEffect(() => {
    let filtered = articles;

    if (selectedTag) {
      filtered = filtered.filter(article => article.tags.includes(selectedTag));
    }

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reseta para a primeira página ao filtrar
  }, [selectedTag, searchQuery, articles]);

  // Paginação
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <Container className="mt-4">
      {/* Cabeçalho */}
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="mb-0">📚 Todos os artigos</h1>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate('/new-article')}>
            ➕ Criar Novo Artigo
          </Button>
        </Col>
      </Row>

      {/* Filtros por tags */}
      <div className="mb-3">
        {['Frontend', 'Backend', 'Mobile'].map(tag => (
          <Badge 
            key={tag} 
            bg={selectedTag === tag ? "primary" : "secondary"} 
            className="me-2 p-2 cursor-pointer"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Campo de pesquisa */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="🔍 Pesquisar artigos pelo nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {/* Lista de artigos */}
      <ListGroup>
  {currentArticles.map((article) => (
    <ListGroup.Item key={article.id} className="p-3">
      <Row>
        <Col xs={8}>
          <h5 className="mb-1">{article.title}</h5>
          <p className="text-muted mb-1">{article.content.substring(0, 100)}...</p>
          {article.tags.split(',').map((tag, index) => (
            <Badge key={index} bg="secondary" className="me-1">{tag.trim()}</Badge>
          ))}
        </Col>
        <Col xs={4} className="text-end">
          <Button 
            variant="success" 
            className="me-2"
            onClick={() => navigate(`/articles/${article.id}`)}
          >
            Ler mais
          </Button>
          <Button 
            variant="warning"
            onClick={() => navigate(`/edit-article/${article.id}`)}
          >
            ✏️ Editar
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  ))}
</ListGroup>


      {/* Paginação */}
      <div className="d-flex justify-content-center mt-4">
        <Button 
          variant="outline-primary" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="me-2"
        >
          ← Anterior
        </Button>
        
        <span className="align-self-center">Página {currentPage} de {totalPages}</span>
        
        <Button 
          variant="outline-primary" 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="ms-2"
        >
          Próxima →
        </Button>
      </div>
    </Container>
  );
};

export default AllArticles;

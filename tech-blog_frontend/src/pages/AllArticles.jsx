import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../services/api';
import Pagination from '../components/Pagination'; 
import { Container, ListGroup, Button, Badge, Row, Col, Form } from 'react-bootstrap';
import '../styles/global.css';
import { FiEdit } from 'react-icons/fi';

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
    setCurrentPage(1);
  }, [selectedTag, searchQuery, articles]);


  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-0">
        <Col>
          <h2 className="mb-0 fw-bold">Todos os artigos</h2>
        </Col>
        <Col xs="auto">
          <Button className="btn-primary-green" variant="success" onClick={() => navigate('/new-article')}>
            Criar artigo
          </Button>
        </Col>
      </Row>

      <div className="mb-2">
        {['Frontend', 'Backend', 'Mobile'].map(tag => (
          <Badge 
            key={tag} 
            bg={selectedTag === tag ? "primary" : "secondary"} 
            className="me-2 p-2 cursor-pointer article-tag"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Form className="mb-1">
        <Form.Control
          className="mb-3 custom-input"
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      <ListGroup className="custom-list-group">
        {currentArticles.map((article) => (
          <ListGroup.Item 
            key={article.id} 
            className="p-3" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/articles/${article.id}`)}
          >
            <Row>
              <Col xs={8}>
                <h5 className="mb-1">{article.title}</h5>
                <p className="text-muted mb-1">{article.content.substring(0, 100)}...</p>
                {article.tags.split(',').map((tag, index) => (
                  <Badge key={index} className="article-tag me-1">{tag.trim()}</Badge>
                ))}
              </Col>
              <Col xs={4} className="text-end">
                <Button 
                  className="btn-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-article/${article.id}`);
                  }}
                >
                  <FiEdit size={18} /> 
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default AllArticles;
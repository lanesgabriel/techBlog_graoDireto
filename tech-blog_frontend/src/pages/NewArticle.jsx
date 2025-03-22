import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/api';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/global.css';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId] = useState(1); 
  const [tags, setTags] = useState([]); 
  const availableTags = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = { title, content, authorId, tags: tags.join(',') };
    await createArticle(newArticle);
    navigate('/articles');
  };

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <Container>
      <Row className="align-items-center mb-0">
        <Col>
          <h2 className="my-4 fw-bold">Novo artigo</h2>
        </Col>
        <Col xs="auto">
          <Button className="btn-primary-green" onClick={handleSubmit}>
            Criar artigo
          </Button>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Título do artigo*</Form.Label>
          <Form.Control
          className="custom-input"
            type="text"
            placeholder="Título" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Tags *</Form.Label>
          <div>
            {availableTags.map((tag) => (
              <Button
                key={tag}
                className={`article-tag ${tags.includes(tag) ? 'selected-tag' : ''}`}
                onClick={() => handleTagClick(tag)}
                style={{
                  color: tags.includes(tag) ? '#28a745' : 'black',
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Conteúdo *</Form.Label>
          <Form.Control
          className="custom-input"
            as="textarea"
            placeholder="Escreva aqui seu artigo..." 
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewArticle;
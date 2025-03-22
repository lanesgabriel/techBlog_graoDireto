import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, updateArticle } from '../services/api';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const availableTags = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticleById(id);
      if (article) {
        setTitle(article.title);
        setContent(article.content);
        setTags(article.tags.split(','));
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    await updateArticle(id, { title, content, tags: tags.join(',') });
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
    <>
      <Container>
        <Row className="align-items-center mb-0">
          <Col>
            <h2 className="my-4 fw-bold">Editar artigo</h2>
          </Col>
          <Col xs="auto">
            <Button className="btn-primary-green" onClick={handleSubmit}>
              Salvar
            </Button>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Título do artigo *</Form.Label>
            <Form.Control
            className="custom-input"
              type="text"
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
                  onClick={() => handleTagClick(tag)}
                  className={`article-tag ${tags.includes(tag) ? 'selected-tag' : ''}`}
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
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default EditArticle;
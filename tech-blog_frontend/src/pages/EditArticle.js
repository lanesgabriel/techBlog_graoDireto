import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, updateArticle } from '../services/api';
import { Container, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticleById(id);
      if (article) {
        setTitle(article.title);
        setContent(article.content);
        setTags(article.tags);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateArticle(id, { title, content, tags });
    navigate('/');
  };

  return (
    <>
      <Header />
      <Container>
        <h1 className="my-4">Editar artigo</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Conteúdo</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Salvar Alterações
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditArticle;

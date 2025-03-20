import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/api';
import { Container, Form, Button } from 'react-bootstrap';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState(1); // Substitua por um sistema de autenticação real
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = { title, content, authorId, tags };
    await createArticle(newArticle);
    navigate('/');
  };

  return (
    <Container>
    <h1 className="my-4">Novo artigo</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Conteúdo</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Digite o conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite as tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Criar
      </Button>
    </Form>
  </Container>
  );
};

export default NewArticle;
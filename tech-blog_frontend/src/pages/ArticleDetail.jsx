import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/api';
import { Container, Card, Button, Row, Form } from 'react-bootstrap';


const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); 

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleById(id);
      setArticle(data);
      setComments(data.comments || []);
    };

    fetchArticle();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { text: comment, author: 'Usuário Atual', date: new Date().toLocaleDateString() }]);
      setComment('');
    }
  };

  if (!article) return <div>Carregando...</div>;

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h3 className="mb-0 fw-bold">{article.title}</h3>
          <div>
            {article.tags.split(',').map((tag, index) => (
              <Button
                key={index}
                variant="outline-secondary"
                size="sm"
                className="me-2 article-tag"
                style={{ borderRadius: '20px' }}
              >
                {tag.trim()}
              </Button>
            ))}
          </div>
        </div>
      </Row>

      <p className="text-muted">
        Publicado por {article.author.name}
      </p>

      <Card className="mb-4 border-0">
        <Card.Body className="p-0">
          <Card.Text>{article.content}</Card.Text>
        </Card.Body>
      </Card>

      <p className="mb-3 fw-bold">Comentários</p>

      <Form onSubmit={handleCommentSubmit} className="mb-4">
        <Form.Group>
          <Form.Control
          className="custom-input"
            as="textarea"
            rows={3}
            placeholder="Escreva um comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 btn-primary-green">
          Comentar
        </Button>
      </Form>

      {comments.map((comment, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Text>
              <strong>{comment.author}</strong>
            </Card.Text>
            <Card.Text>{comment.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
  </Container>
  );
};

export default ArticleDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/api';
import { Container, Card, Button } from 'react-bootstrap';


const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleById(id);
      setArticle(data);
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Carregando...</div>;

  return (
    <Container>
    <h1 className="my-4">{article.title}</h1>
    <Card>
      <Card.Body>
        <Card.Text>{article.content}</Card.Text>
        <Card.Text>
          <strong>Autor:</strong> {article.author.name}
        </Card.Text>
        <Card.Text>
          <strong>Tags:</strong> {article.tags}
        </Card.Text>
      </Card.Body>
    </Card>

    <h2 className="my-4">Comentários</h2>
    <Card>
      <Card.Body>
        <Card.Text>Escreva um comentário...</Card.Text>
        <Button variant="primary">Enviar</Button>
      </Card.Body>
    </Card>
  </Container>
  );
};

export default ArticleDetail;
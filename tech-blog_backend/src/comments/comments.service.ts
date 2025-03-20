import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment-dto';
import { UpdateCommentDto } from './dto/update-comment-dto';


@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  // Retorna todos os comentários
  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        author: true, // Inclui informações do autor
        article: true, // Inclui informações do artigo
      },
    });
  }

  // Retorna um comentário específico pelo ID
  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
        article: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado.`);
    }

    return comment;
  }

  // Cria um novo comentário
  async create(createCommentDto: CreateCommentDto) {
    const { content, articleId, authorId } = createCommentDto;

    return this.prisma.comment.create({
      data: {
        content,
        articleId,
        authorId,
      },
    });
  }

  // Atualiza um comentário existente
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;

    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado.`);
    }

    return this.prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });
  }

  // Remove um comentário
  async remove(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comentário com ID ${id} não encontrado.`);
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }

  // Retorna comentários de um artigo específico
  async findByArticle(articleId: number) {
    return this.prisma.comment.findMany({
      where: {
        articleId,
      },
      include: {
        author: true,
        article: true,
      },
    });
  }

  // Retorna comentários de um autor específico
  async findByAuthor(authorId: number) {
    return this.prisma.comment.findMany({
      where: {
        authorId,
      },
      include: {
        author: true,
        article: true,
      },
    });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article-dto';
import { UpdateArticleDto } from './dto/update-article-dto';


@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.article.findMany({
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async findOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: {
                author: true,
                comments: true,
            },
        });

    if (!article) {
        throw new NotFoundException(`Artigo com ID ${id} não encontrado.`);
    }

    return article;
    }

    async create(createArticleDto: CreateArticleDto) {
        const { title, content, authorId, tags } = createArticleDto;

        return this.prisma.article.create({
            data: {
                title,
                content,
                authorId,
                tags,
            }
        });
    }

    async update(id: number, updateArticleDto: UpdateArticleDto) {
        const { title, content, tags } = updateArticleDto;
    
        const article = await this.prisma.article.findUnique({
          where: { id },
        });
    
        if (!article) {
          throw new NotFoundException(`Artigo com ID ${id} não encontrado.`);
        }
    
        return this.prisma.article.update({
          where: { id },
          data: {
            title,
            content,
            tags,
          },
        });
      }

      async remove(id: number) {
        const article = await this.prisma.article.findUnique({
          where: { id },
        });
    
        if (!article) {
          throw new NotFoundException(`Artigo com ID ${id} não encontrado.`);
        }
    
        return this.prisma.article.delete({
          where: { id },
        });
      }
    
      // Retorna artigos filtrados por uma tag específica
      async findByTag(tag: string) {
        return this.prisma.article.findMany({
          where: {
            tags: {
              contains: tag, // Filtra artigos que contenham a tag
            },
          },
          include: {
            author: true,
            comments: true,
          },
        });
      }

      async findByAuthor(authorId: number) {
        return this.prisma.article.findMany({
          where: {
            authorId,
          },
          include: {
            author: true,
            comments: true,
          },
        });
      }


}

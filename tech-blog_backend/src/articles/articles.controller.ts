import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { ArticlesService } from './articles.service';
  import { CreateArticleDto } from './dto/create-article-dto';
  import { UpdateArticleDto } from './dto/update-article-dto';
  
  @Controller('articles')
  export class ArticlesController {
    constructor(private articlesService: ArticlesService) {}
  
    @Get()
    findAll() {
      return this.articlesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const article = await this.articlesService.findOne(+id);
      if (!article) {
        throw new NotFoundException('Artigo não encontrado.');
      }
      return article;
    }
  
    @Post()
    create(@Body() createArticleDto: CreateArticleDto) {
      return this.articlesService.create(createArticleDto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
      return this.articlesService.update(+id, updateArticleDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.articlesService.remove(+id);
    }
  
    @Get('search/tag')
    findByTag(@Query('tag') tag: string) {
      return this.articlesService.findByTag(tag);
    }
  
    @Get('search/author')
    findByAuthor(@Query('authorId') authorId: string) {
      return this.articlesService.findByAuthor(+authorId);
    }
  }
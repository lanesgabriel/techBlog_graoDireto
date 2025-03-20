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
  import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment-dto';
import { UpdateCommentDto } from './dto/update-comment-dto';

  
  @Controller('comments')
  export class CommentsController {
    constructor(private commentsService: CommentsService) {}
  
    @Get()
    findAll() {
      return this.commentsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const comment = await this.commentsService.findOne(+id);
      if (!comment) {
        throw new NotFoundException('Comentário não encontrado.');
      }
      return comment;
    }
  
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
      return this.commentsService.create(createCommentDto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
      return this.commentsService.update(+id, updateCommentDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.commentsService.remove(+id);
    }
  
    @Get('search/article')
    findByArticle(@Query('articleId') articleId: string) {
      return this.commentsService.findByArticle(+articleId);
    }
  
    @Get('search/author')
    findByAuthor(@Query('authorId') authorId: string) {
      return this.commentsService.findByAuthor(+authorId);
    }
  }
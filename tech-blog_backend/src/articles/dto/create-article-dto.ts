import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  authorId: number;

  @IsString()
  @IsOptional()
  tags?: string;
}
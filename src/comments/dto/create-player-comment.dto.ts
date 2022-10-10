import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CommentType } from '../enum/comment-type.enum';

export class CreatePlayerCommentDto {
  @IsString()
  content: string;

  @IsEnum(CommentType)
  @IsOptional()
  type: CommentType;
}

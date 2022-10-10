import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import { CommentRepository } from './comment.repository';
import { CreatePlayerCommentDto } from './dto/create-player-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private commentRepository: CommentRepository) {}
  async createPlayerComment(
    createPlayerCommentDto: CreatePlayerCommentDto,
    player: Player,
    user: User,
  ) {
    return await this.commentRepository.createPlayerComment(
      createPlayerCommentDto,
      player,
      user,
    );
  }
}

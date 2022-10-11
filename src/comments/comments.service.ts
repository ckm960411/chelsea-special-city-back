import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import { CommentRepository } from './comment.repository';
import { CreatePlayerCommentDto } from './dto/create-player-comment.dto';
import { UpdatePlayerCommentDto } from './dto/update-player-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private commentRepository: CommentRepository) {}
  async getPlayerComments(name: string) {
    const converted = name.split('_').join(' ');
    return this.commentRepository.getComments(converted);
  }

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

  async updatePlayerComment(
    user: User,
    commentId: number,
    updatePlayerCommentDto: UpdatePlayerCommentDto,
  ) {
    return this.commentRepository.updatePlayerComment(
      user,
      commentId,
      updatePlayerCommentDto,
    );
  }

  async deletePlayerComment(user: User, commentId: number) {
    return this.commentRepository.deletePlayerComment(user, commentId);
  }
}

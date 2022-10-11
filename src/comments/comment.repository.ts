import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreatePlayerCommentDto } from './dto/create-player-comment.dto';
import { UpdatePlayerCommentDto } from './dto/update-player-comment.dto';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async getComments(name: string) {
    const comments = await this.find({
      where: { player: { name } },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });

    return comments;
  }

  async createPlayerComment(
    createPlayerCommentDto: CreatePlayerCommentDto,
    player: Player,
    user: User,
  ) {
    const { content } = createPlayerCommentDto;

    const comment = this.create({ content, user, player });

    try {
      await this.save(comment);
      return comment;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updatePlayerComment(
    user: User,
    commentId: number,
    updatePlayerCommentDto: UpdatePlayerCommentDto,
  ) {
    const comment = await this.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new BadRequestException();
    }

    comment.content = updatePlayerCommentDto.content;

    try {
      await this.save(comment);
    } catch {
      throw new InternalServerErrorException();
    }

    return comment;
  }
}

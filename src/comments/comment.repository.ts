import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
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
      select: { user: { id: true, username: true } },
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
    const comment = await this.findOne({
      where: { id: commentId },
      relations: { user: true },
      select: { user: { id: true, username: true } },
    });

    if (!comment) {
      throw new BadRequestException();
    }

    if (comment.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    comment.content = updatePlayerCommentDto.content;

    try {
      await this.save(comment);
    } catch {
      throw new InternalServerErrorException();
    }

    return comment;
  }

  async deletePlayerComment(user: User, commentId: number) {
    const comment = await this.findOne({
      where: { id: commentId },
      relations: { user: true },
      select: { user: { id: true } },
    });

    if (!comment) {
      throw new BadRequestException();
    }

    if (user.id !== comment.user.id) {
      throw new UnauthorizedException();
    }

    // 댓글 삭제
    try {
      const result = await this.delete(commentId);
      if (result.affected === 1) {
        return true;
      } else {
        throw new InternalServerErrorException();
      }
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

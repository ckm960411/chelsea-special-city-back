import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreatePlayerCommentDto } from './dto/create-player-comment.dto';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async getComments(name: string) {
    return this.find({ where: { player: { name } } });
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
}

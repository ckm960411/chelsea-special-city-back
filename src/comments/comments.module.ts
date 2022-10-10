import { Module } from '@nestjs/common';
import { PlayerRepository } from 'src/players/players.repository';
import { PlayersService } from 'src/players/players.service';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { CommentRepository } from './comment.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommentRepository, PlayerRepository]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, PlayersService],
})
export class CommentsModule {}

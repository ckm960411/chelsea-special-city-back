import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PlayersService } from 'src/players/players.service';
import { CommentsService } from './comments.service';
import { CreatePlayerCommentDto } from './dto/create-player-comment.dto';
import { UpdatePlayerCommentDto } from './dto/update-player-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private playersService: PlayersService,
  ) {}
  @Get(':playerName')
  async getPlayerComments(@Param('playerName') playerName: string) {
    return this.commentsService.getPlayerComments(playerName);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':playerName')
  async createPlayerComment(
    @Body() createPlayerCommentDto: CreatePlayerCommentDto,
    @Param('playerName') playerName: string,
    @GetUser() user: User,
  ) {
    const player = await this.playersService.getPlayer(playerName);
    return await this.commentsService.createPlayerComment(
      createPlayerCommentDto,
      player,
      user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateComment(
    @GetUser() user: User,
    @Param('id') commentId: number,
    @Body() updatePlayerCommentDto: UpdatePlayerCommentDto,
  ) {
    return this.commentsService.updatePlayerComment(
      user,
      commentId,
      updatePlayerCommentDto,
    );
  }
}

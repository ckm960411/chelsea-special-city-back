import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PlayersService } from 'src/players/players.service';
import { CreateStatsDto } from './dto/create-stats.dto';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly playersService: PlayersService,
  ) {}

  @Post(':playerId')
  @UseGuards(JwtAuthGuard)
  async createOrUpdateStats(
    @GetUser() user: User,
    @Body() createStatsDto: CreateStatsDto,
    @Param('playerId') playerId: number,
  ) {
    const player = await this.playersService.getPlayerById(playerId);

    return this.statsService.createOrUpdateStats(user, createStatsDto, player);
  }

  @Get(':playerId')
  async getPlayerStats(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.statsService.getPlayerStats(playerId);
  }
}

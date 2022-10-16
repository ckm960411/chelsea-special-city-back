import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import { CreateStatsDto } from './dto/create-stats.dto';
import { StatRepository } from './stats.repository';

@Injectable()
export class StatsService {
  constructor(private readonly statRepository: StatRepository) {}

  async createOrUpdateStats(
    user: User,
    createStatsDto: CreateStatsDto,
    player: Player,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.statRepository.createOrUpdateStats(createStatsDto, player);
  }

  async getPlayerStats(playerId: number) {
    return this.statRepository.getPlayerStats(playerId);
  }
}

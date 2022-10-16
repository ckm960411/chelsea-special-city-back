import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import { CreateStatsDto } from './dto/create-stats.dto';
import { StatRepository } from './stats.repository';

@Injectable()
export class StatsService {
  constructor(private readonly statRepository: StatRepository) {}

  async createStats(
    user: User,
    createStatsDto: CreateStatsDto,
    player: Player,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.statRepository.createStats(createStatsDto, player);
  }
}

import { InternalServerErrorException } from '@nestjs/common';
import { Player } from 'src/players/player.entity';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { CreateStatsDto } from './dto/create-stats.dto';
import { Stat } from './stats.entity';

@CustomRepository(Stat)
export class StatRepository extends Repository<Stat> {
  async createStats(createStatsDto: CreateStatsDto, player: Player) {
    const stats = this.create({
      ...createStatsDto,
      player,
    });

    try {
      await this.save(stats);
      return stats;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

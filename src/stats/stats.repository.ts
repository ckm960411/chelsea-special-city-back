import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Player } from 'src/players/player.entity';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { CreateStatsDto } from './dto/create-stats.dto';
import { Stat } from './stats.entity';

@CustomRepository(Stat)
export class StatRepository extends Repository<Stat> {
  async createOrUpdateStats(createStatsDto: CreateStatsDto, player: Player) {
    const stat = await this.createQueryBuilder('stat')
      .where('stat.playerId = :playerId', { playerId: player.id })
      .getOne();

    let data: any;
    if (stat) {
      data = {
        ...stat,
        ...createStatsDto,
      };
    } else {
      data = this.create({
        ...createStatsDto,
        player,
      });
    }

    try {
      await this.save(data);
      return data;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getPlayerStats(playerId: number) {
    const stat = await this.createQueryBuilder('stat')
      .where('stat.playerId = :playerId', { playerId })
      .getOne();

    if (!stat) {
      throw new UnauthorizedException();
    }

    return stat;
  }
}

import { Module } from '@nestjs/common';
import { PlayerRepository } from 'src/players/players.repository';
import { PlayersService } from 'src/players/players.service';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { StatsController } from './stats.controller';
import { StatRepository } from './stats.repository';
import { StatsService } from './stats.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StatRepository, PlayerRepository]),
  ],
  controllers: [StatsController],
  providers: [StatsService, PlayersService],
})
export class StatsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { PlayersController } from './players.controller';
import { PlayerRepository } from './players.repository';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PlayerRepository])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}

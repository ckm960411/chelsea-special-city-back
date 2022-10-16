import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { StatsController } from './stats.controller';
import { StatRepository } from './stats.repository';
import { StatsService } from './stats.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StatRepository])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}

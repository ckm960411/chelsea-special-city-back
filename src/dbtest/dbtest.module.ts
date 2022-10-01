import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { DbtestController } from './dbtest.controller';
import { DbtestRepository } from './dbtest.repository';
import { DbtestService } from './dbtest.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([DbtestRepository])],
  controllers: [DbtestController],
  providers: [DbtestService],
})
export class DbtestModule {}

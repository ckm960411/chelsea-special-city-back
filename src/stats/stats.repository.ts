import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { Stat } from './stats.entity';

@CustomRepository(Stat)
export class StatRepository extends Repository<Stat> {}

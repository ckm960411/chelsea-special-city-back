import { Injectable } from '@nestjs/common';
import { StatRepository } from './stats.repository';

@Injectable()
export class StatsService {
  constructor(private readonly statRepository: StatRepository) {}
}

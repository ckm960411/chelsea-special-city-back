import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbtestRepository } from './dbtest.repository';

@Injectable()
export class DbtestService {
  constructor(
    @InjectRepository(DbtestRepository)
    private readonly dbtestRepository: DbtestRepository,
  ) {}
  async addTestWord(word: string) {
    return await this.dbtestRepository.createWord(word);
  }
}

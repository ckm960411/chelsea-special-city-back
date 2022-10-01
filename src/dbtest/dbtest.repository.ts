import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { Dbtest } from './dbtest.entity';

@CustomRepository(Dbtest)
export class DbtestRepository extends Repository<Dbtest> {
  async createWord(word: string) {
    const createdWord = this.create({ word });

    await this.save(createdWord);

    return createdWord;
  }
}

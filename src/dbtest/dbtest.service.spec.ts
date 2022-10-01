import { Test, TestingModule } from '@nestjs/testing';
import { DbtestService } from './dbtest.service';

describe('DbtestService', () => {
  let service: DbtestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbtestService],
    }).compile();

    service = module.get<DbtestService>(DbtestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

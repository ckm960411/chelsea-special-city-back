import { Test, TestingModule } from '@nestjs/testing';
import { DbtestController } from './dbtest.controller';

describe('DbtestController', () => {
  let controller: DbtestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbtestController],
    }).compile();

    controller = module.get<DbtestController>(DbtestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

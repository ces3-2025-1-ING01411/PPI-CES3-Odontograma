import { Test, TestingModule } from '@nestjs/testing';
import { DentalGraphController } from './dental-graph.controller';

describe('DentalGraphController', () => {
  let controller: DentalGraphController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentalGraphController],
    }).compile();

    controller = module.get<DentalGraphController>(DentalGraphController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

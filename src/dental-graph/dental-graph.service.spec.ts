import { Test, TestingModule } from '@nestjs/testing';
import { DentalGraphService } from './dental-graph.service';

describe('DentalGraphService', () => {
  let service: DentalGraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DentalGraphService],
    }).compile();

    service = module.get<DentalGraphService>(DentalGraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { DentalGraphRecord, DentalGraphRecordSchema } from 'src/schemas/dental-graph.schema';

import { DentalGraphController } from './dental-graph.controller';
import { DentalGraphService } from './dental-graph.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DentalGraphRecord.name, schema: DentalGraphRecordSchema }
    ]),
  ],
  controllers: [DentalGraphController],
  providers: [DentalGraphService]
})
export class DentalGraphModule {}

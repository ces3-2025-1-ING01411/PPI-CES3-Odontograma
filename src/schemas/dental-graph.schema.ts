import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Evolution {
  @Prop(String)
  diagnostic: string;

  @Prop(String)
  date: string

  @Prop(String)
  initialDate: string

  @Prop(String)
  description: string

  @Prop(String)
  user: string
}

export class ToothEvolution {
  @Prop()
  topTop: Evolution[];
  
  @Prop()
  top: Evolution[];

  @Prop()
  right: Evolution[];

  @Prop()
  center: Evolution[];

  @Prop()
  left: Evolution[];

  @Prop()
  bottom: Evolution[];

  @Prop()
  bottomBottom: Evolution[];
}
export class Tooth {
  @Prop()
  topTop: string;
  
  @Prop()
  top: string;

  @Prop()
  right: string;

  @Prop()
  center: string;

  @Prop()
  left: string;

  @Prop()
  bottom: string;

  @Prop()
  bottomBottom: string;
}

export class DentalGraph {

  @Prop()
  quadrant_1: Tooth[];

  @Prop()
  quadrant_2: Tooth[];

  @Prop()
  quadrant_3: Tooth[];

  @Prop()
  quadrant_4: Tooth[];

  @Prop()
  quadrant_5: Tooth[];

  @Prop()
  quadrant_6: Tooth[];

  @Prop()
  quadrant_7: Tooth[];

  @Prop()
  quadrant_8: Tooth[];

}

export class DentalEvolutionGraph {

  @Prop()
  quadrant_1: ToothEvolution[];

  @Prop()
  quadrant_2: ToothEvolution[];

  @Prop()
  quadrant_3: ToothEvolution[];

  @Prop()
  quadrant_4: ToothEvolution[];

  @Prop()
  quadrant_5: ToothEvolution[];

  @Prop()
  quadrant_6: ToothEvolution[];

  @Prop()
  quadrant_7: ToothEvolution[];

  @Prop()
  quadrant_8: ToothEvolution[];

}

@Schema({ collection: 'dental-graph' })
export class DentalGraphRecord {

  @Prop({ type: String, required: true })
  patientDocument: string;

  @Prop({ type: Boolean, default: false })
  saved: boolean;

  @Prop({ type: String, default: "" })
  date: string;

  @Prop({ type: DentalGraph, required: true })
  diagnostic: DentalGraph

  @Prop({ type: DentalGraph, required: true })
  treatment: DentalGraph

  @Prop({ type: DentalGraph, required: true })
  evolution: DentalEvolutionGraph

}

export const DentalGraphRecordSchema = SchemaFactory.createForClass(DentalGraphRecord);

export type DentalGraphRecordDocument = HydratedDocument<DentalGraphRecord>;
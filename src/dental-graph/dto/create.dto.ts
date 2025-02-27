import { DentalEvolutionGraphDto, DentalGraphDto, EvolutionToothDto } from "./common.dto";

export default class CreateDentalGraphRecordDto {
  readonly patientDocument: string;
  readonly diagnostic: DentalGraphDto;
  readonly treatment: DentalGraphDto;
  readonly evolution: DentalEvolutionGraphDto;
}

export class CreateEvolutionDto {
  readonly tooth: number;
  readonly quadrant: "quadrant_1" | "quadrant_2" | "quadrant_3" | "quadrant_4" | "quadrant_5" | "quadrant_6" | "quadrant_7" | "quadrant_8";
  readonly region: keyof EvolutionToothDto;
  readonly diagnostic: string;
  readonly date: string;
  readonly initial_date: string;
  readonly description: string;
  readonly user: string
  readonly patient: string
}

export class CreateMultipleEvolutionsDto {
  readonly tooth: number;
  readonly quadrant: "quadrant_1" | "quadrant_2" | "quadrant_3" | "quadrant_4" | "quadrant_5" | "quadrant_6" | "quadrant_7" | "quadrant_8";
  readonly diagnostic: string;
  readonly date: string;
  readonly initial_date: string;
  readonly description: string;
  readonly user: string
  readonly patient: string
}
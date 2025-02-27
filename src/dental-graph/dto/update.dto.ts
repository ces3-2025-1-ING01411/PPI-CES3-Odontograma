import { DentalEvolutionGraphDto, DentalGraphDto } from "./common.dto";

export default class UpdateDentalGraphRecordDto {
  readonly patientDocument: string;
  readonly saved: boolean;
  readonly date: string;
  readonly diagnostic: DentalGraphDto;
  readonly treatment: DentalGraphDto;
  readonly evolution: DentalEvolutionGraphDto;
}
export class Evolution {
  readonly diagnostic: string;
  readonly date: string;
  readonly description: string;
  readonly initialDate: string;
  readonly user: string;
}

export class ToothDto {
  readonly topTop: string;
  readonly top: string;
  readonly right: string;
  readonly center: string;
  readonly left: string;
  readonly bottom: string;
  readonly bottomBottom: string;
}

export class EvolutionToothDto {
  readonly topTop: Evolution[];
  readonly top: Evolution[];
  readonly right: Evolution[];
  readonly center: Evolution[];
  readonly left: Evolution[];
  readonly bottom: Evolution[];
  readonly bottomBottom: Evolution[];
}

export class DentalGraphDto {
  readonly quadrant_1: ToothDto[];
  readonly quadrant_2: ToothDto[];
  readonly quadrant_3: ToothDto[];
  readonly quadrant_4: ToothDto[];
  readonly quadrant_5: ToothDto[];
  readonly quadrant_6: ToothDto[];
  readonly quadrant_7: ToothDto[];
  readonly quadrant_8: ToothDto[];
}

export class DentalEvolutionGraphDto {
  readonly quadrant_1: EvolutionToothDto[];
  readonly quadrant_2: EvolutionToothDto[];
  readonly quadrant_3: EvolutionToothDto[];
  readonly quadrant_4: EvolutionToothDto[];
  readonly quadrant_5: EvolutionToothDto[];
  readonly quadrant_6: EvolutionToothDto[];
  readonly quadrant_7: EvolutionToothDto[];
  readonly quadrant_8: EvolutionToothDto[];
}
import { EvolutionToothDto } from "src/dental-graph/dto/common.dto";

export const createEmptyEvolutionTooths = (amount: number = 1): EvolutionToothDto[] => {
  if (amount < 1) return;
  const EMPTY_TOOTH = { topTop: [], top: [], left: [], center: [], right: [], bottom: [], bottomBottom: [] }
  return Array.from({ length: amount }, () => ({ ...EMPTY_TOOTH }))
}

export const createEmptyTooths = (amount: number = 1) => {
  if (amount < 1) return;
  const EMPTY_TOOTH = { topTop: '', top: '', left: '', center: '', right: '', bottom: '', bottomBottom: '' }
  return Array.from({ length: amount }, () => ({ ...EMPTY_TOOTH }))
}

export const createEmptyRecord = () => {
  const EMPTY_QUADRANT = {
    quadrant_1: createEmptyTooths(8),
    quadrant_2: createEmptyTooths(8),
    quadrant_3: createEmptyTooths(8),
    quadrant_4: createEmptyTooths(8),
    quadrant_5: createEmptyTooths(5),
    quadrant_6: createEmptyTooths(5),
    quadrant_7: createEmptyTooths(5),
    quadrant_8: createEmptyTooths(5),
  }

  const EMPTY_EVOLUTION_QUADRANT = {
    quadrant_1: createEmptyEvolutionTooths(8),
    quadrant_2: createEmptyEvolutionTooths(8),
    quadrant_3: createEmptyEvolutionTooths(8),
    quadrant_4: createEmptyEvolutionTooths(8),
    quadrant_5: createEmptyEvolutionTooths(5),
    quadrant_6: createEmptyEvolutionTooths(5),
    quadrant_7: createEmptyEvolutionTooths(5),
    quadrant_8: createEmptyEvolutionTooths(5),
  };

  return {
    diagnostic: { ...EMPTY_QUADRANT },
    treatment: { ...EMPTY_QUADRANT },
    evolution: { ...EMPTY_EVOLUTION_QUADRANT }
  }
}
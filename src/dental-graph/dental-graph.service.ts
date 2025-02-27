import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DentalGraphRecord, DentalGraphRecordDocument, Evolution, ToothEvolution } from 'src/schemas/dental-graph.schema';
import CreateDentalGraphRecordDto, { CreateEvolutionDto, CreateMultipleEvolutionsDto } from './dto/create.dto';
import UpdateDentalGraphRecordDto from './dto/update.dto';
import { createEmptyEvolutionTooths, createEmptyRecord, createEmptyTooths } from 'src/helpers/tooth.helper';

@Injectable()
export class DentalGraphService {
  constructor(@InjectModel(DentalGraphRecord.name) private dentalGraphModel: Model<DentalGraphRecordDocument>) {}

  async findCurrentDentalGraphByPatient(patientDocument: string): Promise<DentalGraphRecord> {
    try{
      const currentDentalGraphs = await this.dentalGraphModel.find({ patientDocument, saved: false }).exec();
      if(currentDentalGraphs.length === 0) {

        const EMPTY_RECORD = createEmptyRecord();

        const newDentalGraph = await this.create({ 
          patientDocument,
          ...EMPTY_RECORD
        });
        return newDentalGraph
      }
      return currentDentalGraphs[0]
    }catch(err){
      console.error(err);
    }
  }

  async findHistoricalByPatient(name: string): Promise<DentalGraphRecord[]> {
    return this.dentalGraphModel.find({ patientDocument: name, saved: true }).exec();
  }

  async findOne(id: string): Promise<DentalGraphRecord> {
    return this.dentalGraphModel.findById(id).exec();
  }

  async create(createDentalGraphRecordDto: CreateDentalGraphRecordDto): Promise<DentalGraphRecord> {
    const createdDentalGraphRecord = new this.dentalGraphModel(createDentalGraphRecordDto);
    return createdDentalGraphRecord.save();
  }

  async update(id: string, updateDentalGraphModelDto: UpdateDentalGraphRecordDto): Promise<DentalGraphRecord> {
    return this.dentalGraphModel.findByIdAndUpdate(id, updateDentalGraphModelDto, { new: true }).exec();
  }

  async createEvolution(createEvolutionDto: CreateEvolutionDto): Promise<DentalGraphRecord> {
    const currentDentalGraphs = await this.dentalGraphModel.find({ patientDocument: new RegExp(createEvolutionDto.patient, 'i'), saved: false }).exec();
    if(currentDentalGraphs.length === 0) {
      const EMPTY_RECORD = createEmptyRecord();
      const newRecord = { patientDocument: createEvolutionDto.patient, ...EMPTY_RECORD }
      newRecord.evolution[createEvolutionDto.quadrant][createEvolutionDto.tooth][createEvolutionDto.region].push({ 
        diagnostic: createEvolutionDto.diagnostic,
        date: createEvolutionDto.date,
        initialDate: createEvolutionDto.initial_date,
        description: createEvolutionDto.description,
        user: createEvolutionDto.user
      })
      const newDentalGraph = await this.create(newRecord);
      return newDentalGraph
    } else {
      const newRecord = JSON.parse(JSON.stringify(currentDentalGraphs[0]));
      newRecord.evolution[createEvolutionDto.quadrant][createEvolutionDto.tooth][createEvolutionDto.region].push({ 
        diagnostic: createEvolutionDto.diagnostic,
        date: createEvolutionDto.date,
        initialDate: createEvolutionDto.initial_date,
        description: createEvolutionDto.description,
        user: createEvolutionDto.user
      })
      return this.dentalGraphModel.findByIdAndUpdate(newRecord._id, newRecord, { new: true }).exec();
    }
  }

  async createMultipleEvolutions(createEvolutionDto: CreateMultipleEvolutionsDto): Promise<DentalGraphRecord> {
    const patient = createEvolutionDto.patient
    const currentDentalGraphs = await this.dentalGraphModel.find({ patientDocument: patient, saved: false }).exec();
    if(currentDentalGraphs.length === 0) {
      const EMPTY_RECORD = createEmptyRecord();
      const newRecord = { patientDocument: patient, ...EMPTY_RECORD };
      ['topTop', 'top', 'left', 'center', 'right', 'bottom', 'bottomBottom'].forEach(region => {
        newRecord.evolution[createEvolutionDto.quadrant][createEvolutionDto.tooth][region].push({ 
          diagnostic: createEvolutionDto.diagnostic,
          date: createEvolutionDto.date,
          initialDate: createEvolutionDto.initial_date,
          description: createEvolutionDto.description,
          user: createEvolutionDto.user
        })
      })
      const newDentalGraph = await this.create(newRecord);
      return newDentalGraph
    } else {
      const newRecord = JSON.parse(JSON.stringify(currentDentalGraphs[0]));
      ['topTop', 'top', 'left', 'center', 'right', 'bottom', 'bottomBottom'].forEach(region => {
        newRecord.evolution[createEvolutionDto.quadrant][createEvolutionDto.tooth][region].push({ 
          diagnostic: createEvolutionDto.diagnostic,
          date: createEvolutionDto.date,
          initialDate: createEvolutionDto.initial_date,
          description: createEvolutionDto.description,
          user: createEvolutionDto.user
        })
      })
      return this.dentalGraphModel.findByIdAndUpdate(newRecord._id, newRecord, { new: true }).exec();
    }
  }

  async findEvolutions(patientDocument: string): Promise<any[]> {
    try{
      const currentDentalGraphs = await this.dentalGraphModel.find({ patientDocument: new RegExp(patientDocument, 'i'), saved: false }).exec();
      if(currentDentalGraphs.length === 0) {

        const EMPTY_RECORD = createEmptyRecord();

        await this.create({ 
          patientDocument,
          ...EMPTY_RECORD
        });

        return []
      }

      //TODO: CHANGE LOGIC, THIS IS NOT A GOOD ONE
      const formattedDentalGraph: DentalGraphRecord = JSON.parse(JSON.stringify(currentDentalGraphs[0]))
      const { evolution } = formattedDentalGraph
      const allEvolutions = Object.entries(evolution).map(currentEntry => {
        const quadrant: string = currentEntry[0]
        const tooths: ToothEvolution[] = currentEntry[1]
        return tooths.map((currentTooth, index) => {
          return Object.entries(currentTooth).map(currentEntry => {
            const tooth: number = index + 1;
            const region: string = currentEntry[0]
            const evolutions: Evolution[] = currentEntry[1]
            return evolutions.map(currentEvolution => ({ ...currentEvolution, tooth, region, quadrant }))
          }).flat()
        }).flat()
      }).flat()
      return allEvolutions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }catch(err){
      console.error(err);
    }
  }
}

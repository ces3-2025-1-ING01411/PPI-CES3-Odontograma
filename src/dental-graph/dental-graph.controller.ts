import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { DentalGraphService } from './dental-graph.service';

import CreateDentalGraphRecordDto, { CreateEvolutionDto, CreateMultipleEvolutionsDto } from './dto/create.dto';
import UpdateDentalGraphRecordDto from './dto/update.dto';

@Controller('dentalGraph')
export class DentalGraphController {
  constructor(private readonly yourService: DentalGraphService) {}

  @Get('current/:patientDocument')
  findCurrent(@Param("patientDocument") patientDocument: string) {
    // console.log('entre')
    return this.yourService.findCurrentDentalGraphByPatient(patientDocument);
  }

  @Get('historical/:patientDocument')
  findHistorical(@Param(":patientDocument") patientDocument: string) {
    return this.yourService.findHistoricalByPatient(patientDocument);
  }

  @Get(':id')
  findOne(@Param(":id") id: string) {
    return this.yourService.findOne(id);
  }

  @Post()
  create(@Body() createDentalGraphRecordDto: CreateDentalGraphRecordDto) {
    return this.yourService.create(createDentalGraphRecordDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDentalGraphModelDto: UpdateDentalGraphRecordDto) {
    return this.yourService.update(id, updateDentalGraphModelDto);
  }

  @Get('evolution/:patientDocument')
  findEvolutions(@Param("patientDocument") patientDocument: string) {
    return this.yourService.findEvolutions(patientDocument);
  }

  @Post('evolution')
  saveEvolution(@Body() createEvolutionDto: CreateEvolutionDto) {
    return this.yourService.createEvolution(createEvolutionDto);
  }

  @Post('multipleEvolutions')
  saveMultipleEvolutions(@Body() createEvolutionsDto: CreateMultipleEvolutionsDto) {
    return this.yourService.createMultipleEvolutions(createEvolutionsDto);
  }
}

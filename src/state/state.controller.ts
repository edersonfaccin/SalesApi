import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StateService } from './state.service';
import { StateDto } from './dto/state.dto';
import { StatePartialDto } from './dto/statePartial.dto';

@ApiTags('state')
@Controller('state')
export class StateController {
    constructor(private readonly stateService: StateService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: StateDto) {
        const newRecord = await this.stateService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.stateService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/idcompany/:id')
    async findByIdCompany(@Res() response, @Param('id') id) {
        const data = await this.stateService.findAllByCompany(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.stateService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: StatePartialDto, @Param('id') id): Promise<StateDto> {
        const oldData = await this.stateService.findOne(id);
        return await this.stateService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.stateService.delete(id);
    }
}

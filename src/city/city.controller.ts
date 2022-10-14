import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';
import { CityPartialDto } from './dto/cityPartial.dto';

@ApiTags('city')
@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CityDto) {
        const newRecord = await this.cityService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.cityService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/idcompany/:id')
    async findByIdCompany(@Res() response, @Param('id') id) {
        const data = await this.cityService.findAllByCompany(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.cityService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CityPartialDto, @Param('id') id): Promise<CityDto> {
        const oldData = await this.cityService.findOne(id);
        return await this.cityService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.cityService.delete(id);
    }
}

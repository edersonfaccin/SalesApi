import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IcmsTableDto } from './dto/icmsTable.dto';
import { IcmsTablePartialDto } from './dto/icmsTablePartial.dto';
import { IcmsTableService } from './icmsTable.service';

@ApiTags('icms_table')
@Controller('icms_table')
export class IcmsTableController {
    constructor(private readonly icmsTableService: IcmsTableService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: IcmsTableDto) {
        const newRecord = await this.icmsTableService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.icmsTableService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.icmsTableService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: IcmsTablePartialDto, @Param('id') id): Promise<IcmsTableDto> {
        const oldData = await this.icmsTableService.findOne(id);
        return await this.icmsTableService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.icmsTableService.delete(id);
    }
}

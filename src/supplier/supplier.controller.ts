import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './dto/supplier.dto';
import { SupplierPartialDto } from './dto/supplierPartial.dto';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: SupplierDto) {
        const newRecord = await this.supplierService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.supplierService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.supplierService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: SupplierPartialDto, @Param('id') id): Promise<SupplierDto> {
        const oldData = await this.supplierService.findOne(id);
        return await this.supplierService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.supplierService.delete(id);
    }
}

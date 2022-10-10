import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupplierPixKeyService } from './supplierPixKey.service';
import { SupplierPixKeyDto } from './dto/supplierPixKey.dto';
import { SupplierPixKeyPartialDto } from './dto/supplierPixKeyPartial.dto';

@ApiTags('supplier_pix_key')
@Controller('supplier_pix_key')
export class SupplierPixKeyController {
    constructor(private readonly supplierPixKeyService: SupplierPixKeyService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: SupplierPixKeyDto) {
        const newRecord = await this.supplierPixKeyService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.supplierPixKeyService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.supplierPixKeyService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/supplier/:id')
    async findAllBySupplier(@Res() response, @Param('id') id) {
        const data = await this.supplierPixKeyService.findAllBySupplier(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: SupplierPixKeyPartialDto, @Param('id') id): Promise<SupplierPixKeyDto> {
        const oldData = await this.supplierPixKeyService.findOne(id);
        return await this.supplierPixKeyService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.supplierPixKeyService.delete(id);
    }
}

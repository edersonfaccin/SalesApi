import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoicePartialDto } from './dto/invoicePartial.dto';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: InvoiceDto) {
        const newRecord = await this.invoiceService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.invoiceService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.invoiceService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: InvoicePartialDto, @Param('id') id): Promise<InvoiceDto> {
        const oldData = await this.invoiceService.findOne(id);
        return await this.invoiceService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.invoiceService.delete(id);
    }
}

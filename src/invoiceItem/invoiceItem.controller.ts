import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceItemDto } from './dto/invoiceItem.dto';
import { InvoiceItemPartialDto } from './dto/invoiceItemPartial.dto';
import { InvoiceItemService } from './invoiceItem.service';

@ApiTags('invoice_item')
@Controller('invoice_item')
export class InvoiceItemController {
    constructor(private readonly invoiceItemService: InvoiceItemService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: InvoiceItemDto) {
        const newRecord = await this.invoiceItemService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.invoiceItemService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.invoiceItemService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: InvoiceItemPartialDto, @Param('id') id): Promise<InvoiceItemDto> {
        const oldData = await this.invoiceItemService.findOne(id);
        return await this.invoiceItemService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.invoiceItemService.delete(id);
    }
}

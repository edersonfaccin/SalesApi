import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceBillingDto } from './dto/invoiceBilling.dto';
import { InvoiceBillingPartialDto } from './dto/invoiceBillingPartial.dto';
import { InvoiceBillingService } from './invoiceBilling.service';

@ApiTags('invoice_billing')
@Controller('invoice_billing')
export class InvoiceBillingController {
    constructor(private readonly invoiceBillingService: InvoiceBillingService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: InvoiceBillingDto) {
        const newRecord = await this.invoiceBillingService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    /* @Get()
    async fetchAll(@Res() response) {
        const list = await this.invoiceBillingService.findAll();
        return response.status(HttpStatus.OK).json(list)
    } */

    //@UseGuards(JwtAuthGuard)
    /* @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.invoiceBillingService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    } */

    //@UseGuards(JwtAuthGuard)
    /* @Patch(':id')
    async update(@Body() updatedData: InvoiceBillingPartialDto, @Param('id') id): Promise<InvoiceBillingDto> {
        const oldData = await this.invoiceBillingService.findOne(id);
        return await this.invoiceBillingService.update(oldData, updatedData);
    } */

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.invoiceBillingService.delete(id);
    }
}

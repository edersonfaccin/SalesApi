import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupplierBankAccountService } from './supplierBankAccount.service';
import { SupplierBankAccountDto } from './dto/supplierBankAccount.dto';
import { SupplierBankAccountPartialDto } from './dto/supplierBankAccountPartial.dto';

@ApiTags('supplier_bank_account')
@Controller('supplier_bank_account')
export class SupplierBankAccountController {
    constructor(private readonly supplierBankAccountService: SupplierBankAccountService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: SupplierBankAccountDto) {
        const newRecord = await this.supplierBankAccountService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.supplierBankAccountService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.supplierBankAccountService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/supplier/:id')
    async findAllBySupplier(@Res() response, @Param('id') id) {
        const data = await this.supplierBankAccountService.findAllBySupplier(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: SupplierBankAccountPartialDto, @Param('id') id): Promise<SupplierBankAccountDto> {
        const oldData = await this.supplierBankAccountService.findOne(id);
        return await this.supplierBankAccountService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.supplierBankAccountService.delete(id);
    }
}

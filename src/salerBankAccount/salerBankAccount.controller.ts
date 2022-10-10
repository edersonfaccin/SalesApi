import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalerBankAccountService } from './salerBankAccount.service';
import { SalerBankAccountDto } from './dto/salerBankAccount.dto';
import { SalerBankAccountPartialDto } from './dto/salerBankAccountPartial.dto';

@ApiTags('saler_bank_account')
@Controller('saler_bank_account')
export class SalerBankAccountController {
    constructor(private readonly salerBankAccountService: SalerBankAccountService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: SalerBankAccountDto) {
        const newRecord = await this.salerBankAccountService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.salerBankAccountService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.salerBankAccountService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/saler/:id')
    async findAllBySaler(@Res() response, @Param('id') id) {
        const data = await this.salerBankAccountService.findAllBySaler(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: SalerBankAccountPartialDto, @Param('id') id): Promise<SalerBankAccountDto> {
        const oldData = await this.salerBankAccountService.findOne(id);
        return await this.salerBankAccountService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.salerBankAccountService.delete(id);
    }
}

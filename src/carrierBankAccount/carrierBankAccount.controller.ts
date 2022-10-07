import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarrierBankAccountService } from './carrierBankAccount.service';
import { CarrierBankAccountDto } from './dto/carrierBankAccount.dto';
import { CarrierBankAccountPartialDto } from './dto/carrierBankAccountPartial.dto';

@ApiTags('carrier_bank_account')
@Controller('carrier_bank_account')
export class CarrierBankAccountController {
    constructor(private readonly carrierBankAccountService: CarrierBankAccountService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CarrierBankAccountDto) {
        const newRecord = await this.carrierBankAccountService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.carrierBankAccountService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.carrierBankAccountService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CarrierBankAccountPartialDto, @Param('id') id): Promise<CarrierBankAccountDto> {
        const oldData = await this.carrierBankAccountService.findOne(id);
        return await this.carrierBankAccountService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.carrierBankAccountService.delete(id);
    }
}

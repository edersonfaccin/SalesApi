import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerBankAccountService } from './customerBankAccount.service';
import { CustomerBankAccountDto } from './dto/customerBankAccount.dto';
import { CustomerBankAccountPartialDto } from './dto/customerBankAccountPartial.dto';

@ApiTags('customer_bank_account')
@Controller('customer_bank_account')
export class CustomerBankAccountController {
    constructor(private readonly customerBankAccountService: CustomerBankAccountService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CustomerBankAccountDto) {
        const newRecord = await this.customerBankAccountService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.customerBankAccountService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/idcompany/:id')
    async findByIdCompany(@Res() response, @Param('id') id) {
        const data = await this.customerBankAccountService.findAllByCompany(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.customerBankAccountService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/customer/:id')
    async findAllByCustomer(@Res() response, @Param('id') id) {
        const data = await this.customerBankAccountService.findAllByCustomer(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CustomerBankAccountPartialDto, @Param('id') id): Promise<CustomerBankAccountDto> {
        const oldData = await this.customerBankAccountService.findOne(id);
        return await this.customerBankAccountService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.customerBankAccountService.delete(id);
    }
}

import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerPixKeyService } from './customerPixKey.service';
import { CustomerPixKeyDto } from './dto/customerPixKey.dto';
import { CustomerPixKeyPartialDto } from './dto/customerPixKeyPartial.dto';

@ApiTags('customer_pix_key')
@Controller('customer_pix_key')
export class CustomerPixKeyController {
    constructor(private readonly customerPixKeyService: CustomerPixKeyService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CustomerPixKeyDto) {
        const newRecord = await this.customerPixKeyService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.customerPixKeyService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/idcompany/:id')
    async findByIdCompany(@Res() response, @Param('id') id) {
        const data = await this.customerPixKeyService.findAllByCompany(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.customerPixKeyService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/customer/:id')
    async findAllByCustomer(@Res() response, @Param('id') id) {
        const data = await this.customerPixKeyService.findAllByCustomer(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CustomerPixKeyPartialDto, @Param('id') id): Promise<CustomerPixKeyDto> {
        const oldData = await this.customerPixKeyService.findOne(id);
        return await this.customerPixKeyService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.customerPixKeyService.delete(id);
    }
}

import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodDto } from './dto/paymentMethod.dto';
import { PaymentMethodPartialDto } from './dto/paymentMethodPartial.dto';

@ApiTags('paymentMethod')
@Controller('paymentMethod')
export class PaymentMethodController {
    constructor(private readonly paymentMethodService: PaymentMethodService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: PaymentMethodDto) {
        const newRecord = await this.paymentMethodService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.paymentMethodService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.paymentMethodService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: PaymentMethodPartialDto, @Param('id') id): Promise<PaymentMethodDto> {
        const oldData = await this.paymentMethodService.findOne(id);
        return await this.paymentMethodService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.paymentMethodService.delete(id);
    }
}

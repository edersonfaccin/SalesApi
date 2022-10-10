import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentConditionService } from './paymentCondition.service';
import { PaymentConditionDto } from './dto/paymentCondition.dto';
import { PaymentConditionPartialDto } from './dto/paymentConditionPartial.dto';

@ApiTags('payment_condition')
@Controller('payment_condition')
export class PaymentConditionController {
    constructor(private readonly paymentConditionService: PaymentConditionService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: PaymentConditionDto) {
        const newRecord = await this.paymentConditionService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.paymentConditionService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.paymentConditionService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: PaymentConditionPartialDto, @Param('id') id): Promise<PaymentConditionDto> {
        const oldData = await this.paymentConditionService.findOne(id);
        return await this.paymentConditionService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.paymentConditionService.delete(id);
    }
}

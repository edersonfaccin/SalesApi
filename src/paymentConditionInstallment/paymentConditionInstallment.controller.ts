import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentConditionInstallmentDto } from './dto/paymentConditionInstallment.dto';
import { PaymentConditionInstallmentPartialDto } from './dto/paymentConditionInstallmentPartial.dto';
import { PaymentConditionInstallmentService } from './paymentConditionInstallment.service';

@ApiTags('payment_conditions_installment')
@Controller('payment_conditions_installment')
export class PaymentConditionInstallmentController {
    constructor(private readonly paymentConditionInstallmentService: PaymentConditionInstallmentService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: PaymentConditionInstallmentDto) {
        const newRecord = await this.paymentConditionInstallmentService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.paymentConditionInstallmentService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.paymentConditionInstallmentService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: PaymentConditionInstallmentPartialDto, @Param('id') id): Promise<PaymentConditionInstallmentDto> {
        const oldData = await this.paymentConditionInstallmentService.findOne(id);
        return await this.paymentConditionInstallmentService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.paymentConditionInstallmentService.delete(id);
    }
}

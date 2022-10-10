import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { OrderPartialDto } from './dto/orderPartial.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: OrderDto) {
        const newRecord = await this.orderService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.orderService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.orderService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: OrderPartialDto, @Param('id') id): Promise<OrderDto> {
        const oldData = await this.orderService.findOne(id);
        return await this.orderService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.orderService.delete(id);
    }
}

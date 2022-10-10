import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemPartialDto } from './dto/orderItemPartial.dto';
import { OrderItemService } from './orderItem.service';

@ApiTags('order_item')
@Controller('order_item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: OrderItemDto) {
        const newRecord = await this.orderItemService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.orderItemService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.orderItemService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: OrderItemPartialDto, @Param('id') id): Promise<OrderItemDto> {
        const oldData = await this.orderItemService.findOne(id);
        return await this.orderItemService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.orderItemService.delete(id);
    }
}

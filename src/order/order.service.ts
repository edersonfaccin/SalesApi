import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { OrderItemService } from 'src/orderItem/orderItem.service';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { OrderPartialDto } from './dto/orderPartial.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>,
        private readonly orderItemService: OrderItemService
    ) {}

    async findAll(): Promise<OrderDto[]> {
        try {
            return this.orderRepository.find({
                loadRelationIds: false,
                relations: [
                    'idcompany',
                    'idcustomer',
                    'idsaler',
                    'idcarrier',
                    'idpayment_method',
                    'idpayment_condition',
                    'idcfop'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<OrderDto> {
        try {
            return await this.orderRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false,
                relations: [
                    'idcompany',
                    'idcustomer',
                    'idsaler',
                    'idcarrier',
                    'idpayment_method',
                    'idpayment_condition',
                    'idcfop'
                ]
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: OrderDto): Promise<OrderDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let orderData = await this.orderRepository.save(data)
                const promises = []

                data.items.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idorder: orderData.id,
                        idproduct: item.idproduct,
                        amount_ordered: item.amount_ordered,
                        amount_invoiced: item.amount_invoiced,
                        amount_reserved: item.amount_reserved,
                        amount_balance: item.amount_balance,
                        amount_served: item.amount_served,
                        value: item.value,
                        perc_commission: item.perc_commission,
                        value_commission: item.value_commission,
                        perc_ipi: item.perc_ipi,
                        perc_icms: item.perc_icms,
                        value_ipi: item.value_ipi,
                        value_icms: item.value_icms,
                        value_without_ipi: item.value_without_ipi,
                        value_with_ipi: item.value_with_ipi
                    }
                    promises.push(this.orderItemService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return orderData
                }).catch(error => {
                    throw new Error(error);
                })
                
                return orderData
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: OrderDto, newValues: OrderPartialDto): Promise<OrderDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.orderRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.orderRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}

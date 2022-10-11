import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { InvoiceItemService } from 'src/invoiceItem/invoiceItem.service';
import { Repository } from 'typeorm';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoicePartialDto } from './dto/invoicePartial.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private invoiceRepository: Repository<Invoice>,
        private readonly invoiceItemService: InvoiceItemService
    ) {}

    async findAll(): Promise<InvoiceDto[]> {
        try {
            return this.invoiceRepository.find({
                loadRelationIds: false,
                relations: [
                    'idcompany',
                    'idcustomer',
                    'idsaler',
                    'idcarrier',
                    'idpayment_method',
                    'idpayment_condition',
                    'idcfop',
                    'idorder'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<InvoiceDto> {
        try {
            return await this.invoiceRepository.findOne({ 
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
                    'idcfop',
                    'idorder'
                ]
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: InvoiceDto): Promise<InvoiceDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let invoiceData = await this.invoiceRepository.save(data)
                const promises = []

                data.items.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idinvoice: invoiceData.id,
                        idproduct: item.idproduct,
                        amount_invoiceed: item.amount_invoiceed,
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
                    promises.push(this.invoiceItemService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return invoiceData
                }).catch(error => {
                    throw new Error(error);
                })
                
                return invoiceData
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: InvoiceDto, newValues: InvoicePartialDto): Promise<InvoiceDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.invoiceRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.invoiceRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}

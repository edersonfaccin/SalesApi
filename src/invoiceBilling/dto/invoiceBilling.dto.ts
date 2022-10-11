import { IsNotEmpty } from 'class-validator';
import { TypeStatusInvoiceBilling } from '../entities/invoiceBilling.entity';

export class InvoiceBillingDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe a nota fiscal' })
    idinvoice?: string

    dueDate?: Date

    amount?: number

    value?: number

    idpayment_method?: string

    paymentDate?: Date

    cancellationDate?: Date
    
    status?: TypeStatusInvoiceBilling
}
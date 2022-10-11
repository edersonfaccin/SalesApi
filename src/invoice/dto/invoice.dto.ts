import { IsArray, IsNotEmpty } from 'class-validator';
import { TypeStatusInvoice, TypeTransport } from '../entities/invoice.entity';

export class InvoiceDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o pedido' })
    idorder?: string

    @IsNotEmpty({ message: 'Informe o cliente' })
    idcustomer?: string

    idsaler?: string

    idcarrier?: string

    saler_percent?: number

    @IsNotEmpty({ message: 'Informe a forma de pagamento' })
    idpayment_method?: string

    @IsNotEmpty({ message: 'Informe a condicao de pagamento' })
    idpayment_condition?: string

    @IsNotEmpty({ message: 'Informe o cfop' })
    idcfop?: string

    amount?: number

    value_products?: number

    value_base_calc?: number

    value_total_order?: number

    value_commission?: number

    value_icms?: number

    value_ipi?: number

    net_weight?: number

    gross_weight?: number

    value_transport?: number

    transport_type?: TypeTransport

    description?: string

    status?: TypeStatusInvoice

    @IsArray()
    items?: any[]
}
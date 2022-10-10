import { IsArray, IsNotEmpty } from 'class-validator';
import { TypeStatusOrder, TypeTransport } from '../entities/order.entity';

export class OrderDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    buy_order?: string

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

    status?: TypeStatusOrder

    @IsArray()
    items?: any[]
}
import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o pedido' })
    idorder?: string

    @IsNotEmpty({ message: 'Informe o produto' })
    idproduct?: string

    amount_ordered?: number

    amount_invoiced?: number

    amount_reserved?: number

    amount_balance?: number

    amount_served?: number

    value?: number

    perc_commission?: number

    value_commission?: number

    perc_ipi?: number
    
    perc_icms?: number

    value_ipi?: number

    value_icms?: number

    value_without_ipi?: number

    value_with_ipi?: number
}
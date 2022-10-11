import { IsNotEmpty } from 'class-validator';

export class InvoiceItemDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe a nota fiscal' })
    idinvoice?: string

    @IsNotEmpty({ message: 'Informe o produto' })
    idproduct?: string

    amount?: number

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
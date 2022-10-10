import { IsNotEmpty } from 'class-validator';

export class PaymentConditionInstallmentDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe a condicao de pagamento' })
    idpayment_condition?: string

    @IsNotEmpty({ message: 'Informe o percentual' })
    percent?: number

    @IsNotEmpty({ message: 'Informe a quantidade de dias' })
    days?: number
}
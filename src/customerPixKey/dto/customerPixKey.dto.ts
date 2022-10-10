import { IsNotEmpty } from 'class-validator';

export class CustomerPixKeyDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o cliente' })
    idcustomer?: string

    @IsNotEmpty({ message: 'Informe a chave PIX' })
    key?: string

    active?: boolean
}
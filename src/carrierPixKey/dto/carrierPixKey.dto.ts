import { IsNotEmpty } from 'class-validator';

export class CarrierPixKeyDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o transportador' })
    idcarrier?: string

    @IsNotEmpty({ message: 'Informe a chave PIX' })
    key?: string

    active?: boolean
}
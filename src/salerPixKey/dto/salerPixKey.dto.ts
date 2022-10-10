import { IsNotEmpty } from 'class-validator';

export class SalerPixKeyDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o vendedor' })
    idsaler?: string

    @IsNotEmpty({ message: 'Informe a chave PIX' })
    key?: string

    active?: boolean
}
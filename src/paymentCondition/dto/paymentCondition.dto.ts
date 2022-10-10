import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class PaymentConditionDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    @IsArray()
    installments?: any[]

    active?: boolean
}
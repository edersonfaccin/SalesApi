import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BankDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o codigo do banco' })
    @Length(1, 15, { message: 'O campo codigo deve ter de 1 a 15 caracteres' })
    bank_number?: string

    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    active?: boolean
}
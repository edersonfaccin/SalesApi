import { IsNotEmpty } from 'class-validator';
import { TypeAccount } from '../entities/salerBankAccount.entity';

export class SalerBankAccountDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o vendedor' })
    idsaler?: string

    @IsNotEmpty({ message: 'Informe o banco' })
    idbank?: string

    @IsNotEmpty({ message: 'Informe a agencia' })
    agency_number?: string

    @IsNotEmpty({ message: 'Informe a conta' })
    account_number?: string
    
    @IsNotEmpty({ message: 'Informe o tipo de conta' })
    type_account?: TypeAccount

    active?: boolean
}
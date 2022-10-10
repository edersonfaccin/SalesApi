import { IsNotEmpty } from 'class-validator';

export class SupplierPixKeyDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o fornecedor' })
    idsupplier?: string

    @IsNotEmpty({ message: 'Informe a chave PIX' })
    key?: string

    active?: boolean
}
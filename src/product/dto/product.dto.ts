import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProductDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    @IsString({ message: 'Descricao deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Descricao' })
    @Length(1, 500, { message: 'O campo Descricao deve ter de 1 a 100 caracteres' })
    description?: string

    @IsString({ message: 'Referencia deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Referencia' })
    @Length(1, 20, { message: 'O campo Referencia deve ter de 1 a 100 caracteres' })
    reference?: string

    @IsNotEmpty({ message: 'Informe a cor' })
    idcolor?: string

    @IsNotEmpty({ message: 'Informe a categoria' })
    idcategory?: string

    @IsNotEmpty({ message: 'Informe a unidade' })
    idunit?: string

    @IsNotEmpty({ message: 'Informe o peso liquido' })
    net_weight?: number

    @IsNotEmpty({ message: 'Informe o peso bruto' })
    gross_weight?: number

    @IsNotEmpty({ message: 'Informe a altura' })
    height?: number

    @IsNotEmpty({ message: 'Informe a largura' })
    width?: number

    @IsNotEmpty({ message: 'Informe o comprimento' })
    length?: number

    active?: boolean
}
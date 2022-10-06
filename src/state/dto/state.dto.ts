import { IsNotEmpty, IsString, Length } from 'class-validator';

export class StateDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    @IsString({ message: 'UF deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o UF' })
    @Length(1, 2, { message: 'O campo UF deve ter de 1 a 2 caracteres' })
    uf?: string

    @IsNotEmpty({ message: 'Informe o pais' })
    idcountry?: string

    active?: boolean
}
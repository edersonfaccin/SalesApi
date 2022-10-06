import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CityDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    @IsNotEmpty({ message: 'Informe o estado' })
    idstate?: string

    active?: boolean
}
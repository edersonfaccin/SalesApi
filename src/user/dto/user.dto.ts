import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string
    
    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    @IsString({ message: 'Email deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Email' })
    @Length(1, 100, { message: 'O campo Email deve ter de 1 a 100 caracteres' })
    @IsEmail({ message: 'Informe um email valido' })
    email?: string

    @Length(1, 100, { message: 'O campo senha deve ter de 1 a 100 caracteres' })
    @IsString({ message: 'senha deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o CNPJ' })
    password?: string

    adm?: boolean

    active?: boolean
}
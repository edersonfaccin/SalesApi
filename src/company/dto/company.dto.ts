import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CompanyDto {

    @IsString({ message: 'Nome deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Nome' })
    @Length(1, 100, { message: 'O campo Nome deve ter de 1 a 100 caracteres' })
    name?: string

    @Length(1, 50, { message: 'O campo CNPJ deve ter de 1 a 50 caracteres' })
    @IsString({ message: 'CNPJ deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o CNPJ' })
    cnpj?: string

    @Length(1, 50, { message: 'O campo Inscricao estadual deve ter de 1 a 50 caracteres' })
    @IsString({ message: 'Inscricao estadual deve ser do tipo string' })
    state_registration?: string

    @Length(1, 100, { message: 'O campo Endereco deve ter de 1 a 100 caracteres' })
    @IsString({ message: 'Endereço deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o endereco' })
    address?: string

    @Length(1, 100, { message: 'O campo bairro deve ter de 1 a 100 caracteres' })
    @IsString({ message: 'bairro deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o bairro' })
    district?: string

    @Length(1, 100, { message: 'O campo City deve ter de 1 a 20 caracteres' })
    @IsString({ message: 'Endereço deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o city' })
    city?: string

    @Length(1, 2, { message: 'O campo UF deve ter de 1 a 2 caracteres' })
    @IsString({ message: 'Endereço deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o uf' })
    uf?: string

    @Length(1, 20, { message: 'O campo Fone deve ter de 1 a 20 caracteres' })
    @IsString({ message: 'Fone deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Fone' })
    phone?: string;

    @Length(1, 100, { message: 'O campo Site deve ter de 1 a 100 caracteres' })
    @IsString({ message: 'Site deve ser do tipo string' })
    site?: string

    @Length(1, 100, { message: 'O campo Email deve ter de 1 a 100 caracteres' })
    @IsString({ message: 'Email deve ser do tipo string' })
    email?: string

    active?: boolean
}
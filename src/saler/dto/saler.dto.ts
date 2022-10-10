import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { TypePerson } from '../entities/saler.entity';

export class SalerDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o representante' })
    idsaler?: string

    @IsString({ message: 'Corporate name deve ser do tipo string' })
    @IsNotEmpty({ message: 'Informe o Corporate name' })
    @Length(1, 100, { message: 'O campo Corporate name deve ter de 1 a 100 caracteres' })
    corporate_name?: string

    @IsString({ message: 'Fantasy name deve ser do tipo string' })
    @Length(1, 100, { message: 'O campo Fantasy name deve ter de 1 a 100 caracteres' })
    @IsOptional()
    fantasy_name?: string

    @IsNotEmpty({ message: 'Informe a type person' })
    type_person?: TypePerson;

    @IsString({ message: 'registration number deve ser do tipo string' })
    @Length(1, 30, { message: 'O campo registration number deve ter de 1 a 100 caracteres' })
    registration_number?: string

    @IsString({ message: 'state registration deve ser do tipo string' })
    @Length(1, 30, { message: 'O campo state registration deve ter de 1 a 100 caracteres' })
    @IsOptional()
    state_registration?: string

    @IsString({ message: 'address deve ser do tipo string' })
    @Length(1, 100, { message: 'O campo address deve ter de 1 a 100 caracteres' })
    @IsOptional()
    address?: string

    @IsString({ message: 'complement deve ser do tipo string' })
    @Length(1, 100, { message: 'O campo complement deve ter de 1 a 100 caracteres' })
    @IsOptional()
    complement?: string

    @IsString({ message: 'neighborhood deve ser do tipo string' })
    @Length(1, 100, { message: 'O campo neighborhood deve ter de 1 a 100 caracteres' })
    @IsOptional()
    neighborhood?: string

    @IsString({ message: 'zip code deve ser do tipo string' })
    @Length(1, 30, { message: 'O campo zip code deve ter de 1 a 100 caracteres' })
    @IsOptional()
    zip_code?: string

    @IsString({ message: 'cidade deve ser do tipo string' })
    @Length(1, 36, { message: 'O campo cidade deve ter de 1 a 100 caracteres' })
    idcity?: string

    @IsString({ message: 'fone 1 deve ser do tipo string' })
    @Length(1, 30, { message: 'O campo fone 1 deve ter de 1 a 100 caracteres' })
    @IsOptional()
    fone1?: string

    @IsString({ message: 'fone 2 deve ser do tipo string' })
    @Length(1, 30, { message: 'O campo fone 2 deve ter de 1 a 100 caracteres' })
    @IsOptional()
    fone2?: string

    @IsString({ message: 'contact deve ser do tipo string' })
    @Length(1, 30, { message: 'O campo contact deve ter de 1 a 100 caracteres' })
    @IsOptional()
    contact?: string

    @IsString({ message: 'email deve ser do tipo string' })
    @Length(1, 100, { message: 'O campo email deve ter de 1 a 100 caracteres' })
    @IsOptional()
    email?: string

    @IsNumber()
    payment_shipping_days?: number

    @IsArray()
    accounts?: any[]

    @IsArray()
    pix_keys?: any[]

    active?: boolean
}
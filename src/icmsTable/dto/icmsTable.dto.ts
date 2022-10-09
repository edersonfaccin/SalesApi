import { IsNotEmpty } from 'class-validator';

export class IcmsTableDto {

    @IsNotEmpty({ message: 'Informe a companhia' })
    idcompany?: string

    @IsNotEmpty({ message: 'Informe o estado de origem' })
    idstate_origin?: string

    @IsNotEmpty({ message: 'Informe o estado de destino' })
    idstate_destination?: string

    @IsNotEmpty({ message: 'Informe o percentual' })
    percent?: number
}
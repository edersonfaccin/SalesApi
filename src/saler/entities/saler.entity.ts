import { City } from 'src/city/entities/city.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum TypePerson {
    PERSON = 'PERSON',
    ENTITY = 'ENTITY'
}

export enum TypeAccount {
    CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
    SAVING_ACCOUNT = 'SAVING_ACCOUNT'
}

@Entity()
export class Saler {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @Column({ length: 100 })
    corporate_name: string

    @Column({ length: 100, nullable: true })
    fantasy_name: string

    @Column({ type: "enum", enum: TypePerson, default: TypePerson.ENTITY })
    type_person: TypePerson

    @Column({ length: 30, nullable: true })
    registration_number: string

    @Column({ length: 30, nullable: true })
    state_registration: string

    @Column({ length: 100, nullable: true })
    address: string

    @Column({ length: 100, nullable: true })
    complement: string

    @Column({ length: 100, nullable: true })
    neighborhood: string

    @Column({ length: 30, nullable: true })
    zip_code: string

    @ManyToOne(() => City)
    @JoinColumn({ name: 'idcity', referencedColumnName: 'id' })
    idcity: string

    @Column({ length: 30, nullable: true })
    fone1: string

    @Column({ length: 30, nullable: true })
    fone2: string

    @Column({ length: 30, nullable: true })
    contact: string

    @Column({ length: 100, nullable: true })
    email: string

    @Column({ default: 30 })
    payment_shipping_days: number

    @Column({ default: true })
    active: boolean
}
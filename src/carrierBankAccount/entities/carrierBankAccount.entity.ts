import { Bank } from 'src/bank/entities/bank.entity';
import { Carrier } from 'src/carrier/entities/carrier.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum TypeAccount {
    CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
    SAVING_ACCOUNT = 'SAVING_ACCOUNT'
}

@Entity()
export class CarrierBankAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Carrier, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcarrier', referencedColumnName: 'id' })
    idcarrier: string

    @ManyToOne(() => Bank)
    @JoinColumn({ name: 'idbank', referencedColumnName: 'id' })
    idbank: string

    @Column({ length: 20 })
    agency_number: string

    @Column({ length: 20 })
    account_number: string

    @Column({ type: "enum", enum: TypeAccount, default: TypeAccount.CHECKING_ACCOUNT })
    type_account: TypeAccount

    @Column({ default: true })
    active: boolean
}
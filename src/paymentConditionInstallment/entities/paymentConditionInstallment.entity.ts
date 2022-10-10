import { Company } from 'src/company/entities/company.entity';
import { PaymentCondition } from 'src/paymentCondition/entities/paymentCondition.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class PaymentConditionInstallment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => PaymentCondition, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idpayment_condition', referencedColumnName: 'id' })
    idpayment_condition: string

    @Column({ default: 0 })
    percent: number

    @Column({ default: 0 })
    days: number
}

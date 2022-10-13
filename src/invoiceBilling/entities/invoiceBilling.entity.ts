import { Company } from 'src/company/entities/company.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { PaymentMethod } from 'src/paymentMethod/entities/paymentMethod.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

export enum TypeStatusInvoiceBilling {
    OPENED = 'OPENED',
    CANCELED = 'CANCELED',
    PAID = 'PAID'
}

@Entity()
export class InvoiceBilling {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Invoice, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idinvoice', referencedColumnName: 'id' })
    idinvoice: string

    @Column('datetime')
    dueDate: Date

    @Column({ default: 0 })
    value: number

    @ManyToOne(() => PaymentMethod)
    @JoinColumn({ name: 'idpayment_method', referencedColumnName: 'id' })
    idpayment_method: string

    @Column('datetime')
    paymentDate: Date

    @Column('datetime')
    cancellationDate: Date

    @Column({ default: TypeStatusInvoiceBilling.OPENED })
    status: TypeStatusInvoiceBilling
}
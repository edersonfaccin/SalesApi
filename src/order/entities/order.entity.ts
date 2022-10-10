import { Carrier } from 'src/carrier/entities/carrier.entity';
import { Cfop } from 'src/cfop/entities/cfop.entity';
import { Company } from 'src/company/entities/company.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { PaymentCondition } from 'src/paymentCondition/entities/paymentCondition.entity';
import { PaymentMethod } from 'src/paymentMethod/entities/paymentMethod.entity';
import { Saler } from 'src/saler/entities/saler.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum TypeStatusOrder {
    OPENED = 'OPENED',
    CANCELED = 'CANCELED',
    FINISHED = 'FINISHED',
    PARTIAL_FINISHED = 'PARTIAL_FINISHED'
}

export enum TypeTransport {
    CIF = 'CIF',
    FOB = 'FOB'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @Column({ length: 30 })
    buy_order: string

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'idcustomer', referencedColumnName: 'id' })
    idcustomer: string

    @ManyToOne(() => Saler)
    @JoinColumn({ name: 'idsaler', referencedColumnName: 'id' })
    idsaler: string

    @ManyToOne(() => Carrier)
    @JoinColumn({ name: 'idcarrier', referencedColumnName: 'id' })
    idcarrier: string

    @Column({ default: 0 })
    saler_percent: number

    @ManyToOne(() => PaymentMethod)
    @JoinColumn({ name: 'idpayment_method', referencedColumnName: 'id' })
    idpayment_method: string

    @ManyToOne(() => PaymentCondition)
    @JoinColumn({ name: 'idpayment_condition', referencedColumnName: 'id' })
    idpayment_condition: string

    @ManyToOne(() => Cfop)
    @JoinColumn({ name: 'idcfop', referencedColumnName: 'id' })
    idcfop: string

    @Column({ default: 0 })
    amount: number

    @Column({ default: 0 })
    value_products: number

    @Column({ default: 0 })
    value_base_calc: number

    @Column({ default: 0 })
    value_total_order: number

    @Column({ default: 0 })
    value_commission: number

    @Column({ default: 0 })
    value_icms: number

    @Column({ default: 0 })
    value_ipi: number

    @Column({ default: 0 })
    net_weight: number

    @Column({ default: 0 })
    gross_weight: number

    @Column({ default: 0 })
    value_transport: number

    @Column({ default: TypeTransport.CIF })
    transport_type: TypeTransport

    @Column({ length: 500 })
    description: string

    @Column({ default: TypeStatusOrder.OPENED })
    status: TypeStatusOrder
}

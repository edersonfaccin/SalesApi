import { Company } from 'src/company/entities/company.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { State } from 'src/state/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Order, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idorder', referencedColumnName: 'id' })
    idorder: string

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'idproduct', referencedColumnName: 'id' })
    idproduct: string

    @Column({ default: 0 })
    amount_ordered: number

    @Column({ default: 0 })
    amount_invoiced: number

    @Column({ default: 0 })
    amount_reserved: number

    @Column({ default: 0 })
    amount_balance: number

    @Column({ default: 0 })
    amount_served: number

    @Column({ default: 0 })
    value: number

    @Column({ default: 0 })
    perc_commission: number

    @Column({ default: 0 })
    value_commission: number

    @Column({ default: 0 })
    perc_ipi: number

    @Column({ default: 0 })
    perc_icms: number

    @Column({ default: 0 })
    value_ipi: number

    @Column({ default: 0 })
    value_icms: number

    @Column({ default: 0 })
    value_without_ipi: number

    @Column({ default: 0 })
    value_with_ipi: number
}
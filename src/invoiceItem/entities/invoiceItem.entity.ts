import { Company } from 'src/company/entities/company.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Invoice, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idinvoice', referencedColumnName: 'id' })
    idinvoice: string

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'idproduct', referencedColumnName: 'id' })
    idproduct: string

    @Column({ default: 0 })
    amount: number

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
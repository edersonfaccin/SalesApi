import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class SupplierPixKey {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Supplier, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idsupplier', referencedColumnName: 'id' })
    idsupplier: string

    @Column({ length: 100 })
    key: string

    @Column({ default: true })
    active: boolean
}
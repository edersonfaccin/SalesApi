import { Customer } from 'src/customer/entities/customer.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CustomerPixKey {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Customer, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcustomer', referencedColumnName: 'id' })
    idcustomer: string

    @Column({ length: 100 })
    key: string

    @Column({ default: true })
    active: boolean
}
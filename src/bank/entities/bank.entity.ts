import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Bank {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 15 })
    bank_number: string

    @ManyToOne(() => Company, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @Column({ length: 100 })
    name: string

    @Column({ default: true })
    active: boolean
}

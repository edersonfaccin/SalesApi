import { Saler } from 'src/saler/entities/saler.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class SalerPixKey {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Saler, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idsaler', referencedColumnName: 'id' })
    idsaler: string

    @Column({ length: 100 })
    key: string

    @Column({ default: true })
    active: boolean
}
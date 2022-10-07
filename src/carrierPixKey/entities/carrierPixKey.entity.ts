import { Carrier } from 'src/carrier/entities/carrier.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CarrierPixKey {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Carrier, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcarrier', referencedColumnName: 'id' })
    idcarrier: string

    @Column({ length: 100 })
    key: string

    @Column({ default: true })
    active: boolean
}
import { Company } from 'src/company/entities/company.entity';
import { State } from 'src/state/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class IcmsTable {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => State, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idstate_origin', referencedColumnName: 'id' })
    idstate_origin: string

    @ManyToOne(() => State, { cascade: true,  onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idstate_destination', referencedColumnName: 'id' })
    idstate_destination: string

    @Column({ default: 0 })
    percent: number
}
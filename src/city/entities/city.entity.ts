import { Company } from 'src/company/entities/company.entity';
import { State } from 'src/state/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @Column({ length: 100 })
    name: string

    @ManyToOne(() => State)
    @JoinColumn({ name: 'idstate', referencedColumnName: 'id' })
    idstate: string

    @Column({ default: true })
    active: boolean
}

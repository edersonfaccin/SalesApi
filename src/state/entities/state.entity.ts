import { Company } from 'src/company/entities/company.entity';
import { Country } from 'src/country/entities/country.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class State {
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

    @Column({ length: 2 })
    uf: string

    @ManyToOne(() => Country, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcountry', referencedColumnName: 'id' })
    idcountry: string

    @Column({ default: true })
    active: boolean
}

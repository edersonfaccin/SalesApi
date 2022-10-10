import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @Column({ length: 255 })
    hash: string

    @Column({ length: 100 })
    email: string
}
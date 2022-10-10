import { Category } from 'src/category/entities/category.entity';
import { Color } from 'src/color/entities/color.entity';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product {
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

    @Column({ length: 500 })
    description: string

    @Column({ length: 20 })
    reference: string

    @ManyToOne(() => Color)
    @JoinColumn({ name: 'idcolor', referencedColumnName: 'id' })
    idcolor: string

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'idcategory', referencedColumnName: 'id' })
    idcategory: string

    @Column({ default: 0 })
    net_weight: number

    @Column({ default: 0 })
    gross_weight: number

    @Column({ default: 0 })
    height: number

    @Column({ default: 0 })
    width: number

    @Column({ default: 0 })
    length: number

    @Column({ default: true })
    active: boolean
}

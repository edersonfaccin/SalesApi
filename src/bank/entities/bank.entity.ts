import { Field, ObjectType } from '@nestjs/graphql';
import { Company } from 'src/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Bank {

    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field(() => String, { description: 'Bank number' })
    @Column({ length: 15 })
    bank_number: string

    @Field(() => String, { description: 'Company identifier' })
    @ManyToOne(() => Company, {
        cascade: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: String

    @Field(() => String, { description: 'Name' })
    @Column({ length: 100 })
    name: string

    @Field(() => Boolean)
    @Column({ default: true })
    active: boolean
}

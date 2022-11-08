import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Company {

    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field(() => String, { description: 'Name' })
    @Column({ length: 100 })
    name: string

    @Field(() => String, { description: 'CNPJ' })
    @Column({ length: 50 })
    cnpj: string

    @Field(() => String, { description: 'State registration' })
    @Column({ length: 50 })
    state_registration: string

    @Field(() => String, { description: 'Address' })
    @Column({ length: 100 })
    address: string

    @Field(() => String, { description: 'District' })
    @Column({ length: 100 })
    district: string

    @Field(() => String, { description: 'City' })
    @Column({ length: 100 })
    city: string

    @Field(() => String, { description: 'UF' })
    @Column({ length: 2 })
    uf: string

    @Field(() => String, { description: 'Phone' })
    @Column({ length: 20 })
    phone: string

    @Field(() => String, { description: 'Site' })
    @Column({ length: 100 })
    site: string

    @Field(() => String, { description: 'Email' })
    @Column({ length: 100 })
    email: string

    @Field(() => Boolean, { description: 'Active' })
    @Column({ default: true })
    active: boolean
}

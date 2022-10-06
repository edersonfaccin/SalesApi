import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 100 })
    name: string

    @Column({ length: 50 })
    cnpj: string

    @Column({ length: 50 })
    state_registration: string

    @Column({ length: 100 })
    address: string

    @Column({ length: 100 })
    district: string

    @Column({ length: 100 })
    city: string

    @Column({ length: 2 })
    uf: string

    @Column({ length: 20 })
    phone: string

    @Column({ length: 100 })
    site: string

    @Column({ length: 100 })
    email: string

    @Column({ default: true })
    active: boolean
}

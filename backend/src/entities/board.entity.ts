import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity";
import { Group } from "./column.entity";

@Entity()
export default class Board {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    name: string

    @Column({ default: '' })
    description: string

    @Column({ default: false })
    archived: boolean

    @Column({ default: 0 })
    cover_type: number

    @Column({ default: '' })
    cover_value: string


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => User, (user) => user.boards)
    @JoinColumn({ name: 'owner_id' })
    owner: User

    @OneToMany(() => Group, (group) => group.board)
    groups: Group[]
}



import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Group } from "./column.entity"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({
        nullable: false
    })
    rank: string

    @Column({ default: "" })
    description: string

    @Column({ default: 0 })
    priority: number

    @Column({ default: 0 })
    estimate: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => Group, (group) => group.tasks)
    @JoinColumn({ name: 'group_id' })
    group: Group
}
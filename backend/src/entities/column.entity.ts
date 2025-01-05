import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({
        nullable: false
    })
    rank: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToMany(() => Task, (task) => task.group, { cascade: true })
    tasks: Task[]
}
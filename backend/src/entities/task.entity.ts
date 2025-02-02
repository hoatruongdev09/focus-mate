import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Group } from "./column.entity"
import BoardActivities from "./board-action.entity"
import UserComment from "./user-comment.entity"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    group_id: number

    @Column()
    title: string

    @Column({
        nullable: false
    })
    rank: string

    @Column({ default: 0 })
    cover_type: number

    @Column({ default: '' })
    cover_value: string

    @Column({ default: 0 })
    layout_type: number

    @Column({ default: "", nullable: true })
    description: string

    @Column({ default: 0 })
    priority: number

    @Column({ default: 0 })
    estimate: number

    @Column({ default: false })
    archived: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => Group, (group) => group.tasks)
    @JoinColumn({ name: 'group_id' })
    group: Group

    @OneToMany(() => BoardActivities, action => action.task, { cascade: true })
    activities: BoardActivities[]

    @OneToMany(() => UserComment, comment => comment.task, { cascade: true })
    comments: UserComment[]
}
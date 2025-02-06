import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { List } from "./list.entity"
import BoardActivity from "./board-activity.entity"
import UserComment from "./user-comment.entity"

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    list_id: number

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

    @ManyToOne(() => List, (list) => list.cards)
    @JoinColumn({ name: 'list_id' })
    list: List

    @OneToMany(() => BoardActivity, action => action.card, { cascade: true })
    activities: BoardActivity[]

    @OneToMany(() => UserComment, comment => comment.card, { cascade: true })
    comments: UserComment[]
}
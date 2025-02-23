import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import BoardActivity from "./board-activity.entity"
import UserComment from "./user-comment.entity"
import { removeDashes } from "../utils/uuid-transformer"
import List from "./list.entity"

@Entity()
export default class Card {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    list_id: string

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
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity";
import { Group } from "./column.entity";
import BoardActivity from "./board-activity.entity";
import UserComment from "./user-comment.entity";
import BoardTheme from "./board-theme.entity";

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

    @Column({ default: 1 })
    theme_id: number

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

    @OneToMany(() => BoardActivity, (action) => action.board, { cascade: true })
    activities: BoardActivity[]

    @OneToMany(() => UserComment, comment => comment.board, { cascade: true })
    comments: UserComment[]

    @ManyToOne(() => BoardTheme, (bg) => bg.boards)
    @JoinColumn({ name: "theme_id" })
    theme: BoardTheme
}



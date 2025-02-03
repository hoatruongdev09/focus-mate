import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Board from "./board.entity";

@Entity({ name: "board_theme" })
export default class BoardTheme {
    @PrimaryColumn()
    id: number

    @Column()
    bg_type: number

    @Column()
    bg_value: string

    @Column()
    fg_value: string

    @OneToMany(() => Board, board => board.theme)
    boards: Board[]
}
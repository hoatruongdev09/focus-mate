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

    constructor(id: number, bg_type: number, bg_value: string, fg_value: string) {
        this.id = id
        this.bg_type = bg_type
        this.bg_value = bg_value
        this.fg_value = fg_value
    }
}
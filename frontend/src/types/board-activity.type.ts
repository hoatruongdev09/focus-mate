import { Card } from "./board.type";

export type BoardActivity = {
    id: number
    board_id: number
    owner_id: number
    card_id: number | null
    list_id: number
    action: number
    created_at: string
    card?: Card
    list_name: string | null
    board: ActivityBoard
    actor: ActivityActor
}

type ActivityBoard = {
    name: string
    description: string
}

type ActivityActor = {
    first_name: string
    last_name: string
}
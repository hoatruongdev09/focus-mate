import { UserData } from "./auth-type"

export enum CoverType {
    None = 0,
    SolidColor = 1,
    Gradient = 2
}

export enum CardLayoutType {
    Normal = 0,
    Large = 1
}

export type BoardTheme = {
    id: number
    bg_type: number
    bg_value: string
    fg_value: string
}

export type Board = {
    id: number
    name: string
    description: string
    archived: boolean
    theme_id: number | null
    theme: BoardTheme | null
    owner: UserData
}

export type CreateBoardData = {
    workspace_id: number
    title: string,
    description: string
}

export type UpdateBoardData = {
    title: string
    description: string
}

export type AddListData = {
    board_id: number
    name: string
    description: string
}

export type AddCardData = {
    title: string
    description: string
    priority: number
    estimate: number
    list_id: number
    board_id: number
}

export type List = {
    id: number
    name: string
    description: string
    rank: string
    archived: boolean
    board_id: number
}

export type Card = {
    id: number
    title: string
    rank: string
    description: string
    priority: number
    estimate: number
    list_id: number
    archived: boolean
    cover_type: CoverType
    cover_value: string
    layout_type: CardLayoutType
}

export type UpdateCardData = {
    id: number
    title: string
    description: string | null
    cover_type: CoverType
    cover_value: string
    layout_type: number
    priority: number
    estimate: number
    list_id: number
    board_id: number

    front_id?: number | null
    behind_id?: number | null
}

export type UpdateListData = {
    id: number
    board_id: number
    name: string
    description: string

    front_id: number | null
    behind_id: number | null
}

export type CardComment = {
    id: number
    user_id: number
    board_id: number
    list_id: number
    card_id: number
    content: string
    created_at: Date
    updated_at: Date
    user: {
        id: number
        first_name: number
        last_name: number
    }
}


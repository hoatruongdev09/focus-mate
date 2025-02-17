import { UserData } from "./auth.type"

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
    id: string
    name: string
    description: string
    archived: boolean
    theme_id: number | null
    theme: BoardTheme | null
    owner: UserData
}

export type CreateBoardData = {
    workspace_id: string
    title: string,
    description: string
}

export type UpdateBoardData = {
    title: string
    description: string
}

export type AddListData = {
    board_id: string
    name: string
    description: string
}

export type AddCardData = {
    title: string
    description: string
    priority: number
    estimate: number
    list_id: string
    board_id: string
}

export type List = {
    id: string
    name: string
    description: string
    rank: string
    archived: boolean
    board_id: string
}

export type Card = {
    id: string
    title: string
    rank: string
    description: string
    priority: number
    estimate: number
    list_id: string
    archived: boolean
    cover_type: CoverType
    cover_value: string
    layout_type: CardLayoutType
}

export type UpdateCardData = {
    id: string
    title: string
    description: string | null
    cover_type: CoverType
    cover_value: string
    layout_type: number
    priority: number
    estimate: number
    list_id: string
    board_id: string

    front_id?: string | null
    behind_id?: string | null
}

export type UpdateListData = {
    id: string
    board_id: string
    name: string
    description: string

    front_id: string | null
    behind_id: string | null
}

export type CardComment = {
    id: number
    user_id: string
    board_id: string
    list_id: string
    card_id: string
    content: string
    created_at: Date
    updated_at: Date
    customer: {
        id: string
        first_name: number
        last_name: number
    }
}


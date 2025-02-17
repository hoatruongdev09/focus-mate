export default class UpdateCardDto {
    title: string
    description: string
    priority: number
    estimate: number
    list_id: string
    cover_type: number
    cover_value: string
    layout_type: number

    front_id: string | null
    behind_id: string | null
}
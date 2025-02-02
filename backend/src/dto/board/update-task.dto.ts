export default class UpdateTaskDto {
    title: string
    description: string
    priority: number
    estimate: number
    group_id: number
    cover_type: number
    cover_value: string
    layout_type: number

    front_id: number | null
    behind_id: number | null
}
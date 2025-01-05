export default class UpdateTaskDto {
    title: string
    description: string
    priority: number
    estimate: number
    group_id: number

    front_id: number | null
    behind_id: number | null
}
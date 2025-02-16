export type ServerResponse<T> = {
    status: boolean
    message: string
    error: any
    data: T
    responseCode: number
}
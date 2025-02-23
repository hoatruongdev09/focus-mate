import { Request, Response } from "express";

export type ResponseData = {
    status?: boolean | null,
    error?: any | null,
    data?: any | null,
    message?: any | null,
    responseCode?: number | null
}

const resultResponse = (req: Request, res: Response) => {
    const { error, data, message, responseCode, status } = res.locals
    const { statusCode } = res
    console.log(`${req.path} ${message} ${responseCode} ${statusCode}`)
    res.status(statusCode ?? (error ? 500 : 200)).json({
        status: status ?? error != null,
        error: error ?? null,
        data: data ?? null,
        message: message ?? (error ? "Internal server error" : "ok"),
        responseCode: responseCode ?? (statusCode ?? 0)
    })
}
export default resultResponse
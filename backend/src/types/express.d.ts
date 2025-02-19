import "express"
import Workspace from "../entities/workspace.entity"
import Board from "../entities/board.entity"

declare module "express" {
    interface Request {
        customer_id?: string | undefined
        customer_role?: number | undefined
        isError?: boolean | undefined
        workspace?: Workspace | undefined
        board?: Board | undefined
    }

    interface Response {
        locals: {

            status?: boolean | null;
            error?: any | null;
            data?: any | null;
            message?: any | null;
            responseCode?: number | null;
        }
    }
}
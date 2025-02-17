import "express"

declare module "express" {
    interface Request {
        customer_id?: string | undefined
        customer_role?: number | undefined
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
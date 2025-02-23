import { Request, Response, NextFunction } from "express"


const requestLog = (req: Request, res: Response, next: NextFunction) => {
    console.log(`start ${req.path}`)
    next()
}

export default requestLog
import { Request, Response } from "express";
import { customerService } from "../services/user.service";

export const getCustomerInfo = async (req: Request, res: Response) => {
    try {

        const { customer_id } = req
        const customerData = await customerService.getData(customer_id)
        res.status(200).json(customerData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }

}
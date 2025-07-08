import { container } from "tsyringe";
import { Request, Response } from 'express'
import { IAdminService } from "../types/user.types";

const AdminService = container.resolve<IAdminService>('IAdminService')

export const createMenu = async (req: Request, res: Response) => {
    const menuInput = req.body
    const menu = AdminService.createMenu(menuInput)

    res.status(200).json({
        status: 'success',
        data: {
            menu
        }
    });
}
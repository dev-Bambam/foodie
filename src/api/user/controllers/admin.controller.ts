import { container } from "tsyringe";
import { Request, Response } from 'express'
import { IAdminService } from "../types/user.types";

const AdminService = container.resolve<IAdminService>('IAdminService')


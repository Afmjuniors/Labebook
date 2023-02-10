import express, { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserControler } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { BaseError } from "../error/BaseError"

export const userRouter = express.Router()
const userController = new UserControler(
    new UserBusiness(
        new UserDatabase()
    )
)

userRouter.get('/', userController.getAllUsers)
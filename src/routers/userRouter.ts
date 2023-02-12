import express, { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserControler } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { UserDTO } from "../dto/UserDTO"
import { BaseError } from "../error/BaseError"

export const userRouter = express.Router()

const userDTO = new UserDTO()

const userController = new UserControler(
    userDTO,
    new UserBusiness(
        userDTO,
        new UserDatabase()
    )
)

userRouter.get('/', userController.getAllUsers)
userRouter.post('/register', userController.createUser)
userRouter.post('/login', userController.loginUser)
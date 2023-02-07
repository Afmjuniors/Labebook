import express from 'express'
import { UserController } from '../controller/UserController'

export const userRouter = express.Router()
const userController = new UserController()

userRouter.get("/", userController.viewAllUsers)

userRouter.post("/register", userController.signUp)
userRouter.post("/login", userController.login)

userRouter.post("/:id/reactions", userController.reactionPost)

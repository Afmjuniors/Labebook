import express from 'express'
import { ReactionPostController } from '../controller/ReactionPostController'
import { UserController } from '../controller/UserController'

export const userRouter = express.Router()
const userController = new UserController()
const reactionPostController = new ReactionPostController()

userRouter.get("/", userController.viewAllUsers)

userRouter.post("/register", userController.signUp)
userRouter.post("/login", userController.login)

userRouter.post("/:id/reactions", reactionPostController.reactionPost)


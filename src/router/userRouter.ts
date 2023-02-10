import express from 'express'
import { ReactionPostBusiness } from '../business/ReactionPostBusiness'
import { UserBusiness } from '../business/UserBusiness'
import { ReactionPostController } from '../controller/ReactionPostController'
import { UserController } from '../controller/UserController'
import { PostDatabase } from '../database/PostsDatabase'
import { ReactionPostDatabase } from '../database/ReactionPostDatabase'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(),
    new ReactionPostBusiness(
        new PostDatabase(),
        new ReactionPostDatabase()
    )
)
// const reactionPostController = new ReactionPostController(
//     new ReactionPostBusiness(
//         new PostDatabase(),
//         new ReactionPostDatabase()
// )

userRouter.get("/", userController.viewAllUsers)

userRouter.post("/register", userController.signUp)
userRouter.post("/login", userController.login)

// userRouter.post("/:id/reactions", reactionPostController.reactionPost)


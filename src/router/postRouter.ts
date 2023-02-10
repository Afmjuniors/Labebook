import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostDatabase } from '../database/PostsDatabase'
import { UserDatabase } from '../database/UsersDatabase'
import { PostDTO } from '../dto/PostDTO'


export const postRouter = express.Router()
const postController = new PostController(
    new PostDTO(),
    new PostBusiness(
        new PostDTO(),
        new PostDatabase(),
        new UserDatabase()
    )
)


postRouter.post("/:id", postController.createNewPost)
postRouter.get("/:id", postController.getPosts )
postRouter.patch("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)


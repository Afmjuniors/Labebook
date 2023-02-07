import express from 'express'
import { PostController } from '../controller/PostController'


export const postRouter = express.Router()
const postController = new PostController()


postRouter.post("/:id", postController.createNewPost)
postRouter.get("/:id", postController.getPosts )
postRouter.patch("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)


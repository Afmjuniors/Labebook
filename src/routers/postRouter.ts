import express from "express"
import { PostBusiness } from "../Business/PostBusiness"
import { UserBusiness } from "../Business/UserBusiness"
import { PostController } from "../controller/PostController"
import { UserControler } from "../controller/UserController"
import { PostDatabase } from "../database/PostDatabase"
import { ReactionDatabase } from "../database/ReactionDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { PostsDTO } from "../dto/PostDTO"
import { UserDTO } from "../dto/UserDTO"
import { BaseError } from "../error/BaseError"
import { IdGenerator } from "../services/IdGenerator"

export const postRouter = express.Router()

const postsDTO = new PostsDTO()

const postControllet = new PostController( 
    postsDTO,
    new PostBusiness(
        postsDTO,
        new PostDatabase(),
        new UserDatabase(),
        new ReactionDatabase(),
        new IdGenerator
    )
)

postRouter.get('/', postControllet.getPosts)
postRouter.post('/', postControllet.createPost)

postRouter.patch('/:id/reaction', postControllet.reactionPost) //reaction

postRouter.patch('/:id', postControllet.editPost)

postRouter.post('/:id', postControllet.editPost)


postRouter.delete('/:id', postControllet.deletePost)

import { Request, Response } from "express"
import { nowDate } from "../constants/patterns"
import { PostDatabase } from "../database/PostsDatabase"
import { UserDatabase } from "../database/UsersDatabase"
import { likeDislikePost } from "../models/LikeDislikePost"
import { Post } from "../models/Post"
import { CreatorIDPost, ReactionDB, PostDB, PostDTO, ReactionEditedDB, PostToEdit, UserDB } from "../types"

export class PostController {

    public async getPosts(req: Request, res: Response) {
        try {
            const id = req.params.id
            const postDatabase = new PostDatabase()
            const userDatabase = new UserDatabase()


            const postsDB = await postDatabase.findPosts(id)
            const user: UserDB | undefined = await userDatabase.findeUserById(id)
            if (user === undefined) {
                res.status(404)
                throw new Error("Usuario nao encontrado");
            }
            const userPost: CreatorIDPost = {
                id: user.id,
                name: user.name
            }
            const arrayPostsDTO: PostDTO[] = postsDB.map((post) => {
                return {
                    id: post.id,
                    content: post.content,
                    likes: post.likes,
                    dislikes: post.dislikes,
                    createdAt: post.created_at,
                    updatedAt: post.updated_at,
                    creator: userPost
                }
            })

            res.status(200).send(arrayPostsDTO)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async createNewPost(req: Request, res: Response) {
        try {
            const idUser = req.params.id as string
            const content = req.body.content as string
            const idPost = req.body.id as string

            const postDatabase = new PostDatabase()
       

            if (typeof content !== "string") {
                res.status(400)
                throw new Error("Content deve ser uma string");

            }
            if(content.length<5){
                res.status(400)
                throw new Error("Content deve ter ao menos 5 caracteres");                
            }
            
            const newPost = new Post(
                idPost,
                idUser,
                content,
                0,
                0,
                nowDate,
                nowDate
            )
            const newPostDB: PostDB = {
                id: newPost.getId(),
                creator_id: newPost.getCreatorId(),
                content: newPost.getContent(),
                likes: newPost.getLikes(),
                dislikes: newPost.getDislikes(),
                created_at: newPost.getCreatedAt(),
                updated_at: newPost.getUpdatedAt()
            }

            await postDatabase.createNewPost(newPostDB)
            res.status(201).send("Post enviado com sucesso")


        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async editPost(req: Request, res: Response) {
        try {
            const idPost = req.params.id
            const content = req.body.content
            const postDatabase = new PostDatabase()

            const result = await postDatabase.findPostById(idPost)
            if (!result) {
                throw new Error("Post nao encontrado");

            }
            const postToEdit = new Post(
                idPost,
                result.creator_id,
                result.content,
                result.likes,
                result.dislikes,
                result.created_at,
                result.updated_at
            )
            postToEdit.setContent(content)
            postToEdit.setUpdatedAt(nowDate)
            const postEditedDB: PostToEdit = {
                content: postToEdit.getContent(),
                updated_at: nowDate

            }
            await postDatabase.editPost(postEditedDB, idPost)
            res.status(200).send("Post atualizado com sucesso")

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async deletePost(req: Request, res: Response) {
        try {
            const idToDelete = req.params.id
            const postDatabase = new PostDatabase()

            const result = await postDatabase.findPostById(idToDelete)
            if (!result) {
                throw new Error("Post nao encontrado");

            }
            await postDatabase.deletePost(idToDelete)
            res.status(200).send("Post deletado com sucesso")

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async likeDislikePost(req: Request, res: Response) {
        try {
            const idUser = req.params.id
            const idPost = req.body.idPost as string
            const like = req.body.like as boolean

            const postDatabase = new PostDatabase()

            if(typeof like!=="boolean"){
                res.status(400)
                throw new Error("Like deve ser um booleano");
                
            }
            const result = await postDatabase.findPostById(idPost)
            if (!result) {
                res.status(404)
                throw new Error("Post nao encontrado");

            }
            const postToReact = new Post(
                idPost,
                result.creator_id,
                result.content,
                result.likes,
                result.dislikes,
                result.created_at,
                result.updated_at
            )

            const newPostReaction = new likeDislikePost(
                idUser,
                idPost,
                like
            )
            if (typeof like !== "boolean") {
                throw new Error("Tem que ser booleano");
            }
            newPostReaction.setLike(like)
            let message: string = ""

            const postReaction: ReactionDB | undefined = await postDatabase.findReactionOfUser(newPostReaction)

            if (postReaction) {
                if (postReaction.like) {
                    if (!like) {
                        const dislikes = postToReact.getDislikes()
                        const likes = postToReact.getLikes()
                        postToReact.setLikes(likes - 1)
                        postToReact.setDislikes(dislikes + 1)
                        message = "Thumbs down no post"

                    }
                } else {
                    if (like) {
                        const dislikes = postToReact.getDislikes()
                        const likes = postToReact.getLikes()
                        postToReact.setLikes(likes + 1)
                        postToReact.setDislikes(dislikes - 1)
                        message = "Thumbs down no post"

                    }
                }
            } else {
                if (like) {
                    const likes = postToReact.getLikes()
                    postToReact.setLikes(likes + 1)
                    message = "Joinha no post"

                } else {
                    const dislikes = postToReact.getDislikes()
                    postToReact.setDislikes(dislikes + 1)
                    message = "Thumbs down no post"
                }
            }
            const newReactionDB: ReactionDB = {
                user_id: newPostReaction.getUserId(),
                post_id: newPostReaction.getPostId(),
                like: newPostReaction.getLike()
            }
            const postEditReact: ReactionEditedDB = {
                likes: postToReact.getLikes(),
                dislikes: postToReact.getDislikes()
            }
            if (postReaction) {
                await postDatabase.editReaction(newReactionDB)
            } else {
                await postDatabase.newReaction(newReactionDB)
            }
            await postDatabase.addRemoveReaction(postEditReact, idPost)

            res.status(200).send({ message })

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

}

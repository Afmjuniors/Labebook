import { Request, Response } from "express"
import { LikesDislikesDatabase } from "../database/LikesDislikesDatabase"
import { PostDatabase } from "../database/PostsDatabase"
import { UserDatabase } from "../database/UsersDatabase"
import { CreatorIDPost, PostDTO, UserDB } from "../types"

export class PostController{
    public async getPosts(req: Request, res: Response) {
        try {
            const id = req.params.id
            const postDatabase = new PostDatabase()
            const userDatabase = new UserDatabase()
        

            const postsDB = await postDatabase.findPosts(id)
            const user : UserDB | undefined= await userDatabase.findeUserById(id)
           if(user===undefined){
            throw new Error("nao encontrado");            
           }
            const userPost : CreatorIDPost = {
                id:user.id,
                name:user.name
            }

            const arrayPostsDTO:PostDTO[] =
            postsDB.map( (post)=>{
             return {
                    id: post.id,
                    content: post.content,
                    likes: post.likes,
                    dislikes:post.dislikes,
                    createdAt: post.created_at,
                    updatedAt: post.updated_at,
                    creator: userPost    
                }

            })

            res.send(arrayPostsDTO)
           

     

            
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

    public async getPostById(req:Request, res:Response){
        try {
            
        } catch (error) {
            
        }
    }

}
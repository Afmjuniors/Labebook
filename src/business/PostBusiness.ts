import { nowDate } from "../constants/patterns"
import { PostDatabase } from "../database/PostsDatabase"
import { UserDatabase } from "../database/UsersDatabase"
import { BadRequestError } from "../error/BadRequestError"
import { NotFoundError } from "../error/NoTFoundError"
import { Post } from "../models/Post"
import { CreatorIDPost, PostDB, PostDTO, PostToEdit, UserDB } from "../types"

export class PostBusiness{
    public getPosts =async (id:string)  : Promise<{result:PostDTO[]}> => {
        const postDatabase = new PostDatabase()
        const userDatabase = new UserDatabase()


        const postsDB = await postDatabase.findPosts(id)
        const user: UserDB | undefined = await userDatabase.findeUserById(id)
        if (user === undefined) {
            // res.status(404)
            throw new NotFoundError("Usuario nao encontrado");
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

        const output = {
           result: arrayPostsDTO
        }
        return output
    }

    public createNewPost =async (input:any) :Promise<{message:string}>=> {
        const {idUser,content,idPost} = input

        const postDatabase = new PostDatabase()
       

        if (typeof content !== "string") {
            // res.status(400)
            throw new BadRequestError("Content deve ser uma string");

        }
        if(content.length<5){
            // res.status(400)
            throw new BadRequestError("Content deve ter ao menos 5 caracteres");                
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

        const output = {
            message: "Post criado com sucesso"
        }
        return output
    }
    public editPost =async (input:{idPost:string,content:string}): Promise<{message:string}> => {

        const {idPost,content} = input
        
        const postDatabase = new PostDatabase()

        const result = await postDatabase.findPostById(idPost)
        if (!result) {
            throw new BadRequestError("Post nao encontrado");

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

        const output = {
            message:"Post atualizado com sucesso"
        }
        return output
    }
    public deletePost =async (idToDelete:string):Promise<{message:string}> => {

        const postDatabase = new PostDatabase()

        const result = await postDatabase.findPostById(idToDelete)
        if (!result) {
            throw new BadRequestError("Post nao encontrado");

        }
        await postDatabase.deletePost(idToDelete)
        const output = {
            message:"Post deletado com sucesso"
        }
        return output
    }
}
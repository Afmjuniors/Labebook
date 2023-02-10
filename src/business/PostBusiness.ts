import { nowDate } from "../constants/patterns"
import { PostDatabase } from "../database/PostsDatabase"
import { UserDatabase } from "../database/UsersDatabase"
import { PostOutputDTO, GetPostOutputDTO, PostDTO,  EditPostInputDTO } from "../dto/PostDTO"
import { BadRequestError } from "../error/BadRequestError"
import { NotFoundError } from "../error/NoTFoundError"
import { Post } from "../models/Post"
import { CreatorIDPost, PostDB,  PostToEdit, UserDB } from "../types"

export class PostBusiness{
    constructor(
        private postDTO:PostDTO,
        private postDatabase:PostDatabase,
        private userDatabase:UserDatabase
    ){}
    public getPosts =async (id:string)  : Promise<{result:GetPostOutputDTO[]}> => {
        
        const postsDB = await this.postDatabase.findPosts(id)
        const user: UserDB | undefined = await this.userDatabase.findeUserById(id)
        if (user === undefined) {
            throw new NotFoundError("Usuario nao encontrado");
        }
        const userPost: CreatorIDPost = {
            id: user.id,
            name: user.name
        }
        const arrayPostsDTO: GetPostOutputDTO[] = postsDB.map((post) => {
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

    public createNewPost =async (input:any) :Promise<PostOutputDTO>=> {
        const {idUser,content,idPost} = input

        if(content.length<5){
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

        await this.postDatabase.createNewPost(newPostDB)

        const output = this.postDTO.CreatePostOutputDTO(newPost)
  
        return output
    }
    public editPost =async (input:EditPostInputDTO): Promise<PostOutputDTO> => {

        const {idPost,content} = input
        
        

        const result = await this.postDatabase.findPostById(idPost)
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
        await this.postDatabase.editPost(postEditedDB, idPost)

        

        const output = this.postDTO.EditPostOutputDTO(postToEdit)

        return output
    }
    public deletePost =async (idToDelete:string):Promise<{message:string}> => {

        

        const result = await this.postDatabase.findPostById(idToDelete)
        if (!result) {
            throw new BadRequestError("Post nao encontrado");

        }
        await this.postDatabase.deletePost(idToDelete)
        const output = {
            message:"Post deletado com sucesso"
        }
        return output
    }
}
import { nowDate } from "../constants/patterns";
import { PostDatabase } from "../database/PostDatabase";
import { ReactionDatabase } from "../database/ReactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { PostsOutputDTO, PostsDTO, CreatePostOutputDTO } from "../dto/PostDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { Post } from "../models/Post";
import { PostDB, PostEditDB, UserDB } from "../types";

export class PostBusiness{
    constructor(
        private postDTO: PostsDTO,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private reactionDatabase: ReactionDatabase,
    ){}

    public getPosts = async (input:string | undefined):Promise<PostsOutputDTO[]>=>{
        let postsDB
        if(!input){
           const posts:PostDB[] = await this.postDatabase.getAllPosts()
        postsDB=posts
        }else{
            const posts:PostDB[]   = await this.postDatabase.getPostByUserId(input)
            postsDB=posts
        }
        const users = await this.userDatabase.getAllUsers()
        const posts = postsDB.map((post)=>{           
            const userFind = users.find((user)=>user.id===post.creator_id)
            if(!userFind){
                throw new Error("Usuario não encontrado");            
            }
            const user = {
                id:userFind.id,
                name:userFind.name
            }
            const postInst = new Post(
                post.id,
                post.content,
                post.likes,
                post.dislikes,
                post.created_at,
                post.updated_at,
                user               
            )
            return postInst                     
            
        })
        const output = this.postDTO.GetPostOutputDTO(posts)

        return output
        
    }

    public createPost =async (content:string, user:{id:string,name:string}): Promise<CreatePostOutputDTO> => {
        
        const post = new Post(
            nowDate,
            content,
            0,
            0,
            nowDate,
            nowDate,
            user            
        )
        const postDB = post.toPostDatabase()
        await this.postDatabase.insertPost(postDB)

        return this.postDTO.CreatePostOutputDTO(post)
    }

    public editPost = async (input:{content:string,id:string}) : Promise<CreatePostOutputDTO>=>{
        
        const post = await this.postDatabase.getPostById(input.id)
        if(!post){
            throw new NotFoundError("Post não encontrado")
        }
        const user = await this.userDatabase.getUserById(post.creator_id)
        if(!user){
            throw new NotFoundError("Erro ao procurar Id do criador do post")
        }
        const postEdited = new Post (
            post.id,
            post.content,
            post.likes,
            post.dislikes,
            post.created_at,
            post.updated_at,
            user)
        
        postEdited.setContent(input.content)
        postEdited.setUpdatedAt(nowDate)
        const toEdit: PostEditDB ={
            content:postEdited.getContent(),
            updated_at:postEdited.getUpdatedAt()
        }
        
        await this.postDatabase.editPostbyId(postEdited.getId(),toEdit)

        const output = this.postDTO.CreatePostOutputDTO(postEdited)
        return output


    }

    public deletePost = async (id:string) => {
        
        await this.postDatabase.deletePostById(id)
        return{
            message:"Post deletado com sucesso"
        }
    }
    public reactionPost =async (like:boolean) => {
        {
            
        }
    }
}
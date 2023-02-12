import { BadRequestError } from "../error/BadRequestError"
import { Post } from "../models/Post"

export interface PostsOutputDTO{
    id:string,
    content:string,
    likes:number,
    dislikes:number,
    createdAt:string,
    updatedAt:string,
    creator:{
        id:string,
        name:string
    }

}
export interface CreatePostOutputDTO{
    message:string,
    post:PostsOutputDTO
}
export interface PostReactionOutputDTO{
    message:string
}




export class PostsDTO{

    public GetPostOutputDTO = (posts:Post[]): PostsOutputDTO[] =>{
        const dto:PostsOutputDTO[] = posts.map((post)=>post.toPostOutput())
        return dto
    }
    public ContentPostInputDTO = (content:unknown):string =>{ 
        if(typeof content!=='string'){throw new BadRequestError('Content deve ser uma string')}
        return content

    }
    public CreatePostOutputDTO = (post:Post):CreatePostOutputDTO =>{
        const dto :CreatePostOutputDTO= {
            message:"Post adicionado com sucesso",
            post: post.toPostOutput()
        }
        return dto
    }
    public PostReactionInputDTO = (like:unknown):boolean =>{
      
           if(typeof like !== 'boolean'){
               throw new BadRequestError("'like' deve ser um booleano")
            }

        return like
    }
    public PostReactionOuputDTO = (message:string):PostReactionOutputDTO=>{
        return{
            message:message
        }
    }

}
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
        name:string,
    }

}

export interface CreatePostInputDTO{
    content:string,
    token:string
}
export interface DeletePostInputDTO{
    id:string,
    token:string
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
    public CreatePostInputDTO = (
        content:unknown,
        token:unknown
        ):CreatePostInputDTO =>{ 
        if(typeof content!=='string')
        {throw new BadRequestError('Content deve ser uma string')}
        if(typeof token !== 'string')
        {throw new BadRequestError('token invalida')}
        const dto : CreatePostInputDTO ={
            content,
            token
        }

        return dto

    }
    public CreatePostOutputDTO = (post:Post):CreatePostOutputDTO =>{
        const dto :CreatePostOutputDTO= {
            message:"Post adicionado com sucesso",
            post: post.toPostOutput()
        }
        return dto
    }

    public DeletePostInputDTO = (id:unknown, token:unknown):DeletePostInputDTO=>{
        if(typeof id !== 'string'){
            throw new BadRequestError("'id' deve ser uma string")
        }
        if(typeof token !== 'string'){
            throw new BadRequestError("'token' deve ser uma string")
        }
        return {
            id,
            token
        }
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

}//"id": "u001",p003
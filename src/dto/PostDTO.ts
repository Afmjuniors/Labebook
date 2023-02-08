import { BadRequestError } from "../error/BadRequestError";
import { Post } from "../models/Post";

export interface GetPostOutputDTO{
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

export interface CreatePostInputDTO{
    idPost:string,
    idUser:string,
    content:string
}

export interface PostOutputDTO{
    message:string,
    post:{
        id:string,
        creatorId:string,
        content:string,
        likes:number,
        dislikes:number,
        createdAt:string,
        updatedAt:string
    }
}

export interface EditPostInputDTO{
    idPost:string,
    content:string
}





export class PostDTO{
    public CreatePostInputDTO(
        idUser:string,
        idPost:unknown,
        content:unknown
    ):CreatePostInputDTO{
        
        if (typeof content !== "string") {
            throw new BadRequestError("Content deve ser uma string");

        }
        if (typeof idPost !== "string") {
            throw new BadRequestError("Content deve ser uma string");

        }
        const dto:CreatePostInputDTO ={
            idUser,
            idPost,
            content
        }
        return dto
    }
    public CreatePostOutputDTO(input:Post):PostOutputDTO{
        const dto: PostOutputDTO={
            message:"Post criado com sucesso",
            post:{
                id:input.getId(),
                creatorId:input.getCreatorId(),
                content:input.getContent(),
                likes:input.getLikes(),
                dislikes:input.getDislikes(),
                createdAt:input.getCreatedAt(),
                updatedAt:input.getUpdatedAt()
            }
        }
        return dto
    }
    public EditPostInputDTO(
        idPost:string,
        content:unknown
    ){

        if(typeof content !== "string"){
            throw new Error("'content' deve ser uma string");
            
        }

        const dto: EditPostInputDTO = {
            idPost,
            content
        } 
        return dto
    }
    public EditPostOutputDTO(input:Post):PostOutputDTO{
        const dto: PostOutputDTO={
            message:"Post atualizado com sucesso",
            post:{
                id:input.getId(),
                creatorId:input.getCreatorId(),
                content:input.getContent(),
                likes:input.getLikes(),
                dislikes:input.getDislikes(),
                createdAt:input.getCreatedAt(),
                updatedAt:input.getUpdatedAt()
            }
        }
        return dto
    }
}
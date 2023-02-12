import { Request, Response } from "express";
import { PostBusiness } from "../Business/PostBusiness";
import { PostsDTO } from "../dto/PostDTO";
import { BaseError } from "../error/BaseError";

export class PostController{
    constructor(
        private postDTO: PostsDTO,
        private postBusiness: PostBusiness
    ){}

    public getPosts = async (req:Request, res:Response)=>{
        try {
            const input = req.query.q as string | undefined

            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
  

    }
    public createPost =async (req:Request,res:Response) => {
        try {
            const input = this.postDTO.ContentPostInputDTO(req.body.content)
            const user = {
                id:req.body.creatorID as string, 
                name:req.body.name as string
            }           
            
            
            const output = await this.postBusiness.createPost(input,user)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
    }
    public editPost =async (req:Request,res:Response) => {
        try {
            const input = {
                content:this.postDTO.ContentPostInputDTO(req.body.content),
                id: req.params.id
            }


            
            const output = await this.postBusiness.editPost(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
    }
    public deletePost = async (req:Request, res:Response)=>{
        try {
            const id = req.params.id

            const output = await this.postBusiness.deletePost(id)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
  

    }
    public reactionPost = async (req:Request,res:Response)=>{
        try {
            const id = req.params.id
            const input = this.postDTO.PostReactionInputDTO(req.body.like)
    
            const output = await this.postBusiness.reactionPost(input)
            
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }

    }
}
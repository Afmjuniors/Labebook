import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO } from "../dto/PostDTO"
import { BaseError } from "../error/BaseError"

export class PostController {
    constructor(
        private postDTO:PostDTO,
        private postBusiness: PostBusiness
    ){}

    public async getPosts(req: Request, res: Response) {
        try {
            const input = req.params.id
            

            const output = await this.postBusiness.getPosts(input)
          

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async createNewPost(req: Request, res: Response) {
        try {

            const input = this.postDTO.CreatePostInputDTO(
                req.params.id,
                req.body.id,
                req.body.content
            )
          
            

            const output = await this.postBusiness.createNewPost(input)

           
            res.status(201).send(output)


        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async editPost(req: Request, res: Response) {
        try {
       
            const input = this.postDTO.EditPostInputDTO(
                req.params.id,
                req.body.content
            )
            
            const output = await this.postBusiness.editPost(input)          

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async deletePost(req: Request, res: Response) {
        try {
            const input = req.params.id
            

            const output = await this.postBusiness.deletePost(input)
           
            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

   

}

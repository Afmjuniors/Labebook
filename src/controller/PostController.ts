import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { BaseError } from "../error/BaseError"


export class PostController {

    public async getPosts(req: Request, res: Response) {
        try {
            const input = req.params.id
            const postBusiness = new PostBusiness()

            const output = await postBusiness.getPosts(input)
          

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

            const input ={
                 idUser:req.params.id,
                 content:req.body.content,
                 idPost:req.body.id
            }
            const postBusiness = new PostBusiness()

            const output = postBusiness.createNewPost(input)

           
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
            const input={
                idPost: req.params.id,
                content: req.body.content
            }
            const postBusiness = new PostBusiness()

            const output = await postBusiness.editPost(input)          

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
            const postBusiness = new PostBusiness()

            const output = postBusiness.deletePost(input)
           
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

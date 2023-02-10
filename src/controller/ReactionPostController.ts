import { Request, Response } from "express"
import { ReactionPostBusiness } from "../business/ReactionPostBusiness"
import { BaseError } from "../error/BaseError"
import { Reaction } from "../models/Reaction"

export class ReactionPostController{
    constructor(
        private reactionPostBusiness: ReactionPostBusiness
<<<<<<< HEAD
        ){}
=======
    ){}
>>>>>>> ce8ce0e6d1f881283662d5bf2790b700a3420dc7
    public async reactionPost(req: Request, res: Response) {
        try {

            const input = new Reaction(
                 req.params.id,
                 req.body.idPost,  
                 req.body.like 
            )
            
<<<<<<< HEAD
            const output = await this.reactionPostBusiness.reactionPost(input)
=======
            const output = this.reactionPostBusiness.reactionPost(input)
>>>>>>> ce8ce0e6d1f881283662d5bf2790b700a3420dc7

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
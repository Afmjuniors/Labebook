import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
<<<<<<< HEAD
=======
import { UserDTO } from "../dto/UserDTO";
>>>>>>> ce8ce0e6d1f881283662d5bf2790b700a3420dc7
import { BaseError } from "../error/BaseError";

export class UserController {
    constructor(
<<<<<<< HEAD
        private userBusiness: UserBusiness,
        private reactionPostBusiness : ReactionPostBusiness
=======
        private userDTO: UserDTO,
        private userBusiness:UserBusiness
>>>>>>> ce8ce0e6d1f881283662d5bf2790b700a3420dc7
    ){}

    public async signUp(req: Request, res: Response) {
        try {
<<<<<<< HEAD
            const input = req.body

            const output =await  this.userBusiness.signUp(input)          
=======
            const input = this.userDTO.signUpInputDTO(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            )
           

            const output =await this.userBusiness.signUp(input)          
>>>>>>> ce8ce0e6d1f881283662d5bf2790b700a3420dc7
        
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

    public async login(req: Request, res: Response) {
        try {
            const input = req.body
           

            const output = await this.userBusiness.login(input)
    
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

    public async viewAllUsers(req: Request, res: Response) {
        try {
          

           const output = await this.userBusiness.viewAllUsers()

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

<<<<<<< HEAD
    public async reactionPost(req: Request, res: Response) {
        try {

            const input={
                idUser: req.params.id,
                idPost: req.body.idPost,  
                like: req.body.like 
            }
            
            const output = await this.reactionPostBusiness.reactionPost(input)

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
=======
   
>>>>>>> ce8ce0e6d1f881283662d5bf2790b700a3420dc7
    }
 





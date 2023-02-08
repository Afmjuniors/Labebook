import { Request, Response } from "express";
import { ReactionPostBusiness } from "../business/ReactionPostBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { nowDate, regexEmail,regexPassword } from "../constants/patterns";
import { UserDatabase } from "../database/UsersDatabase";
import { UserDTO } from "../dto/UserDTO";
import { BaseError } from "../error/BaseError";
import { User } from "../models/User";
import { Role, UserDB } from "../types";

export class UserController {
    constructor(
        private userDTO: UserDTO,
        private userBusiness:UserBusiness
    ){}

    public async signUp(req: Request, res: Response) {
        try {
            const input = this.userDTO.signUpInputDTO(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            )
           

            const output =await this.userBusiness.signUp(input)          
        
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

   
    }
 





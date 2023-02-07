import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { nowDate, regexEmail,regexPassword } from "../constants/patterns";
import { UserDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { Role, UserDB, UserDTO } from "../types";

export class UserController {

    public async signUp(req: Request, res: Response) {
        try {
            const input = req.body
            const userBusiness = new UserBusiness()


            const output =await  userBusiness.signUp(input)          
        
        
            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
            
        }
      
    }

    public async login(req: Request, res: Response) {
        try {
            const input = req.body
            const userBusiness = new UserBusiness()

            const output = await userBusiness.login(input)
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
       
        }

    public async viewAllUsers(req: Request, res: Response) {
        try {
           const userBusiness = new UserBusiness()

           const output = await userBusiness.viewAllUsers()

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    }
 





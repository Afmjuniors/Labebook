import { Request, Response } from "express";
import { patternDate } from "../constants/patterns";
import { BaseDatabase } from "../database/BaseDatabase";
import { UserDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { ResponseFollows, Role, UserDB, UserDTO, UserToEditDB } from "../types";

export class UserController {

    public async signUp(req: Request, res: Response) {
        const { id, name, email, password } = req.body
    }


    public async login(req: Request, res: Response) {
        const { email, password } = req.body
        const userDatabase = new UserDatabase()

        if (email !== undefined) {
            const result = await userDatabase.findUser(email)
            if (result) {
                if (password === result.password) {
                    res.status(200).send("Login feito com sucesso")
                } else {
                    throw new Error("Password Invalido");
                }        
            }else{
                throw new Error("Usuario não encontrado");
                
            }

        }
    }




}
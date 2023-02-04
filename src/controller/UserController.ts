import { Request, Response } from "express";
import { BaseDatabase } from "../database/BaseDatabase";
import { UserDatabase } from "../database/UsersDatabase";

export class UserController{
    public async getUsers(req:Request, res:Response){
        try {
            const name = req.query.q as string | undefined
            const userDatabase = new UserDatabase() 
           
            const result = await userDatabase.findUser(name)
            res.status(200).send({
                message:"usuarios encontrados",
                result:result
        })
      
            
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
import { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { BaseError } from "../error/BaseError"

export class UserControler{
    constructor(
        private userBusiness:UserBusiness

    ){}
    public getAllUsers = (req:Request, res:Response)=>{
        try {
    
            
            res.status(200).send("entrou")
            
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
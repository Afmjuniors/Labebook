import { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserDTO } from "../dto/UserDTO"
import { BaseError } from "../error/BaseError"

export class UserControler{
    constructor(
        private userDTO: UserDTO,
        private userBusiness:UserBusiness

    ){}
    public getAllUsers = async (req:Request, res:Response)=>{
        try {
            const  q = req.query.q as string | undefined
           
            const output = await this.userBusiness.getAllUsers(q)
                
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
    public createUser = async (req:Request,res:Response) =>{
        try {
            const input = this.userDTO.CreateUserInputDTO(
                req.body.name,
                req.body.email,
                req.body.password
            )
        const output = await this.userBusiness.createUser(input)

        res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public loginUser =async (req:Request,res:Response) => {
        try {
            const input = this.userDTO.LoginUserInputDTO(
                req.body.email,
                req.body.password
            )
            const output = await this.userBusiness.loginUser(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
        
    }
}


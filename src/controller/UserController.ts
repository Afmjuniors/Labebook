import { Request, Response } from "express";
import { nowDate } from "../constants/patterns";
import { UserDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { Role, UserDB, UserDTO } from "../types";

export class UserController {

    public async signUp(req: Request, res: Response) {
        try {
            const { id, name, email, password } = req.body as UserDTO

            const userDatabase = new UserDatabase()

            if (!id || !name || !email || !password ){
                throw new Error("Favor colocar email name e password");                
            }
            const newUser = new User(
                id,
                name,
                email,
                password,
                Role.USER,
                nowDate,
                nowDate
            )
            const newUserDB :UserDB = {
                id:newUser.getId(),
                name:newUser.getName(),
                email:newUser.getEmail(),
                password:newUser.getPassword(),
                role:newUser.getRole(),
                created_at:newUser.getCreateAt(),
                updated_at:newUser.getUpdateAt()                
            }
            await userDatabase.insertNewUser(newUserDB)
            res.status(201).send("Usuario criado com sucesso")
            
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
            const userDatabase = new UserDatabase()
            const result = await userDatabase.findAllUsers()

            res.status(200).send(result)
            
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
 





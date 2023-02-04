import { Request, Response } from "express";
import { patternDate } from "../constants/patterns";
import { BaseDatabase } from "../database/BaseDatabase";
import { FollowsDatabase } from "../database/FollowsDatabase";
import { UserDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { ResponseFollows, Role, UserDB, UserDTO, UserToEditDB } from "../types";

export class UserController {
    public async getUsers(req: Request, res: Response) {
        try {
            const name = req.query.q as string | undefined
            const userDatabase = new UserDatabase()

            const result = await userDatabase.findUser(name)
            res.status(200).send({
                message: "usuarios encontrados",
                result: result
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
    public async getUsersById(req: Request, res: Response) {
        try {
            const id = req.params.id
            const userDatabase = new UserDatabase()

            const userDB: UserDB | undefined = await userDatabase.findeUserById(id)
            if (userDB) {
                const followesDatabase = new FollowsDatabase()

                const followers: ResponseFollows = await followesDatabase.findFollowersNumber(userDB.id)
             
                const user = new User(
                    userDB.id,
                    userDB.name,
                    userDB.email,
                    userDB.password,
                    userDB.role,
                    followers.follows.count,
                    followers.followedBy.count,
                    userDB.created_at,
                    userDB.updated_at
                )
                res.status(200).send(user)
            }else{
                res.status(400)
                throw new Error("User não encontrado");
                
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

    public async createNewUser(req:Request,res:Response){
        try {
            const {id, name, email, password, role} = req.body as UserDTO
            const userDatabase = new UserDatabase()
            
            const newUser = new User(
                id,
                name,
                email,
                password,
                role,
                0,
                0,
                patternDate,
                patternDate
            )
            const newUserDB: UserDB={
                id:newUser.getId(),
                name:newUser.getName(),
                email:newUser.getEmail(),
                password:newUser.getPassword(),
                role:newUser.getRole(),
                follows: newUser.getFollows(),
                followed:newUser.getFollowed(),
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

    public async editUser(req:Request,res:Response){
        try {
            const idToEdit = req.params.id
            const {id,name,email,password,role} = req.body as UserDTO
            
            const userDatabase = new UserDatabase()
            
            const userToEdit = await userDatabase.findeUserById(idToEdit)
            if(userToEdit){
                const user = new User(
                    userToEdit.id,
                    userToEdit.name,
                    userToEdit.email,
                    userToEdit.password,
                    userToEdit.role,
                    userToEdit.follows,
                    userToEdit.followed,
                    userToEdit.created_at,
                    userToEdit.updated_at
                )
                if(name!==undefined){
                    if(typeof name!== "string"){
                        res.status(400)
                        throw new Error("Name deve ser uma string");
                        
                    }
                    user.setName(name)
                }
                if(email!==undefined){
                    if(typeof email!=="string"){
                        throw new Error("Email deve ser uma string");
                        
                    }
                    user.setEmail(email)
                }
                if(password!==undefined){
                    if(typeof password !== "string"){
                        throw new Error("Password deve ser uma string");

                    }
                    user.setPassword(password)
                }
                if(role!==undefined){
                   
                    user.setRole(role)
                }
                if(name ||email|| password ||role ){
                    user.setUpdateAt(patternDate)
                }
                const userToEditDB : UserToEditDB = {
                    name:user.getName(),
                    email:user.getEmail(),
                    password:user.getPassword(),
                    role:user.getRole(),
                    updated_at:user.getUpdateAt()
                }

                await userDatabase.editUser(userToEditDB, idToEdit)
                res.status(200).send(user)
                
                
            }else{
                res.status(404)
                throw new Error("User nao encontrado");
                
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
    public async deleteUserById(req:Request, res:Response){
        try {
            const idToDelete = req.params.id

            const userDatabase = new UserDatabase()

            const userToDelete = await userDatabase.findeUserById(idToDelete)
            if(userToDelete){
                await userDatabase.deleteUser(idToDelete)
                res.status(200).send({
                    message:"User deleted"
                })

            }else{
                res.status(404)
                throw new Error("User not found");
                
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


}
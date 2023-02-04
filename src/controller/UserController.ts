import { Request, Response } from "express";
import { BaseDatabase } from "../database/BaseDatabase";
import { FollowsDatabase } from "../database/FollowsDatabase";
import { UserDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { ResponseFollows, UserDB } from "../types";

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


}
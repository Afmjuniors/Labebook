import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserController } from './controller/UserController'
import { FollowsDatabase } from './database/FollowsDatabase'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        const follow = new FollowsDatabase()

        const result = await follow.findFollowersNumber("u002")


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
})
const usersController = new UserController()

app.get("/users", usersController.getUsers)
app.get("/users/:id", usersController.getUsersById)
app.post("/users", usersController.createNewUser)
app.patch("/users/:id", usersController.editUser)





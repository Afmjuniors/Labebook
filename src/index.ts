import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserController } from './controller/UserController'
import { PostController } from './controller/PostController'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {



        res.status(200).send("pong!")
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
const postController = new PostController()

app.get("/users", usersController.viewAllUsers)

app.post("/user", usersController.signUp)
app.post("/users", usersController.login)

app.get("/posts/:id", postController.getPosts )

app.post("/posts/:id", postController.createNewPost)
app.patch("/posts/:id", postController.editPost)
app.delete("/posts/:id", postController.deletePost)

app.post("/users/:id/:idPost", postController.likeDislikePost)







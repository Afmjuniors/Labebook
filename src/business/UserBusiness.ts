import { nowDate, regexEmail, regexPassword } from "../constants/patterns";
import { UserDatabase } from "../database/UsersDatabase";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { User } from "../models/User";
import { Role, UserDB, UserDTO } from "../types"

export class UserBusiness{
    public signUp =async (input:UserDTO) : Promise<{message:string,usuario:User}> => {
        const { id, name, email, password } = input

        const userDatabase = new UserDatabase()
    
        if (!id || !name || !email || !password ){
            throw new BadRequestError("Favor colocar email name e password");                
        }
        if(!email.match(regexEmail)){
            // res.status(400)
            throw new BadRequestError("Email invalido");
            
        }
        if(!password.match(regexPassword)){
            // res.status(400)
            throw new BadRequestError("Password tem quer ter de 8 a 12 caracteres, um caracter especial pelomenos uma letra maiuscula e pelomenos uma letra minuscula");
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
    
        const output = {
            message:"Usuario criado com sucesso",
            usuario:newUser
        }
    
        return output
    }
    public login =async (input:any): Promise<{message:string}> => {
        const { email, password } = input
        const userDatabase = new UserDatabase()

        if (email.match(regexEmail)) {
            const result = await userDatabase.findUser(email)
            if (result) {
                if (password === result.password) {
                    // res.status(200).send("Login feito com sucesso")
                    const output = {
                        message:'Login efetuado com sucesso'
                    }
                    return output
                } else {
                    throw new BadRequestError("Password Invalido");
                }        
            }else{
                throw new NotFoundError("Usuario não encontrado");
                
            }
        }else{
            // res.status(400)
            throw new BadRequestError("Email invalido");
            
        }
    }

    public viewAllUsers =async ():Promise<UserDB[]> => {
        const userDatabase = new UserDatabase()
        const output = await userDatabase.findAllUsers()
        return output
    }
}
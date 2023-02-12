import { nowDate, regexEmail, regexPassword } from "../constants/patterns";
import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, CreateUserOutputDTO, GetUsersOutputDTO, LoginUserInputDTO, LoginUserOutputDTO, UserDTO } from "../dto/UserDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { NotUniqueValueError } from "../error/NotUniqueValueError";
import { PasswordIncorrectError } from "../error/PasswordIncorrectError";
import { User } from "../models/User";
import { Role, UserDB } from "../types";

export class UserBusiness{
    constructor(
      private userDTO: UserDTO,
      private  userDatabase: UserDatabase
    ){}

    public getAllUsers = async (q:string | undefined):Promise<GetUsersOutputDTO> =>{
     
        const usersDB:UserDB[] = await this.userDatabase.getAllUsers()
        const users: User[] = usersDB.map((user)=>{
            return new User(
                user.id,
                user.name,
                user.email,
                user.password,
                user.role,
                user.created_at,
                user.updated_at
            )
        })
        

        const output = this.userDTO.GetUsersOutputDTO(users)

        return output

    }

    public createUser = async(input:CreateUserInputDTO ): Promise<CreateUserOutputDTO>=> {
        const {name,email,password} = input
        if(name.length<3){
            throw new BadRequestError("'name' deve ter pelo menos 3 caracteres");
            
        }
        if(!email.match(regexEmail)){
            throw new BadRequestError("Email invalido");

        }
        const userVerification = await this.userDatabase.getUserByEmail(email)
        if(userVerification){
            throw new NotUniqueValueError("Email ja cadastrado");            
        }
        if(!password.match(regexPassword)){
            throw new BadRequestError("Password teve conter pelo menos 1 letra Maiuscula, 1 letra minuscula, 1 caracter especial, 1 numero e ter de 8 a 12 caracteres");

        }
        const newUser = new User
        (
            nowDate+email,
            name,
            email,
            password,
            Role.USER,
            nowDate,
            nowDate
        )
        await this.userDatabase.insertUser(newUser.ToDatabase())
        
        const output = this.userDTO.CreateUserOutputDTO(newUser)
        return output


        
    }
    public loginUser =async (input:LoginUserInputDTO): Promise<LoginUserOutputDTO> => {
        const {email,password} = input

        const user = await this.userDatabase.getUserByEmail(email)
        if(!user){
            throw new NotFoundError("Usuario não encontrado")
        }
        if(password!==user.password){
            throw new PasswordIncorrectError()
        }
        const userLogado = new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at,
            user.updated_at
        )
        const output = this.userDTO.LoginUserOutputDTO(userLogado)
        return output

                
    }
}
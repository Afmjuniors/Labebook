import { nowDate, regexEmail, regexPassword } from "../constants/patterns";
import { UserDatabase } from "../database/UsersDatabase";
import { SignUpInputDTO, SignUpOutputDTO, UserDTO } from "../dto/UserDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { User } from "../models/User";
import { Role, UserDB } from "../types"

export class UserBusiness {
    constructor(
        private userDTO: UserDTO,
        private userDatabase: UserDatabase
    ) { }
    public signUp = async (input: SignUpInputDTO): Promise<SignUpOutputDTO> => {
        const { id, name, email, password } = input

        if (!email.match(regexEmail)) {
            throw new BadRequestError("Email invalido");

        }
        if (!password.match(regexPassword)) {
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
        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreateAt(),
            updated_at: newUser.getUpdateAt()
        }
        await this.userDatabase.insertNewUser(newUserDB)

        const output = this.userDTO.signUpOutputDTO(newUser)

        return output
    }
    public login = async (input: any): Promise<{ message: string }> => {
        const { email, password } = input


        if (!email.match(regexEmail)) {
            throw new BadRequestError("Email invalido");
        } else {
            const result = await this.userDatabase.findUser(email)
            if (!result) {
                throw new NotFoundError("Usuario não encontrado");
            } else {
                if (password !== result.password) {
                    throw new BadRequestError("Password Invalido");
                } else {
                    const output = this.userDTO.LoginOutputDTO()
                    return output
                }
            }

        }
    }

    public viewAllUsers = async (): Promise<UserDB[]> => {

        const output = await this.userDatabase.findAllUsers()
        return output
    }
}
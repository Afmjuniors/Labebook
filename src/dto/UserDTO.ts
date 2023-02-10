import { BadRequestError } from "../error/BadRequestError"
import { User } from "../models/User"

export interface SignUpInputDTO {
    id:string,
    name:string,
    email:string,
    password:string

}
export interface SignUpOutputDTO{
    message:string,
    user:{
        id:string,
        name:string,
        email:string,
        createdAt:string,
        updatedAt:string
    }
}
export interface LoginInputDTO{
    email:string,
    password:string
}

export interface LoginOutputDTO{
    message:string
}


export class UserDTO{
    public signUpInputDTO (
        id:unknown,
        name:unknown,
        email:unknown,
        password:unknown
    ):SignUpInputDTO{
        if(typeof id !== 'string'){
            throw new BadRequestError("'id' deve ser uma string")
        }
        if(typeof name !== 'string'){
            throw new BadRequestError("'name' deve ser uma string")
        }
        if(typeof email !== 'string'){
            throw new BadRequestError("'email' deve ser uma string")
        }    
        if(typeof password !== 'string'){
            throw new BadRequestError("'password' deve ser uma string")
        }

        const dto: SignUpInputDTO = {
            id,
            name,
            email,
            password
        }
        return dto

    }
    public signUpOutputDTO(newUser:User):SignUpOutputDTO{
        const dto :SignUpOutputDTO ={
            message:"Usuario criado com sucesso",
            user:{
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                createdAt: newUser.getCreateAt(),
                updatedAt: newUser.getUpdateAt()
            }
        }
        return dto
    }
    public LoginInputDTO(
        email:unknown,
        password:unknown
    ): LoginInputDTO{
        if(typeof email!=="string"){
            throw new Error("'Email' deve ser uma string");
            
        }
        if(typeof password!=="string"){
            throw new Error("'password' deve ser um string");
            
        }

        const dto :LoginInputDTO = {
            email,
            password
        }
        return dto

    }
    public LoginOutputDTO():LoginOutputDTO{
        const dto : LoginOutputDTO ={
            message:"Login efetuado com sucesso"
        }
        return dto
    }

}
import { BadRequestError } from "../error/BadRequestError";
import { User } from "../models/User";
import { Roles, UserOutput } from "../types";


export interface GetUsersOutputDTO {
    message: string,
    users: {
        id: string,
        name: string,
        email: string,
        role: Roles,
        createdAt: string,
        updatedAt: string

    }[]
}


export interface CreateUserInputDTO {
    name: string,
    email: string,
    password: string
}
export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: Roles,
        createdAt: string,
        updatedAt: string

    },
    token: string
}

export interface LoginUserInputDTO {
    email: string,
    password: string
}
export interface LoginUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string
    },
    token: string
}


export class UserDTO {
    constructor() { }

    public GetUsersOutputDTO = (users: User[]): GetUsersOutputDTO => {
        const arrUser: UserOutput[] = users.map((user) => user.getUsersOutput())
        const dto: GetUsersOutputDTO = {
            message: "Resultado da pesquisa",
            users: arrUser
        }

        return dto
    }
    public CreateUserInputDTO = (
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateUserInputDTO => {
        if (typeof name !== 'string') {
            throw new BadRequestError("'name' deve ser uma string");
        }
        if (typeof email !== 'string') {
            throw new BadRequestError("'email' deve ser uma string");
        }
        if (typeof password !== 'string') {
            throw new BadRequestError("'password' deve ser uma string");
        }
        const dto: CreateUserInputDTO = {
            name,
            email,
            password
        }
        return dto
    }

    public CreateUserOutputDTO = (user: User, token: string): CreateUserOutputDTO => {
        const dto: CreateUserOutputDTO = {
            message: "Usuario adicionado com sucesso",
            user: user.getUsersOutput(),
            token
        }
        return dto
    }

    public LoginUserInputDTO = (
        email: unknown,
        password: unknown
    ): LoginUserInputDTO => {
        if (typeof email !== 'string') {
            throw new BadRequestError("email deve ser uma string");

        }
        if (typeof password !== 'string') {
            throw new BadRequestError("Password deve ser uma string");

        }
        const dto: LoginUserInputDTO = {
            email,
            password
        }
        return dto
    }

    public LoginUserOutputDTO = (user: User, token: string): LoginUserOutputDTO => {
        const dto: LoginUserOutputDTO = {
            message: "Login feito com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
            },
            token
        }
        return dto
    }


}
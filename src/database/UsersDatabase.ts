import { BaseDatabase } from "../database/BaseDatabase";
import { UserDB, UserToEditDB } from "../types";

export class UserDatabase extends BaseDatabase{
    private static TABLE_USERS ="users"

    public async findUser(email:string): Promise<UserDB | undefined>{
            const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({email})    
        return result
    }
    public async findeUserById(id:string): Promise<UserDB | undefined>{
        const [userDB] : UserDB[] | undefined[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where({id})

        return userDB
    }
    public async insertNewUser(newUser:UserDB):Promise<void>{
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUser)
    }

    public async editUser(user:UserToEditDB, idToEdit:string):Promise<void>{
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .update(user)
        .where({id:idToEdit})
    }

    public async deleteUser(id:string):Promise<void>{
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .del()
        .where({id})
    }

}
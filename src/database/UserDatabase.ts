import { UserDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase{
    public static TABLE_USER= "users"


    public getAllUsers =async ():Promise<UserDB[]>=>{
        const result:UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USER)
        return result
    }
    public getUserById =async (id:string) :Promise<UserDB| undefined>=> {
        const [user] = await BaseDatabase
        .connection(UserDatabase.TABLE_USER)
        .where({id})
        return user
    }
    public getUserByEmail = async (email:string):Promise<UserDB| undefined>=>{
        
        const [result] : UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USER)
        .where({email})
        return result
    }
    public insertUser =async (user:UserDB):Promise<void> => {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USER)
        .insert(user)
        
    }


}

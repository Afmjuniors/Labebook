import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase{
    public static TABLE_USER= "users"
    public getAllUsers =()=>{
        const result = BaseDatabase
        .connection(UserDatabase.TABLE_USER)
    }
}
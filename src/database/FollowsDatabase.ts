import { BaseDatabase } from "./BaseDatabase";

export class FollowsDatabase extends BaseDatabase{
    private static TABLE_FOLLOWS = "followers"

    public async findFollowersNumber(idUser:string){
        const followedsDB = await BaseDatabase
        .connection(FollowsDatabase.TABLE_FOLLOWS)
        .where({followed_id: idUser})//as pessoas que me segue
        const followsDB = await BaseDatabase
        .connection(FollowsDatabase.TABLE_FOLLOWS)
        .where({follow_id: idUser})

        const followedBy = followedsDB.map(value=>value.follow_id)
        const follows = followsDB.map(value=>value.followed_id)
        
        return {
            followedBy:{
                count:followedBy.length,
                ids:followedBy
            },
            follows:{
                count:follows.length,
                ids:follows
            }
                
        }
    }

    
}
import { Reaction } from "../models/Reaction"
import { ReactionDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class ReactionPostDatabase extends BaseDatabase{
    public static TABLE_LIKE = "likes_dislikes"     

    public async newReaction(likeDB:ReactionDB):Promise<void>{
        await BaseDatabase
        .connection(ReactionPostDatabase.TABLE_LIKE)
        .insert(likeDB)
    }
    public async editReaction(likeDB:ReactionDB):Promise<void>{
        await BaseDatabase
        .connection(ReactionPostDatabase.TABLE_LIKE)
        .update({like:likeDB.like})
        .where({user_id:likeDB.user_id})
        .andWhere({post_id:likeDB.post_id})
    }
    public async findReactionOfUser (reactioDTO:Reaction):Promise<ReactionDB | undefined>{
        const [result] :ReactionDB[] = await BaseDatabase
        .connection(ReactionPostDatabase.TABLE_LIKE)
        .where({user_id:reactioDTO.getUserId()})
        .andWhere({post_id:reactioDTO.getPostId()})

        return result
    }

    public async deleteReaction (reactioDTO:Reaction):Promise<void>{
        await BaseDatabase
        .connection(ReactionPostDatabase.TABLE_LIKE)
        .del()
        .where({user_id:reactioDTO.getUserId()})
        .andWhere({post_id:reactioDTO.getPostId()})
    }
}
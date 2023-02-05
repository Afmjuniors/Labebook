import { likeDislikePost } from "../models/LikeDislikePost";
import { Post } from "../models/Post";
import { ReactionDB, PostDB, ReactionEditedDB, PostToEdit } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKE = "likes_dislikes"

    public async findPosts(creatorId?:string):Promise<PostDB[]>{
        let postsDB
        if(creatorId){
            const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({creator_id:creatorId})
            postsDB= result
        
        }else{
            const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            postsDB= result
        }

        return postsDB
    }
    public async findPostById(id:string):Promise<PostDB | undefined>{
        const [result]: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where({id})
        return result
    }

    public async createNewPost(newPost:PostDB):Promise<void>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(newPost)
    }

    public async editPost(post:PostToEdit, id:string):Promise<void>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(post)
        .where({id})
    }

    public async deletePost(id:string):Promise<void>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .del()
        .where({id})
    }

    public async addRemoveReaction(likes:ReactionEditedDB, id:string):Promise<void>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(likes)
        .where({id})
    }

    public async newReaction(likeDB:ReactionDB):Promise<void>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKE)
        .insert(likeDB)
    }
    public async editReaction(likeDB:ReactionDB):Promise<void>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKE)
        .update({like:likeDB.like})
        .where({user_id:likeDB.user_id})
        .andWhere({post_id:likeDB.post_id})
    }
    public async findReactionOfUser (reactioDTO:likeDislikePost):Promise<ReactionDB | undefined>{
        const [result] :ReactionDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_LIKE)
        .where({user_id:reactioDTO.getUserId()})
        .andWhere({post_id:reactioDTO.getPostId()})

        return result
    }



}
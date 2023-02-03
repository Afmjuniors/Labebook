import { Post } from "../models/Post";
import { LikesDeslikesDB, PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    private static TABLE_POSTS = "posts"

    public async findPost(creatorId?:string, content?:string):Promise<PostDB[]>{
        let postsDB
        if(creatorId){
            const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({id:creatorId})
            postsDB= result
        }else if(content){
            const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where("content","LIKE",`%${content}%`)
            postsDB= result
        }else{
            const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            postsDB= result
        }

        return postsDB
    }
    public async findPostById(id:string):Promise<PostDB>{
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

    public async editPost(post:PostDB, id:string):Promise<void>{
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



}
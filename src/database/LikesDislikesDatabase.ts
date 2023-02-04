import { count } from "console";
import { LikesDeslikesDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class LikesDislikesDatabase extends BaseDatabase{
    private static TABLE_LIKES_DISLIKES = "likes_dislikes"

   async findNumberOfLikes(idPost:string):Promise<number[]>{
    
    const allLikes : LikesDeslikesDB[]= await BaseDatabase
    .connection(LikesDislikesDatabase.TABLE_LIKES_DISLIKES)
    .where({post_id:idPost})
    let count :number =0 
    allLikes.forEach((postLD)=> count+=postLD.like)

    return [count,(allLikes.length-count)]

   }
  



}
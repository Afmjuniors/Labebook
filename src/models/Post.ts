import { PostsOutputDTO } from "../dto/PostDTO"
import { PostDB } from "../types"

export class Post{
    constructor(
        private id:string,
        private content:string,
        private likes:number,
        private dislikes:number,
        private createdAt:string,
        private updatedAt:string,
        private creator:{
            id:string,
            name:string
        }
    ){}
    public getId():string{return this.id}
    
    public getContent():string{return this.content}
    public setContent(content:string):void{this.content=content}
    
    public getLikes():number{return this.likes}
    public setLikes(likes:number):void{this.likes=likes}
    
    public getDislikes():number{return this.dislikes}
    public setDislikes(dislikes:number):void{this.dislikes=dislikes}
    
    public getCreatedAt():string{return this.createdAt}
    public setCreatedAt(createdAt:string):void{this.createdAt=createdAt}
    
    public getUpdatedAt():string{return this.updatedAt}
    public setUpdatedAt(updatedAt:string):void{this.updatedAt=updatedAt}
    
    public getCreator():{id:string,name:string}{return this.creator}

    public toPostDatabase (): PostDB {
        return{
            id:this.id,
            creator_id:this.creator.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            created_at:this.createdAt,
            updated_at:this.updatedAt
        }
    }
    public toPostOutput (): PostsOutputDTO{
        return{
            id:this.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            createdAt:this.createdAt,
            updatedAt:this.updatedAt,
            creator:{
                id:this.creator.id,
                name:this.creator.name
            }
        
        }
    }
    

}
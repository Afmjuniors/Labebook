import { appendFile } from "fs"
import { CreatorIDPost } from "../types"

export class Post{
    constructor(
       private id:string,
       private creatorId:string,
       private content:string,
       private likes:number,
       private dislikes:number,
       private createdAt:string,
       private updatedAt:string
    ){
    }
    public getId():string{return this.id}
    
    public getCreatorId():string{return this.creatorId}
    
    public getContent():string{return this.content}
    public setContent(content:string):void{this.content=content}
    
    public getLikes():number{return this.likes}
    public setLikes(likes:number):void{this.likes=likes}
    
    public getDislikes():number{return this.dislikes}
    public setDislikes(dislikes:number):void{this.dislikes=dislikes}
    
    public getCreatedAt():string{return this.createdAt}
    
    public getUpdatedAt():string{return this.updatedAt}
    public setUpdatedAt(updatedAt:string):void{this.updatedAt=updatedAt}


}
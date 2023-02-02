export class Post{
    constructor(
       private id:string,
       private creatorId:string,
       private content:string,
       private likes:number,
       private deslikes:number,
       private createdAt:string,
       private modifedAt:string
    ){}
    public getId():string{return this.id}
    public setId(id:string):void{this.id=id}
    
    public getCreatorId():string{return this.creatorId}
    public setCreatorID(creatorId:string):void{this.creatorId=creatorId}
    
    public getContent():string{return this.content}
    public setContent(content:string):void{this.content=content}
    
    public getLikes():number{return this.likes}
    public setLikes(likes:number):void{this.likes=likes}
    
    public getDeslikes():number{return this.deslikes}
    public setDeslikes(deslikes:number):void{this.deslikes=deslikes}
    
    public getCreatedAt():string{return this.createdAt}
    public setCreatedAt(createdAt:string):void{this.createdAt=createdAt}
    
    public getModifedAt():string{return this.modifedAt}
    public setModifedAt(modifedAt:string):void{this.modifedAt=modifedAt}


}
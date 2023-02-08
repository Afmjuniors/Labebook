export class Reaction{
    constructor(
        private userId:string,
        private postId:string,
        private like:boolean
    ){}

    getUserId():string{return this.userId}

    getPostId():string{return this.postId}

    getLike():boolean{return this.like}
    setLike(like:boolean):void{this.like= like}
    
}
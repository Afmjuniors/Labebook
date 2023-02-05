export class likeDislikePost{
    constructor(
        private userId:string,
        private postId:string,
        private like:boolean
    ){}

    getUserId():string{return this.userId}
    setUserId(id:string):void{this.userId=id}

    getPostId():string{return this.postId}
    setPostId(id:string):void{this.postId=id}

    getLike():boolean{return this.like}
    setLike(like:boolean):void{this.like= like}
    
}
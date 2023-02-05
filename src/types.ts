export enum Role {
    ADMIN="ADMIN",
    USER="USER"
}

export interface UserDB{
    id:string,
    name:string,
    email:string,
    password:string,
    role:Role,
    created_at:string,
    updated_at:string
}
export interface UserDTO{
    id:string,
    name:string,
    email:string,
    password:string,
    role:Role
}


export interface PostDB{
    id:string,
    creator_id:string,
    content:string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string
}
export interface PostDTO  {
    id: string,
    content: string,
    likes: number,
    dislikes:number,
    createdAt: string,
    updatedAt: string,
    creator: CreatorIDPost
}

export interface PostToedit{
    content:string,
    updated_at:string
}


export interface LikesDeslikesDB{
    user_id:string,
    post_id:string,
    like: boolean
}
export interface PostLikeDislikeDB{
    likes:number,
    dislikes:number
}

export interface CreatorIDPost{
    id:string
    name:string,
}






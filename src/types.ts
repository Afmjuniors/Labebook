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
    follows:number,
    followed:number,
    created_at:string,
    updated_at:string
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

export interface LikesDeslikesDB{
    user_id:string,
    post_id:string,
    like: number
}

export interface FollowersDB{
    followed_id:string,
    follow_id:string
}

export interface Follower{
    followedId:string,
    followId:string
}
export interface ResponseFollows {
    followedBy:{
        count:number,
        ids:string[]
    },
    follows:{
        count:number,
        ids:string[]
    }
}
export interface UserDTO{
    id:string,
    name:string,
    email:string,
    password:string,
    role:Role
}

export interface UserToEditDB{
    name:string,
    email:string,
    password:string,
    role:Role,
    updated_at:string
}
export interface CreatorIDPost{
    id:string
    name:string,
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





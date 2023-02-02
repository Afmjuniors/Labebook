export interface UserDB{
    id:string,
    name:string,
    email:string,
    password:string,
    role:string,
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
    delikes:number,
    created_at:string,
    updated_at:string
}

export interface LikesDeslikesDB{
    user_id:string,
    post_id:string,
    likes: number
}

export interface FollowersDB{
    followed_id:string,
    follow_id:string
}

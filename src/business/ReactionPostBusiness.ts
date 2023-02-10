import { PostDatabase } from "../database/PostsDatabase";
import { ReactionPostDatabase } from "../database/ReactionPostDatabase";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { Reaction } from "../models/Reaction";
import { Post } from "../models/Post";
import { ReactionDB, ReactionEditedDB } from "../types";

export class ReactionPostBusiness{
    constructor(
        private postDatabase: PostDatabase,
        private reactionPostDatabase: ReactionPostDatabase
    ){}
    public reactionPost =async (input:any):Promise<{message:string}> => {
       const {idUser,idPost,like} = input
        
        if(typeof like!=="boolean"){
            // res.status(400)
            throw new BadRequestError("Like deve ser um booleano");
            
        }
        const result = await this.postDatabase.findPostById(idPost)
        if (!result) {
            // res.status(404)
            throw new NotFoundError("Post nao encontrado");

        }
        const postToReact = new Post(
            idPost,
            result.creator_id,
            result.content,
            result.likes,
            result.dislikes,
            result.created_at,
            result.updated_at
        )

        const newPostReaction = new Reaction(
            idUser,
            idPost,
            like
        )
        if (typeof like !== "boolean") {
            throw new BadRequestError("Tem que ser booleano");
        }
        newPostReaction.setLike(like)
        let message: string = ""

        const postReaction: ReactionDB | undefined = await this.reactionPostDatabase.findReactionOfUser(newPostReaction)

        if (postReaction) {
            if (postReaction.like) {
                if (!like) {
                    const dislikes = postToReact.getDislikes()
                    const likes = postToReact.getLikes()
                    postToReact.setLikes(likes - 1)
                    postToReact.setDislikes(dislikes + 1)
                    message = "Thumbs down no post"

                }
            } else {
                if (like) {
                    const dislikes = postToReact.getDislikes()
                    const likes = postToReact.getLikes()
                    postToReact.setLikes(likes + 1)
                    postToReact.setDislikes(dislikes - 1)
                    message = "Thumbs up no post"

                }
            }
        } else {
            if (like) {
                const likes = postToReact.getLikes()
                postToReact.setLikes(likes + 1)
                message = "Thumbs up no post"

            } else {
                const dislikes = postToReact.getDislikes()
                postToReact.setDislikes(dislikes + 1)
                message = "Thumbs down no post"
            }
        }
        const newReactionDB: ReactionDB = {
            user_id: newPostReaction.getUserId(),
            post_id: newPostReaction.getPostId(),
            like: newPostReaction.getLike()
        }
        const postEditReact: ReactionEditedDB = {
            likes: postToReact.getLikes(),
            dislikes: postToReact.getDislikes()
        }
        if (postReaction) {
            await this.reactionPostDatabase.editReaction(newReactionDB)
        } else {
            await this.reactionPostDatabase.newReaction(newReactionDB)
        }
        await this.postDatabase.addRemoveReaction(postEditReact, idPost)

        const output = {
            message
        }
        return output
    }

}
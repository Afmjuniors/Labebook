import { PostDatabase } from "../database/PostsDatabase";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { likeDislikePost } from "../models/LikeDislikePost";
import { Post } from "../models/Post";
import { ReactionDB, ReactionEditedDB } from "../types";

export class ReactionPostBusiness{
    public reactionPost =async (input:any):Promise<{message:string}> => {
       const {idUser,idPost,like} = input
        
        const postDatabase = new PostDatabase()

        if(typeof like!=="boolean"){
            // res.status(400)
            throw new BadRequestError("Like deve ser um booleano");
            
        }
        const result = await postDatabase.findPostById(idPost)
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

        const newPostReaction = new likeDislikePost(
            idUser,
            idPost,
            like
        )
        if (typeof like !== "boolean") {
            throw new BadRequestError("Tem que ser booleano");
        }
        newPostReaction.setLike(like)
        let message: string = ""

        const postReaction: ReactionDB | undefined = await postDatabase.findReactionOfUser(newPostReaction)

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
            await postDatabase.editReaction(newReactionDB)
        } else {
            await postDatabase.newReaction(newReactionDB)
        }
        await postDatabase.addRemoveReaction(postEditReact, idPost)

        const output = {
            message
        }
        return output
    }
}
import { BadRequestError } from "../error/BadRequestError"


export interface ReactionPostOutputDTO{
    message:string
}

export class ReactionPostDTO{
    public ReactionPostInputDTO = (like:unknown):boolean=>{
        if(typeof like !== 'boolean'){
            throw new BadRequestError("'like' deve ser um booleano")
        }
        return like
    }
    public ReactionPostOuputDTO = (message:string):ReactionPostOutputDTO=>{
        return{
            message:message
        }
    }
 }
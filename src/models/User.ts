import { Role } from "../types";

export class User{
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:Role,
        private follows:number,
        private followed:number,
        private createAt:string,
        private updateAt:string
    ){}
        public getId():string{return this.id}
        public setId(id:string):void{this.id=id}
        
        public getName():string{return this.name}
        public setName(name:string):void{this.name=name}

        public getEmail():string{return this.email}
        public setEmail(email:string):void{this.email=email}

        public getPassword():string{return this.password}
        public setPassword(password:string):void{this.password=password}

        public getRole():Role{return this.role}
        public setRole(role:Role):void{this.role=role}

        public getFollows():number{return this.follows}
        public setFollows(follows:number):void{this.follows=follows}

        public getFollowed():number{return this.followed}
        public setFollowed(followed:number):void{this.followed=followed}

        public getCreateAt():string{return this.createAt}
        public setCreateAt(createAt:string):void{this.createAt=createAt}

        public getUpdateAt():string{return this.updateAt}
        public setUpdateAt(updateAt:string):void{this.updateAt=updateAt}
}
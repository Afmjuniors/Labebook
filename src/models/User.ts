import { Role } from "../types";

export class User{
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:Role,
        private createAt:string,
        private updateAt:string
    ){}
        public getId():string{return this.id}
        
        public getName():string{return this.name}
        public setName(name:string):void{this.name=name}

        public getEmail():string{return this.email}
        public setEmail(email:string):void{this.email=email}

        public getPassword():string{return this.password}
        public setPassword(password:string):void{this.password=password}

        public getRole():Role{return this.role}
        public setRole(role:Role):void{this.role=role}

        public getCreateAt():string{return this.createAt}

        public getUpdateAt():string{return this.updateAt}
        public setUpdateAt(updateAt:string):void{this.updateAt=updateAt}
}
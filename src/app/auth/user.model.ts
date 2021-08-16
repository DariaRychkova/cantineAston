export class User {
    constructor(
        public email : string,
        public id    : number,
        public token : string,
        public isLunchLady  : boolean
    ) {}
}
import { Quantity } from "./quantity.model";

export class Order {
    constructor(
    public userId: number,
    public constraintId: number,
    public quantity: Quantity[]
    ){}
}
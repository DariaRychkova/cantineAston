export class ExtendedOrder {
  constructor(
    public platId : number,
    public mealQuantity: number,
    public mealId : number,
    public mealLabel : string,
    public mealPrice : number
  ) {}
}
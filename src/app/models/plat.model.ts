import { ElementStandard } from "./element.model";
import { Meal } from "./meal.model";

// A model is a blueprint for the object we create
export class Plat extends ElementStandard{
    constructor(
        public id: number,
        public label: string,
        public status: number,
        public imageId: number,
        public priceDF: number,
        public availableForWeeks: [],
        public meals: Meal[]
      ) {
        super(id, label, status, imageId);
      } 
}
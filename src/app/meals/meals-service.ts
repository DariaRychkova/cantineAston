import { Injectable } from "@angular/core";
import { Meal } from "../models/meal.model";

@Injectable()
export class MealsService {
    private  meals: Meal[] = [];

    getMeals() {
        return this.meals.slice();
    }

    setMeals(meals: Meal[]) {
        this.meals = meals;
    }
}
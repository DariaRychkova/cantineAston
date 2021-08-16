import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Meal } from '../models/meal.model';
import { MealsService } from './meals-service';
import { getNumberOfWeek } from '../shared/functions';

@Injectable({ providedIn: 'root' })
export class MealsStorageService {
  constructor(
    private http: HttpClient,
    private mealService: MealsService,
    // private authService: AuthService
  ) {}

  // GET REQUEST - Fetching Meals
  fetchMeals() {
    const weekNumber = getNumberOfWeek() - 1;
    console.log(weekNumber);
    return this.http
      .get<Meal[]>(
        'http://localhost:8080/lunchtime/meal/findallavailableforweek/' + weekNumber
      )
      .pipe(
        map((meals) => {
          return meals.map((meal) => {
            return {
              ...meal,
              ingredients: meal.ingredients ? meal.ingredients : [], // in case no meals in menu
            };
          });
        }),
        tap((meals) => {
          this.mealService.setMeals(meals);
        })
      );
  }
}

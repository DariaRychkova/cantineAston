import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { MealsService } from '../meals/meals-service';
import { Plat } from '../models/plat.model';
import { PlatsService } from './plats-service';
import { getNumberOfWeek } from '../shared/functions';


@Injectable({ providedIn: 'root' })
export class PlatsStorageService {
  constructor(
    private http: HttpClient,
    private platsService: PlatsService,
    private mealsService: MealsService
    // private authService: AuthService
  ) {}

  // GET REQUEST - Fetching Plats of this week
  // Uses interceptor Service to add auth token
  fetchPlats() {
    const weekNumber = getNumberOfWeek() - 1;
    return this.http
      .get<Plat[]>(
        'http://localhost:8080/lunchtime/menu/findallavailableforweek/' + weekNumber
      )
      .pipe(
        map((plats) => {
          let meals = this.mealsService.getMeals(); // meals available this week
          let modifiedPlats : Plat[] = [];
          for (let plat in plats) {
            if (plats.hasOwnProperty(plat)) {
              modifiedPlats.push(plats[plat]);
            }
          }
          modifiedPlats = modifiedPlats.map((plat) => {
            let mealsPlat = plat.meals ? plat.meals.slice(): []; // meals of one of the plat in plats of this week
            let newMealsarray = mealsPlat.filter((meal) => {
                return meals.some(e => e.id === meal.id); // some => true if in meals there is an e.id = meal.id
            })
            return {
              ...plat,
              meals: newMealsarray ? newMealsarray : [], // in case no meals in menu
            };
          });
          return modifiedPlats
            .filter(plat => plat.meals.length != 0) 
        }),
        tap((plats) => {
          this.platsService.setPlats(plats);
        })
      );
  }
}
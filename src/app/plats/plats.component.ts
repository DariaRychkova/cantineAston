import { Component, OnInit } from '@angular/core';
import { MealsStorageService } from '../meals/meals-storage.service';
import { Meal } from '../models/meal.model';
import { Plat } from '../models/plat.model';
import { PlatsStorageService } from './plats-storage.service';


@Component({
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.css'],
})
export class PlatsComponent implements OnInit {
  plats: Plat[] = [];
  meals: Meal[] = [];
  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];

  constructor(
    private platsStorageService: PlatsStorageService,
    private mealsStorageService: MealsStorageService
  ) {}

  ngOnInit(): void {
    this.mealsStorageService.fetchMeals().subscribe((meals: Meal[]) => {
      this.meals = meals;
    });
    // GET REQUEST : Get plats of this week from API REST
    this.platsStorageService.fetchPlats().subscribe((plats: Plat[]) => {
      // let newPlatsArray: Plat[] = [];
      // for (let plat of plats) {
        
      //   let newMealsArray: Meal[] = [];
      //   for (let meal of plat.meals) {
      //     // Compare each element en this.meals with meal
      //     if (this.meals.some(e => e.id === meal.id )) {
      //       newMealsArray.push(meal);
      //     }
      //   }
      //   plat.meals = newMealsArray;

      //   if (plat.meals.length != 0) {
      //     newPlatsArray.push(plat);
      //   }
      // }
      // this.plats = newPlatsArray;
      
      console.log(plats);
      
      this.plats = plats;
    });
  }



}

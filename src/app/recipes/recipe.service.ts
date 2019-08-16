import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Shnitzel",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_960_720.jpg",
      [(new Ingredient("Meat", 1), new Ingredient("French Fries", 20))]
    ),
    new Recipe(
      "Big Fat Burger",
      "This is simply a test",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/5/0/FNM_060115-Fatbuger-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431449537270.jpeg",
      [
        (new Ingredient("Buns", 2),
        new Ingredient("Meat", 4),
        new Ingredient("Cheese", 8))
      ]
    )
  ];
  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}

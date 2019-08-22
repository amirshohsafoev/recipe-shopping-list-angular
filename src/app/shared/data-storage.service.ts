import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service'
import {Recipe} from '../recipes/recipe.model'
import {map } from 'rxjs/operator'


@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService){}
    
    storeRecipes(){
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://course-project-recipe-bo-42599.firebaseio.com/recipes.json', recipes).subscribe(response=>{
            console.log(response);
        });

    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://course-project-recipe-bo-42599.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
            })
        }))
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes)
        })
    }
}
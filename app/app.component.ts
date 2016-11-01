import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { YummlyGetService } from './yummly-get.service';
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `
  <h1>Yummly API example!</h1>
  <div>
  <h1>Input excluded ingredients below separated by commas!</h1>
  <h3>An example of a valid list of excluded ingredients: chicken, kale, butter</h3>
  <input [(ngModel)]="excludeString">
  <button (click)="getRecipes(createExcludeString(excludeString))">Submit</button>
  </div>
  <ul>
    <li *ngFor="let recipe of recipes"><h3>{{recipe.recipeName}}</h3>
      <p>{{recipe.ingredients}}</p>
    </li>
  </ul>
  `,
  providers: [YummlyGetService]
})

export class AppComponent implements OnInit {
  //initialize some starting variables
  recipes: Object[];
  ingredients = [];
  excludeString = "";

  mode = 'Observable';

  //construct our yummlyGetService so that we can use it in our AppComponent
  constructor(private yummlyGetService: YummlyGetService) {}

  //this method will create and return the string of ingredients to be excluded from our request
  createExcludeString(string: String) {
    let excludes = string.split(',');
    let returnString = "";
    for (var prop in excludes) {
      if(excludes[prop] !== '') {
        var temp = excludes[prop].toLowerCase().trim().replace(' ', '%20');
        returnString = returnString + '&excludedIngredient[]=' + temp;
      }
    }
    return returnString;
  }

  //the getRecipes method is created from our YummlyGetService service
  getRecipes(str: string) {
    //assigns the input string to this.excludeString
    this.excludeString = str;
    //Run the getRecipes method
    this.yummlyGetService.getRecipes(this.excludeString).subscribe(recipes => this.recipes = recipes);

    //reset the form once all the data has been placed in our html file
    this.formReset();
  }

  //resets the exclude string so new options can be selected
  formReset() {
    this.excludeString = "";
  }
  //initially calls getRecipes so that we can populate the page on startup
  ngOnInit() {
    this.getRecipes(this.excludeString);
  }
}

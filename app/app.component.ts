import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { YummlyGetService } from './yummly-get.service';
import './rxjs-operators'

@Component({
  selector: 'my-app',
  template: `
  <h1>Yummly API example!</h1>
  <div>
  <h1>Input excluded ingredients below separated by a comma!</h1>
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
  recipes: Object[];
  ingredients = [];
  excludeString = "";
  mode= 'Observable';

  constructor(private yummlyGetService: YummlyGetService) {}

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
  getRecipes(str: string) {
    this.excludeString = str;
    this.yummlyGetService.getRecipes(this.excludeString).subscribe(recipes => this.recipes = recipes);

    this.formReset();
  }
  formReset() {
    this.excludeString = "";
  }
  ngOnInit() {
    this.getRecipes(this.excludeString);
  }
}

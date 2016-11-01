import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { YummlyGetService } from './yummly-get.service';
import './rxjs-operators'

@Component({
  selector: 'my-app',
  template: `
  <h1>Yummly API example!</h1>
  <h2>{{data}}</h2>
  <input>
  <ul>
    <li *ngFor="let recipe of recipes">{{recipe}}</li>
  </ul>
  `,
  providers: [YummlyGetService]
})

export class AppComponent implements OnInit {
  data = 'here is some stuffs';
  recipes: Object[];
  excludedIngredients = String[];
  mode= 'Observable';

  constructor(private yummlyGetService: YummlyGetService) {}

  getRecipes() {
    this.yummlyGetService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  ngOnInit() {
    this.getRecipes();
  }
}

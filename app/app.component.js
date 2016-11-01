"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var yummly_get_service_1 = require('./yummly-get.service');
require('./rxjs-operators');
var AppComponent = (function () {
    //construct our yummlyGetService so that we can use it in our AppComponent
    function AppComponent(yummlyGetService) {
        this.yummlyGetService = yummlyGetService;
        this.ingredients = [];
        this.excludeString = "";
        this.mode = 'Observable';
    }
    //this method will create and return the string of ingredients to be excluded from our request
    AppComponent.prototype.createExcludeString = function (string) {
        var excludes = string.split(',');
        var returnString = "";
        for (var prop in excludes) {
            if (excludes[prop] !== '') {
                var temp = excludes[prop].toLowerCase().trim().replace(' ', '%20');
                returnString = returnString + '&excludedIngredient[]=' + temp;
            }
        }
        return returnString;
    };
    //the getRecipes method is created from our YummlyGetService service
    AppComponent.prototype.getRecipes = function (str) {
        var _this = this;
        //assigns the input string to this.excludeString
        this.excludeString = str;
        //Run the getRecipes method
        this.yummlyGetService.getRecipes(this.excludeString).subscribe(function (recipes) { return _this.recipes = recipes; });
        //reset the form once all the data has been placed in our html file
        this.formReset();
    };
    //resets the exclude string so new options can be selected
    AppComponent.prototype.formReset = function () {
        this.excludeString = "";
    };
    //initially calls getRecipes so that we can populate the page on startup
    AppComponent.prototype.ngOnInit = function () {
        this.getRecipes(this.excludeString);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <h1>Yummly API example!</h1>\n  <div>\n  <h1>Input excluded ingredients below separated by commas!</h1>\n  <h3>An example of a valid list of excluded ingredients: chicken, kale, butter</h3>\n  <input [(ngModel)]=\"excludeString\">\n  <button (click)=\"getRecipes(createExcludeString(excludeString))\">Submit</button>\n  </div>\n  <ul>\n    <li *ngFor=\"let recipe of recipes\"><h3>{{recipe.recipeName}}</h3>\n      <p>{{recipe.ingredients}}</p>\n    </li>\n  </ul>\n  ",
            providers: [yummly_get_service_1.YummlyGetService]
        }), 
        __metadata('design:paramtypes', [yummly_get_service_1.YummlyGetService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
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
    function AppComponent(yummlyGetService) {
        this.yummlyGetService = yummlyGetService;
        this.data = 'here is some stuffs';
        this.mode = 'Observable';
    }
    AppComponent.prototype.getRecipes = function () {
        var _this = this;
        this.yummlyGetService.getRecipes().subscribe(function (recipes) { return _this.recipes = recipes; });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getRecipes();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <h1>Yummly API example!</h1>\n  <h2>{{data}}</h2>\n  <ul>\n    <li *ngFor=\"let recipe of recipes\">{{recipe}}</li>\n  </ul>\n  ",
            providers: [yummly_get_service_1.YummlyGetService]
        }), 
        __metadata('design:paramtypes', [yummly_get_service_1.YummlyGetService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
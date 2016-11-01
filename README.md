# Yummly API Example

## Introduction

This sample shows how to connect an Angular and typescript app to the Yummly API and returns a list of recipes that do not include the excluded ingredients select by the user.

##Prerequisites
To use the Yummly API sample you will need the following:
* [Node.js/npm](https://nodejs.org/en/download) Node is required to run this sample and to install dependencies, npm (node package manager) will be installed alongside node through the previous link. If you already have them installed, make sure your node version is 4.x.x or greater and your npm version is 3.x.x or greater. You can do so through your terminal with
```
--node version
```
and
```
--npm version
```

* [TypeScript](https://angular.io/docs/ts/latest/quickstart.html) This link includes a fantastic example of how to install and create the bare minimum for a functioning TypeScript application.
Otherwise in your command line type
```
npm install -g typescript
```
It is recommended to start with this example, if you wish to start with the base code and not go through the typescript quickstart, the starting code can be cloned from this [example](https://github.com/ConlanMcNamee/yummly_example/tree/setup).

* [Yummly](https://developer.yummly.com/#the-api): If you want to make calls to the Yummly API on your own you will need your own account [here](https://developer.yummly.com/#the-api), otherwise the url provided in this example will allow proper responses from the Yummly API.

##Building the application
Download or clone the basic setup [here](https://github.com/ConlanMcNamee/yummly_example/tree/setup)

If you would like to see the final product clone from the master branch [above](https://github.com/ConlanMcNamee/yummly_example/tree/master).

Using your selected IDE, open the folder containing the basic setup.

In the command prompt, run these commands in the root directory. The first command will install the dependencies required to run this application. The second command will open an instance of our basic application in your browser through lite-server, which is serving up our index.html file, and monitor it's changes through the TypeScript compiler watch mode.
It will take a few minutes for npm install to finish
```
npm install
npm start
```
So now there should be a virtual server running in our command prompt, if a new page did not open in your browser you can view it by navigating to localhost:3000 in your browser of choice.

#Creating the application
If you cloned the final product you can test in in your web browser.

If you cloned the basic setup below are the steps for making this application.
## Adding files
Open another command prompt without closing the one running our lite-server. You will need need two new files for this application in our app folder.  
1. rxjs-operators.ts
2. yummly-get.service.ts
In a Mac Terminal type
```
touch app/rxjs-operators.ts app/yummly-get.service.ts
```
First thing to note is to stay in the root directory. Secondly touch will create a file if it does not exist and will not overwrite a file is already exists.
In a Windows Terminal, type
```
Create app/rxjs-operators.ts
Create app/yummly-get.service.ts
```
The Windows command is fairly straight forward, it creates the appropriate files.
#Writing and updating files
## Open app/rxjs-operators.ts and paste this code inside of it.
```
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
```
This code makes it easier on you when interacting with an API in angular2

## Open app/app.module.ts and either add the additional code or paste this code in place of the current code.
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```
The differences are the import of the FormsModule from the angular core and the HttpModule and JsonpModule from angular/http. In doing so, make sure they are also declared in your imports array.

## Open the newly created app/yummly-get.service.ts.
At the top import all the necessary modules you will need. It will look like this
```
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
```
  Injectable enables us to use this service elsewhere in our code. Http, Response, Headers, and RequestOptions let us interact with API's and Observable makes handling API responses simpler.

Start by telling angular that this is an injectable service. It should look like this.
```
@Injectable
```

## Write the service class, and initialize it like so
```
export class YummlyGetSerivce {

}
```
  Inside the YummlyGetSerivce class the steps to making this service will be as such

## Create a private variable that contains the url of the API endpoint
```
private url = 'https://api.yummly.com/v1/api/recipes?_app_id=ca33a09c&_app_key=458d12f8aa1a7682b4f947c7375a93dd&q=';
```
  The app id and app key at the end tell the api that we are authorized to makes requests

## Declare an http constructor
```
constructor (private http: Http){}
```

## Add a method to the YummlyGetService class that retrieves recipes from the endpoint after taking a string argument
```
getRecipes(string: String): Observable<Object[]> {
    return this.http.get(this.url + string + '&maxResult=10')
                .map((res: Response) => res.json().matches)
                .catch(this.handleError)
  }
```
  If you would like more information on what Observable is doing, you can go  [here](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md), for now just know it makes the API call much more manageable.

  This method takes the private url, adds on a string that will be passed through it in our app.component.ts file, and at the end concatenates a parameter that will cap our results at 10. The API then returns a large object filled with data in the response, which is then changed to a json object, and shortened to just the array of matches. If you would like to experiment on your own, remove the .matches at the end of the res.json() for the whole json object.

  [Here](https://developer.yummly.com/documentation#Metadata) is more information on all the data sent by the Yummly API

## Add a private method that will handle errors that otherwise might fail silently(not 100% necessary but good practice)

```
private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
```
This was borrowed from the [Angular.io Documentation](https://angular.io/docs/ts/latest/guide/server-communication.html) under the hero.service.ts file provide in the link.

## Open the app/app.component.ts file. At the top of the file import these additional components
```
import { OnInit } from '@angular/core';
import { YummlyGetService } from './yummly-get.service';
import './rxjs-operators';
```
  OnInit lets is populate the page on startup, the yummlyGetService is the service we just created, and ./rxjs-operators is for our api call.

## Modify the @Component so that we can see our data displayed on the page
```
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
```
Notice the change from Single quotation marks '',in the template, to back ticks. This lets us write our template in multiple lines rather than one long line.
Other important steps to note are.

1. [(ngModel)] in the input tag, this is a way to create two way data-binding. When the input is changed by the user the excludeString will also be changed.

2. (click) on the button tag tells angular that when this button is clicked run the expression declared inside the quotation marks "".

3.  \*ngFor tells angular that for every element in the recipes array, which has been declared as recipe, to make another list item with the appropriate information inside. Marked by the {{recipe.recipeName}} and {{recipe.ingredients}}.

4.  Tell angular that in order for this code to work properly it will need the YummlyGetService in the providers array.

##Now, Modify the AppComponent Class. It will need to called differently than in the base example so we can utilize the OnInit component
```
export class AppComponent implements OnInit {

}
```

Inside the AppComponent declare some attributes that will be used in the methods you'll create
```
recipes: Object[];
ingredients = [];
excludeString = "";
```
  The recipes attribute is where our api call will store matches received from Yummly.
  The ingredients attribute will later be replaced by recipes.ingredients in one of our methods
  And the excludeString will be created by the user as they add ingredients they wish to be excluded from the returned recipes.

This next line assists in our api call
```
mode = 'Observable';
```

## Construct the yummlyGetService so that it can be used
```
constructor(private yummlyGetService: YummlyGetService) {}
```

#Create Four Methods inside AppComponent
## First Method createExcludeString
```
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
```
This takes the user input of ingredients they would like excluded, splits it into an array of the choices, and constructs the string based on how Yummly API requires its queries to be made. More information on the format [here](https://developer.yummly.com/documentation#Metadata).

## Second Method getRecipes
```
getRecipes(str: string) {
  //assigns the input string to this.excludeString
  this.excludeString = str;
  //Run the getRecipes method
  this.yummlyGetService.getRecipes(this.excludeString).subscribe(recipes => this.recipes = recipes);

  //reset the form once all the data has been placed in our html file
  this.formReset();
}
```
This is almost the same as the getRecipes from the yummly-get.service file. The extra code tells angular that the parameter string inside getRecipes should be the same as the excludeString and to use the yummlyGetService.getRecipes method and put the results in the previously created recipes array.

## Third Method formReset
```
formReset() {
  this.excludeString = "";
}
```
when the user submits their excluded ingredients, getRecipes is called. At the end of getRecipes this function is used reset the excludeString so that another query can be made

## Fourth Method ngOnInit
```
ngOnInit() {
  this.getRecipes(this.excludeString);
}
```
this tells angular that when the application is initially opened run this.getRecipes() so our page will have some recipes to show.

#Final yummly-get.service.ts file and app.component.ts file
This is how the yummly-get.service.ts file should look once completed.
```
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YummlyGetService {
  private url = 'https://api.yummly.com/v1/api/recipes?_app_id=ca33a09c&_app_key=458d12f8aa1a7682b4f947c7375a93dd&q=';

  constructor (private http: Http){}

  getRecipes(string: String): Observable<Object[]> {
    return this.http.get(this.url + string + '&maxResult=10')
                .map((res: Response) => res.json().matches)
                .catch(this.handleError)
  }

  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
```

And this is how the app.component.ts file should look once completed.
```
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { YummlyGetService } from './yummly-get.service';
import './rxjs-operators';

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

  mode = 'Observable';

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

    //reset the form once all the data has been placed in our html file
    this.formReset();
  }

  formReset() {
    this.excludeString = "";
  }

  ngOnInit() {
    this.getRecipes(this.excludeString);
  }
}
```

#Viewing
Once done the application should still be running in your browser. If not, either type
```
npm start
```
to start the application again
Or refresh localhost:3000 in your browser

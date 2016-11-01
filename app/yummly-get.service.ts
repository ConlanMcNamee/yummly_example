import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';



@Injectable()
export class YummlyGetService {

  private url = 'https://api.yummly.com/v1/api/recipes?_app_id=ca33a09c&_app_key=458d12f8aa1a7682b4f947c7375a93dd&q=&excludedIngredient[]=chicken';

  constructor (private http: Http){}

  getRecipes(): Observable<Object[]> {
    return this.http.get(this.url)
                .map((res: Response) => res.json())
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

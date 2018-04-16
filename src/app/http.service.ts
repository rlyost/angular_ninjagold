import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}

  getActivities(){
    return this._http.get('/gold');
  };
  postActivities(act){
    console.log("in service POST:", act);
    return this._http.post('/gold/new', act);
  };
  resetActivities(){
    console.log("resetActivities FUNCTION");
    return this._http.get('/gold/reset');
  };
}

import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ninja Gold';
  your_gold = 0;
  activities = [];

  constructor(private _httpService: HttpService){}

  getActsFromService(){
    let observable = this._httpService.getActivities()
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.activities = data['data'];
    });
  }

  onButtonClickParam(place: String): void { 
    console.log(place);
    if(place == 'farm'){
      var temp = this.random(2, 30);
      console.log(temp);
      this.your_gold += temp; 
      var temp2 = "Earned " + temp + " golds from the farm!    -" + this.date_time(this, 'medium');
      console.log("temp2: ", temp2);
    } else if(place == 'cave'){
        var temp = this.random(5, 10);
        console.log(temp);
        this.your_gold += temp; 
        var temp2 = "Earned " + temp + " golds from the cave!    -" + this.date_time(this, 'medium');
        console.log("temp2: ", temp2);
    } else if(place == 'house'){
        var temp = this.random(7, 15);
        console.log(temp);
        this.your_gold += temp; 
        var temp2 = "Earned " + temp + " golds from the house!    -" + this.date_time(this, 'medium');
        console.log("temp2: ", temp2);
    } else if(place == 'casino'){
      var temp = this.random(-100, 100);
      this.your_gold += temp;
      if(temp > 0){
        var temp2 = "Earned " + temp + " golds from the casino!   " + this.date_time(this, 'meduim');
      } else {
        var temp2 = "Entered a casino and lost " + -temp + ".....Ouch! " + this.date_time(this, 'meduim');
      };
    };
    var temp3 = {your_gold: this.your_gold, activities: temp2}
    let newAct = this._httpService.postActivities(temp3);
    newAct.subscribe(data => { 
      console.log("New Act!", data);
      this.activities = data['data'].activities;
    }); 
    this.getActsFromService();
  };

  //generate random number
  random(low: number, high: number) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  };

//get current time
  date_time($scope, $filter) {
    var today = new Date();
    console.log(today);
    return today;
    // return $filter('date')(today, 'medium');
  };

  onButtonClick(): void {
    let reset = this._httpService.resetActivities();
    reset.subscribe(data => { 
      console.log("Reset", data);
      this.activities = data['data'].activities;
    }); 
    this.getActsFromService();
  };
};

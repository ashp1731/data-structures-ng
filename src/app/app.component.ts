import { Component } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // data: Observable<DataModel>; 
  title = 'Data Structures Visualization';

  constructor(private http: HttpClient ){
    // this.data = this.http.get<DataModel>(src/assets/data.json);
  }
}
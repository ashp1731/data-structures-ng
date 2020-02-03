import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ArrayList {
  empty : boolean;
  size : number;
  underlyingArrayList : Array<string>
}

@Component({
  selector: 'app-array-list',
  templateUrl: './array-list.component.html',
  styleUrls: ['./array-list.component.css']
})


export class ArrayListComponent implements OnInit {

  arrayList:ArrayList
  inputToAdd:String
  inputToAddValue:String
  inputToAddIndex : String
  inputToDelete:String
  addClicked: boolean = false

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<ArrayList>("http://localhost:8080/arraylist/v1/new-arraylist").subscribe(data => {
      this.arrayList = data;
  })
  }

  add() {
    if(this.inputToAdd.length > 0) {


      console.log(this.inputToAdd + " before ")
      console.log("inArrayList" + this.arrayList)
      this.http.post<ArrayList>("http://localhost:8080/arraylist/v1/add" , {inArrayList:this.arrayList, value : this.inputToAdd}).subscribe(data => {
        this.arrayList = data;
    })
    this.inputToAdd = ''
    this.addClicked = true
    console.log("inArrayList" + this.arrayList)
    }
  }

  addAt() {
    if(this.inputToAddValue.length > 0) {
      console.log(this.inputToAddValue + " before ")
      this.http.post<ArrayList>("http://localhost:8080/arraylist/v1/addAt" , {inArrayList:this.arrayList, value : this.inputToAddValue, index :this.inputToAddIndex}).subscribe(data => {
        this.arrayList = data;
    })
    // this.inputToAddValue = ''
    // this.inputToAddIndex = ''
    }
  }

  delete() {
    console.log(this.inputToDelete + " before ")
    if(this.inputToDelete.length > 0) {
      this.http.post<ArrayList>("http://localhost:8080/arraylist/v1/delete" , {inArrayList:this.arrayList, value : this.inputToDelete}).subscribe(data => {
        this.arrayList = data;
    })
    }
  }

  clear() {
    this.http.get<ArrayList>("http://localhost:8080/arraylist/v1/new-arraylist").subscribe(data => {
      this.arrayList = data;
  })
  }
}

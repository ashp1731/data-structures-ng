
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Stack {
	empty:boolean;
	size:number;
	data:Array<string>;
}

@Component({
  selector: 'app-stackqueue',
  templateUrl: './stackqueue.component.html',
  styleUrls: ['./stackqueue.component.css']
})

export class StackqueueComponent implements OnInit {
	stack:Stack;
	inputToPush:string = "Hello123";
	peekValue : string
	constructor(private http: HttpClient) { }
	ngOnInit() {
		this.http.get<Stack>("http://localhost:8080/stack/v1/new-stack").subscribe(data => {
			this.stack = data;
		})
	}
	
	push () {
		console.log("this.inputToPush = " + this.inputToPush);
		console.log("this.stack = " + this.stack);
		this.http.post<Stack>("http://localhost:8080/stack/v1/push", {inStack:this.stack, inStr:this.inputToPush}).subscribe(data => {
			this.stack = data;
		})
	}
	
		pop () {
		console.log("this.stack =" + this.stack)
		this.http.post<Stack>("http://localhost:8080/stack/v1/pop", this.stack).subscribe(data => {
			this.stack = data;
		})
	}
	
		peek () {
		this.http.post<string>("http://localhost:8080/stack/v1/peek", this.stack).subscribe(data => {
			this.peekValue = data;
		})
	}
}


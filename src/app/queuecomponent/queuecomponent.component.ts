import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Queue {
    empty:boolean;
    size:number;
    data:Array<string>;
}

@Component({
  selector: 'app-queuecomponent',
  templateUrl: './queuecomponent.component.html',
  styleUrls: ['./queuecomponent.component.css']
})
export class QueuecomponentComponent implements OnInit {
    
    queue: Queue
    inputToEnqueue:string = "Hello123"
    peekValue : string
    
  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<Queue>("http://localhost:8080/stack/v1/new-queue").subscribe(data => {
          this.queue = data;
      })
  }

  enqueue () {
      console.log("this.inputToPush = " + this.inputToEnqueue);
      console.log("this.stack = " + this.queue);
      this.http.post<Queue>("http://localhost:8080/stack/v1/push", {inStack:this.queue, inStr:this.inputToEnqueue}).subscribe(data => {
          this.queue = data;
      })
  }
  
  dequeue () {
      console.log("this.stack =" + this.queue)
      this.http.post<Queue>("http://localhost:8080/stack/v1/pop", this.queue).subscribe(data => {
          this.queue = data;
      })
  }
  
      peek () {
      this.http.post<string>("http://localhost:8080/stack/v1/peek", this.queue).subscribe(data => {
          this.peekValue = data;
      })
  }
}

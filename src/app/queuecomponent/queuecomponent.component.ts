import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Queue {
    empty:boolean;
    size:number;
    underlyingData:Array<string>;
}

@Component({
  selector: 'app-queuecomponent',
  templateUrl: './queuecomponent.component.html',
  styleUrls: ['./queuecomponent.component.css']
})
export class QueuecomponentComponent implements OnInit {
    
    queue: Queue
    inputToEnqueue:string
    peekValue : string
    queueEmpty: boolean = false
    dequeueValue : string
    dequeueClicked : boolean = false
    
  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<Queue>("http://localhost:8080/queue/v1/new-queue").subscribe(data => {
          this.queue = data;
      })
  }

  enqueue () {

    this.dequeueClicked = false;
    this.queueEmpty = false;
      if(this.inputToEnqueue.length > 0){
          this.dequeueValue = ''
          this.peekValue = ''
        this.http.post<Queue>("http://localhost:8080/queue/v1/enqueue", {inQueue:this.queue, inStr:this.inputToEnqueue}).subscribe(data => {
            this.queue = data;
        })
        this.inputToEnqueue = ''
      }
    
  }
  
  dequeue () {
      this.peekValue = ''
      if(this.queue.empty){
          this.dequeueValue = ''
          this.queueEmpty = true
      }
      else {
        this.queueEmpty = false
        this.dequeueValue = this.queue.underlyingData[this.queue.underlyingData.length - 1]
        this.dequeueClicked = true
        this.http.post<Queue>("http://localhost:8080/queue/v1/dequeue", this.queue).subscribe(data => {
            this.queue = data;
        })
      }

 
  }
  
      peek () {

        if(this.queueEmpty){
            this.queueEmpty = true
        }
        else {
            this.queueEmpty = false
            this.dequeueClicked = false
            this.http.post("http://localhost:8080/queue/v1/peek", this.queue, {responseType:"text"}).subscribe(data => {
                this.peekValue = data;
            })
        }
 
  }

  clear() {
    
    this.queueEmpty = false
    this.dequeueClicked = false
    this.peekValue = ''
    this.dequeueValue = ''
    this.http.get<Queue>("http://localhost:8080/queue/v1/new-queue").subscribe(data => {
        this.queue = data;
    })
  }
}

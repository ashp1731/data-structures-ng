import { Component, OnInit, RootRenderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { tree, HierarchyNode } from 'd3';


interface LinkedNode {
  element : string;
  children : Array<LinkedNode>;
  next : LinkedNode;
  name: string;
}

interface LinkedList {
  head : LinkedNode;
  size : number;
  tail : LinkedNode;
}

interface treeView {
  name:string;
  parent:string;
  children : treeView[]
}

@Component({
  selector: 'app-linked-list',
  templateUrl: './linked-list.component.html',
  styleUrls: ['./linked-list.component.css']
})
export class LinkedListComponent implements OnInit {

  linkedList : LinkedList = {head:null, size:0, tail:null};
  inputToAdd : string;
  inputToAddValue:String
  inputToAddIndex : String
  inputLastToAddValue : string
  inputToRemoveIndex : string
  inputAddFirst : boolean = false;
  descendentSliced:HierarchyNode<LinkedNode>[] = [];
  descendent:HierarchyNode<LinkedNode>[] = [];

  constructor(private http: HttpClient) { }
 

  ngOnInit() {
    this.http.get<LinkedList>("http://localhost:8080/linkedlist/v1/new-linkedlist").subscribe(data => {
      this.linkedList = data;
      console.log(this.linkedList);
    })
    console.log(this.linkedList);
  }

  clear() {
    this.http.get<LinkedList>("http://localhost:8080/linkedlist/v1/new-linkedlist").subscribe(data => {
      this.linkedList = data;
      console.log(this.linkedList);
  })
  }

  addFirst(){
    this.http.post<LinkedList>("http://localhost:8080/linkedlist/v1/addFirst" , {inLinkedList : this.linkedList, value : this.inputToAdd}).subscribe(data => {
      this.linkedList = data;
      console.log(this.inputToAdd);
      console.log(this.linkedList);
      // this.drawTree();
    })  
    this.inputToAdd = ''
    this.inputAddFirst = true;
    console.log(this.linkedList);
  }    

  addAt(){

    this.http.post<LinkedList>("http://localhost:8080/linkedlist/v1/addAt" , {inLinkedList : this.linkedList, index: this.inputToAddIndex, value : this.inputToAddValue}).subscribe(data => {
    this.linkedList = data;
    console.log(this.inputToAddIndex + " " + this.inputToAddValue);
    console.log(this.linkedList);
    })
    this.inputToAddIndex = ''
    this.inputToAddValue = ''
  }

  addLast(){
    this.http.post<LinkedList>("http://localhost:8080/linkedlist/v1/addLast" , {inLinkedList : this.linkedList, value : this.inputLastToAddValue}).subscribe(data => {
      this.linkedList = data;
      console.log("a-****************************************");
      console.log(this.linkedList);
  })
  this.inputLastToAddValue = ''
  }

  removeFirst(){
    this.http.post<LinkedList>("http://localhost:8080/linkedlist/v1/removeFirst", {inLinkedList : this.linkedList} ).subscribe(data => {
      this.linkedList = data;
      console.log(this.linkedList);
  })
  }
  
  removeAt(){
      this.http.post<LinkedList>("http://localhost:8080/linkedlist/v1/removeAt" , {inLinkedList : this.linkedList, index : this.inputToRemoveIndex}).subscribe(data => {
        this.linkedList = data;
        console.log(this.linkedList);
        this.inputToRemoveIndex = ''
    })
  }

  removeLast(){
    this.http.post<LinkedList>("http://localhost:8080/linkedlist/v1/removeLast", {inLinkedList : this.linkedList} ).subscribe(data => {
      this.linkedList = data;
      console.log(this.linkedList);
  })
  }

  drawTree(){
  }
}

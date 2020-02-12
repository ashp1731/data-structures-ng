import { Component, OnInit, RootRenderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { tree } from 'd3';


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

  linkedList : LinkedList
  inputToAdd : string;
  inputToAddValue:String
  inputToAddIndex : String
  inputLastToAddValue : string
  inputToRemoveIndex : string
  inputAddFirst : boolean = false;

  constructor(private http: HttpClient) { }
 

  ngOnInit() {
    this.http.get<LinkedList>("http://localhost:8080/linkedlist/v1/new-linkedlist").subscribe(data => {
      this.linkedList = data;
      console.log(this.linkedList);
      this.drawTree();
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
      this.drawTree();
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
      console.log(this.inputLastToAddValue);
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
   
    
    // let treedata: treeView;
    // let root: treeView;
    // let layout = d3.tree().size([500,500])(root);
    // let nodes = layout.descendants();
    

    var m = [20, 120, 20, 120],
    w = 1280 - m[1] - m[3],
    h = 800 - m[0] - m[2],
    i = 0;
    var treeLayout = d3.tree();
    treeLayout.size([h, w]);
    var root = d3.hierarchy(this.linkedList.head);
    treeLayout(root);
    
    console.log(root);
    // Nodes
    d3.select('svg g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('cx', function(d) {return d['x'];})
      .attr('cy', function(d) {return d['y'];})
      .attr('r', 4);

    // Links
    d3.select('svg g.links')
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', function(d) {return d.source['x'];})
      .attr('y1', function(d) {return d.source['y'];})
      .attr('x2', function(d) {return d.target['x'];})
      .attr('y2', function(d) {return d.target['y'];});   
      }
}

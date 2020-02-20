import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { tree, HierarchyNode } from 'd3';

interface Node {
  element : string;
  leftNode : Node;
  rightNode : Node;
  children: Node[];
}

interface BinaryTree {
  root : Node
}

interface treeView {
  name:string;
  parent:string;
  children : treeView[]
}

@Component({
  selector: 'app-binarytree',
  templateUrl: './binarytree.component.html',
  styleUrls: ['./binarytree.component.css']
})
export class BinarytreeComponent implements OnInit {

  binaryTree : BinaryTree;
  inputToAdd : string;
  inputToDelete : string;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<BinaryTree>("http://localhost:8080/binarytree/v1/new-binarytree").subscribe(data => {
      this.binaryTree = data;
      console.log("this.binaryTree");
      console.log(this.binaryTree);
    })
  }

  insert(){
    this.http.post<BinaryTree>("http://localhost:8080/binarytree/v1/insert" , {inBinaryTree : this.binaryTree, value: this.inputToAdd}).subscribe(data => {
      this.binaryTree = data;
      console.log(this.inputToAdd);
      console.log(this.binaryTree);
  })
  this.inputToAdd = ''
  
  }

  delete(){
    this.http.post<BinaryTree>("http://localhost:8080/binarytree/v1/delete" , {inBinaryTree : this.binaryTree, value : this.inputToDelete}).subscribe(data => {
      this.binaryTree = data;
      console.log(this.binaryTree);
      this.inputToDelete = ''
  })
  this.inputToDelete = '';
  }

  clear(){
    this.http.get<BinaryTree>("http://localhost:8080/binarytree/v1/new-binarytree").subscribe(data => {
      this.binaryTree = data;
      console.log(this.binaryTree);
    })
  }

}

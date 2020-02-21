import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-tree',
  templateUrl: './d3-tree.component.html',
  styleUrls: ['./d3-tree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class D3TreeComponent implements OnInit {
  @Input() private treeData: any= [];

  height: number;
  width: number;
  margin: any = {top: 20, right: 90, bottom: 30, left: 90};

  svg:any;
  treeLayout: any;
  nodes:any;
  g:any;
  link:any;
  nodeRadius: number =  20;

  constructor(private chartContainer: ElementRef){}

  ngOnInit() {
  }
  
  ngOnChanges(changes: any) {
    console.log(this.treeData);
    console.log(this.chartContainer);
    if (this.svg) {
      this.svg.remove ();
    }
    let element = this.chartContainer.nativeElement;

    this.width  = 1300 - this.margin.left - this.margin.right;
    this.height = 450 - this.margin.top - this.margin.bottom;

//    this.width = element.offsetWidth - this.margin.left - this.margin.right;
//    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr("class", "shadow");
    this.g = this.svg.append("g")
      .attr("transform", "translate("
            + this.margin.left + "," + this.margin.top + ")");
    this.treeLayout = d3.tree()
            .size([this.height, this.width]);
      
    if (this.treeData) {
        this.nodes = d3.hierarchy(this.treeData, d => d.children);
        this.nodes = this.treeLayout(this.nodes);

        this.link = this.g.selectAll(".link")
          .data( this.nodes.descendants().slice(1))
          .enter().append("path")
          .attr("class", "link")
          .style("stroke", "blue")
          .attr("d", d => {
            return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
          });
        
          console.log(this.nodes.descendants());
        var node = this.g.selectAll(".node") // gives all the nodes under 'g' (array of nodes)
        .data(this.nodes.descendants())
        .enter().append("g")  // for every element in data, do whatever comes after .enter
        .attr("class", d => "node " + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

        // adds the circle to the node
        node.append("circle")
          .attr("r", this.nodeRadius)
          .style("stroke", "blue")
          .style("fill", "yellow");
          
        // adds the text to the node
        node.append("text")
          .attr("dy", ".35em")
          .attr("x", d => d.children ? (d.data.value )  : d.data.value )
          .attr("y", d => d.children && d.depth !== 0 ? -(d.data.value + 5) : d)
          .style("text-anchor", d => d.children ? "end" : "start")
          .text(d => d.data.element);  // 
      }
}
}

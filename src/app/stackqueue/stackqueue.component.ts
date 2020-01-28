
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

interface Stack {
    empty:boolean;
    size: number;
    data:Array<string>;
}

@Component( {
    selector: 'app-stackqueue',
    templateUrl: './stackqueue.component.html',
    styleUrls: ['./stackqueue.component.css']
} )

export class StackqueueComponent implements OnInit {
    
    stack: Stack;
    inputToPush: string;
    peekValue: string
    stackEmpty: boolean = false
    popValue : string
    popClicked : boolean = false
    
    constructor( private http: HttpClient ) { }
    ngOnInit() {
        this.http.get<Stack>( "http://localhost:8080/stack/v1/new-stack" ).subscribe( data => {
            this.stack = data;
        } )
    }

    push() {

        this.stackEmpty = false
        this.popClicked = false
        if ( this.inputToPush.length > 0 ) {
            this.peekValue = ''
            this.popValue = ''
            console.log( "this.inputToPush = " + this.inputToPush );
            this.http.post<Stack>( "http://localhost:8080/stack/v1/push", { inStack: this.stack, inStr: this.inputToPush } ).subscribe( data => {
                this.stack = data;
                console.log( this.stack)
                console.log( this.peekValue )
            } )
            this.inputToPush = ''
        }


    }

    pop() {
        this.peekValue = ''
        if ( this.stack.empty ) { 
        	this.popValue = ''
            this.stackEmpty = true	
        }
        else {
            this.stackEmpty = false
            this.popValue = this.stack.data[0]
            this.popClicked = true
            this.http.post<Stack>( "http://localhost:8080/stack/v1/pop", this.stack ).subscribe( data => {
               this.stack = data;
            } )
        }
    }

    peek() {

        if ( this.stack.empty ) {
            this.stackEmpty = true
            
        } else {
            this.stackEmpty = false
            this.popClicked = false
            this.http.post<string>( "http://localhost:8080/stack/v1/peek", this.stack, {responseType:"text" | "json"}).subscribe( peekData => {
                console.log( "*********************************************" )
                console.log( peekData )
                this.peekValue = peekData;
                console.log( this.peekValue )
            } )
        }
    }

    clear() {

        this.stackEmpty = false
        this.popClicked = false
        this.peekValue = ''
        this.popValue = ''
        this.http.get<Stack>( "http://localhost:8080/stack/v1/new-stack" ).subscribe( data => {
            this.stack = data;
        } )
    }
}


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StackqueueComponent } from './stackqueue/stackqueue.component';
import { HttpClientModule } from '@angular/common/http';
import { QueuecomponentComponent } from './queuecomponent/queuecomponent.component';


@NgModule({
  declarations: [
    AppComponent,
    StackqueueComponent,
    QueuecomponentComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
    AppRoutingModule,
	NgbModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DataIntakeComponent } from './data-intake/data-intake.component';
import { ToDoComponent } from './to-do/to-do.component';
import { TodoService } from './to-do/to-do.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DataIntakeComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

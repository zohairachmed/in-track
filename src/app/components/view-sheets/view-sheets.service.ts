import { Injectable } from '@angular/core';

import { ViewSheetsElement } from './view-sheets';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ViewSheetServices {
  pItems: ViewSheetsElement[] = ELEMENT_DATA; 
  dataChange: BehaviorSubject<ViewSheetsElement[]> = new BehaviorSubject<ViewSheetsElement[]>([]);
  get data(): ViewSheetsElement[] { return this.dataChange.value; }


  constructor() { 
   
    this.GetDataforFilterandPagination();
  }

  GetDataforFilterandPagination(){    
  
    this.dataChange.next(this.pItems);
      
  }
  
  getTodosFromData(): ViewSheetsElement[] {
    return this.pItems;
  }
  
  addTodo(todo: ViewSheetsElement) {
    this.pItems.push(todo);
  }
  updateTodo(todo: ViewSheetsElement) {
    const index = this.pItems.map(x => x.Id).indexOf(todo.Id);
    this.pItems[index] = todo;
  }
  deleteTodo(todo: ViewSheetsElement) {        
    const index = this.pItems.findIndex(Items => Items.Id === todo.Id);
    this.pItems.splice(index, 1);
  

    
  }
}
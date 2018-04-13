import { Injectable } from '@angular/core';

import { ViewSheetsElement } from './view-sheets';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';

@Injectable()
export class ViewSheetServices {
  pItems: ViewSheetsElement[] = ELEMENT_DATA;

  constructor() { 
    
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
    this.pItems.splice(this.pItems.indexOf(todo), 1);
  }
}
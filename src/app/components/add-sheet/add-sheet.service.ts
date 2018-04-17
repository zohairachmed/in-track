import { Injectable } from '@angular/core';

import { dataStuct, HandsondataInt } from './add-sheet';
import { dataStucts,Handsondat } from '../../../api/add-sheet-handsontable-data';

@Injectable()
export class AddSheetServices {
  pItems: dataStuct[] = dataStucts;
  

  constructor() { 
    
  }

  getTodosFromData(): dataStuct[] {
    return this.pItems;
  }
  addTodo(todo: dataStuct) {
    this.pItems.push(todo);
  }
  updateTodo(todo: dataStuct) {
    // const index = this.pItems.map(x => x.ID).indexOf(todo.ID);
    // this.pItems[index] = todo;
  }
  deleteTodo(todo: dataStuct) {
    this.pItems.splice(this.pItems.indexOf(todo), 1);
  }
}
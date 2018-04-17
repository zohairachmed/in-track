// import {Injectable} from '@angular/core';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {ViewSheetsElement} from '../components/view-sheets/view-sheets';
// import { ELEMENT_DATA } from '../../api/view-sheet-data';
// // import {HttpClient, HttpErrorResponse} from '@angular/common/http';
// // import { dataStuct, HandsondataInt } from './add-sheet';
// // import { dataStucts,Handsondat } from '../../../api/add-sheet-handsontable-data';

// @Injectable()
// export class DataService {
//  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';
//   pItems: ViewSheetsElement[] = ELEMENT_DATA;
//   dataChange: BehaviorSubject<ViewSheetsElement[]> = new BehaviorSubject<ViewSheetsElement[]>([]);
//   // Temporarily stores data from dialogs
//   dialogData: any;

//   constructor () {}

//   getTodosFromData(): ViewSheetsElement[] {
//     return this.pItems;
//   }
//   addTodo(todo: ViewSheetsElement) {
//     this.pItems.push(todo);
//   }
//   updateTodo(todo: ViewSheetsElement) {
//     const index = this.pItems.map(x => x.Id).indexOf(todo.Id);
//     this.pItems[index] = todo;
//   }
//   deleteTodo(todo: ViewSheetsElement) {    
//     this.pItems.splice(this.pItems.indexOf(todo), 1);
//   }

//   get data(): ViewSheetsElement[] {
//     return this.pItems;
//   }

//   getDialogData() {
//      return this.pItems;
//   }

//   /** CRUD METHODS */
//   getAllIssues():ViewSheetsElement[]  {
//     // this.httpClient.get<ViewSheetsElement[]>(this.API_URL).subscribe(data => {
//     //     this.dataChange.next(data);
//     //   },
//     //   (error: HttpErrorResponse) => {
//     //   console.log (error.name + ' ' + error.message);
//     //   });
//     return this.pItems;
//   }

//   // DEMO ONLY, you can find working methods below
//   addIssue (issue: ViewSheetsElement[]): void {
//     this.pItems = issue;
//   }

//   updateIssue (issue: ViewSheetsElement[]): void {
//     this.pItems = issue;
//   }

//   deleteIssue (issue: ViewSheetsElement[]): void {
//     this.pItems = issue;

//   }
// }



// /* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
//     // ADD, POST METHOD
//     addItem(kanbanItem: KanbanItem): void {
//     this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
//       this.dialogData = kanbanItem;
//       this.toasterService.showToaster('Successfully added', 3000);
//       },
//       (err: HttpErrorResponse) => {
//       this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
//     });
//    }
//     // UPDATE, PUT METHOD
//      updateItem(kanbanItem: KanbanItem): void {
//     this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
//         this.dialogData = kanbanItem;
//         this.toasterService.showToaster('Successfully edited', 3000);
//       },
//       (err: HttpErrorResponse) => {
//         this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
//       }
//     );
//   }
//   // DELETE METHOD
//   deleteItem(id: number): void {
//     this.httpClient.delete(this.API_URL + id).subscribe(data => {
//       console.log(data['']);
//         this.toasterService.showToaster('Successfully deleted', 3000);
//       },
//       (err: HttpErrorResponse) => {
//         this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
//       }
//     );
//   }
// */

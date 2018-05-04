import { dataStuct, HandsondataInt } from './edit-sheet';
import { dataStucts, Handsondat } from '../../../api/add-sheet-handsontable-data';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef, Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import { inject } from '@angular/core/testing';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
//const API_URL = "http://localhost:8049/in-track/v1/sheets/";

const API_URL = environment.api_url;


@Injectable()
export class editSheetService {
  ItemsRaw: any;
  ItemsHandson: any;

  saveMessages: string[] = [];

  constructor(private httpClient: HttpClient) {

  }

  editSheetRaw(id: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + id, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true });

  }

  editSheetHandsOnTable(id: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + id, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true })
  }

  getTodosFromData(): dataStuct[] {
    return this.ItemsRaw;
  }

  updateSheet(todo: any): Observable<any> {
    return this.httpClient.put(API_URL + todo.sheetId, todo, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true })

  }


}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
const API_URL = "http://localhost:8049/in-track/v1/sheets/";

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private httpClient:HttpClient
  ) {}

//   public isAuthenticated(): boolean {

//     const token = localStorage.getItem('token');
//     var authenticatedUser = this.httpClient.get(API_URL + "login", {headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':  'application/json' }
//     , withCredentials: true
//     }).subscribe(result => {
//         if(result !== null && result !=='' && result!== undefined){

//             localStorage.setItem("user", result[0].userName);
//             return true;
       
//         }
//   },
//     (err: HttpErrorResponse) => {
//       console.log(err + " " + err.message)
//     });
//     // Check whether the token is expired and return
//     // true or false
//     return !this.jwtHelper.isTokenExpired(token);
//   }
  login(){   
      this.loggedIn.next(true);  
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
  
   
  }
}
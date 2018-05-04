import { Component,OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from './_models/index';
import { UserService, AuthenticationService } from './_services/index';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  isLoggedIn$: Observable<boolean>; 
                 // {1}

  constructor(private userService: UserService, private router: Router,  private authService: AuthService) { 
   
       this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    //   if( this.currentUser.firstName !== null){  
    //   this.authenticationServices.login(this.currentUser.username, this.currentUser.password);
    // }else{
    
    // }
   
    
  }

  ngOnInit() {    
    this.isLoggedIn$ = this.authService.isLoggedIn; 
  }

  onLogout(){
    this.authService.logout();     
    this.router.navigate(['/login']);
   
                     // {3}
  }
}

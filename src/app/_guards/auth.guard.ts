import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class AuthGuard implements CanActivate {
    isLoggedIn$: Observable<boolean>; 

    constructor(private router: Router,private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.authService.login();
            this.isLoggedIn$ = this.authService.isLoggedIn; 
            return true;
            
            
        }

        // not logged in so redirect to login page with the return url
        this.authService.logout();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
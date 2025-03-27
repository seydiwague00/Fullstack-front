import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public username: any;
  public roles:any;
  public isAuthenticated: boolean = false;

  constructor(private router: Router) { }

  public login(username: string, password: string) {
    if (username == "admin" && password=="1234") {
      this.username = username;
      this.roles = ["ADMIN"];
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.username = undefined;
    this.roles = undefined;
    this.isAuthenticated = false;
    this.router.navigate(['login']);

  }
}

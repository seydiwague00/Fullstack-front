import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public username: any;
  public roles: any;
  public isAuthenticated: boolean = false;

  accessToken!: string;

  private apiUrl = 'http://localhost:8095/auth/login';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    let params = new HttpParams()
      .set('username', username).set('password', password);
    return this.http.post(`${this.apiUrl}`, params, options);
  }

  logout() {
    this.username = undefined;
    this.roles = undefined;
    this.isAuthenticated = false;
    this.accessToken = "";
    this.router.navigate(['login']);

  }

  loadProfile(result: any) {
    this.isAuthenticated = true;
    this.accessToken = result['access_token'];

    let decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
  }
}

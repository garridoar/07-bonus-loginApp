import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyALGN3TgtUUzRO-iaTc93mLbybDuO1__rY';

  userToken: string;

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString() );  // Registra cuándo expira

  }

  private leerToken() {

    if( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    }
    else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if( this.userToken.length < 2 ) {
      return false;
    }

    
    
    return this.userToken.length > 2;
  
  }

}

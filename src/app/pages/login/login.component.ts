import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login( form: NgForm ) {

    if(!form.valid) {
      return;
    }
    
    this.auth.login( this.usuario )
        .subscribe( (resp) => {
          console.log(resp);
        }, (err) => {
          console.log(err.error.error.message);
        });
    
   
  }

}

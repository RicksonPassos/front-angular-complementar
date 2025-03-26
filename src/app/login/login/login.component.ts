
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  tituloLogin = 'Login do Sistema';
  
  constructor(private fb: FormBuilder, private loginService: LoginService) { }
  
  /*Pegando dados do formulario*/
  loginForm = this.fb.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

  /*Transformando em objeto*/
  loginObj(): Usuario {
    return {
      email: this.loginForm.get('email')?.value!,
      senha: this.loginForm.get('senha')?.value!
    };
  }

  fazerLogin() {
    const usuario = this.loginObj();
    this.loginService.logar(usuario);
  }

}

import { Usuario } from '../model/usuario';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private urlApi = environment.urlApiLocal + "auth/login";
    constructor(private https: HttpClient, private router: Router) { }

    logar(Usuario: Usuario) {
        return this.https.post<String>(this.urlApi, Usuario).subscribe({
            next: (res) => {
                
                var respJson = JSON.stringify(res);
                var jwt = JSON.parse(respJson);
                localStorage.setItem('token', jwt.token);

                this.router.navigate(['/home']);
                
            },
            error: (err) => {
                console.error(err);
                alert(err.error.message)
            }
        });
    }

    usuarioLogado(){
        var token = localStorage.getItem('token');
        
        return token !== null && token !== '' && token !== undefined;
    }

    deslogar(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    
}
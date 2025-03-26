import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Curso } from '../model/curso';
import { Observable } from 'rxjs';
import { Paginacao } from '../components/professor/Paginacao';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
    private urlApi = environment.urlApiLocal + "curso";
    constructor(private http: HttpClient) {}

  listarCursos(page: number = 1, pageSize: number = 10): Observable<Paginacao<Curso>> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<Paginacao<Curso>>(this.urlApi, { params });
  }

  salvarCurso(curso: Curso): Observable<any> {
    return this.http.post(this.urlApi, curso);
  }

  atualizarCurso(curso: Curso): Observable<void> {
    const url = `${this.urlApi}/${curso.id}`;
    return this.http.put<void>(url, curso);
  }

  deletarCurso(id: number): Observable<void> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<void>(url);
  }
}

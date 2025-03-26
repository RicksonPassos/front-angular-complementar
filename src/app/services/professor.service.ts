import { Professor } from './../model/professor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Paginacao } from '../components/professor/Paginacao';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private urlApi = environment.urlApiLocal + "professor";
  constructor(private https: HttpClient, private nouter: Router) { }

  salvarProfessorCadastro(professor : Professor) {
    return this.https.post<string>(this.urlApi, professor);
  }

  listarProfessores(page: number = 1, pageSize: number = 10) {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };

    return this.https.get<Paginacao<Professor>>(this.urlApi, { params });
  }

  atualizarProfessor(professor: Professor) {
    const url = this.urlApi + "/" + professor.id;
    return this.https.put<void>(url, professor);
  }

  deletarProfessor(id: number) {
    const url = `${this.urlApi}/${id}`;
    return this.https.delete<void>(url);
  }
}

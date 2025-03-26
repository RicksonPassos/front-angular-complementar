import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Professor } from 'src/app/model/professor';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit{

  lista = new Array<Professor>();
  professores: Professor[] = [];
  paginaAtual = 1;
  tamanhoPagina = 10;
  professorEditando: Professor | null = null;


  constructor(private fb: FormBuilder, private professorService: ProfessorService){}

  ngOnInit(): void {
    this.listarProfessores();
  }

  listarProfessores() {
    this.professorService.listarProfessores(this.paginaAtual, this.tamanhoPagina)
      .subscribe({
        next: (res) => {
          this.professores = res.items;
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao carregar professores');
        }
      });
  }

  professorForm = this.fb.group({
    nome: [null as string | null, Validators.required],
    email: [null as string | null, Validators.required],
    especialidade: [null as string | null, Validators.required]
  });

  professorObjeto(): Professor {
    console.info('chamou');
    return {
      nome: this.professorForm.get('nome')?.value!,
      email: this.professorForm.get('email')?.value!,
      especialidade: this.professorForm.get('especialidade')?.value!
    }
  }

  salvarProfessor() {
    const professor = this.professorObjeto();
  
    if (this.professorEditando) {
      // Edição
      professor.id = this.professorEditando.id;
  
      this.professorService.atualizarProfessor(professor).subscribe({
        next: () => {
          alert('Professor atualizado com sucesso');
          this.professorForm.reset();
          this.professorEditando = null;
          this.listarProfessores();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar professor');
        }
      });
    } else {
      // Criação
      this.professorService.salvarProfessorCadastro(professor).subscribe({
        next: () => {
          alert('Professor cadastrado com sucesso');
          this.professorForm.reset();
          this.listarProfessores();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar professor');
        }
      });
    }
  }

  deletarProfessor(id: number) {
    if (confirm('Tem certeza que deseja excluir este professor?')) {
      this.professorService.deletarProfessor(id).subscribe({
        next: () => {
          alert('Professor excluído com sucesso');
          this.listarProfessores();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir professor');
        }
      });
    }
  }

  // salvarProfessor() {
  //   const professor = this.professorObjeto();
  //   console.info(professor);

  //   this.professorService.salvarProfessorCadastro(professor);
  //   this.professorForm.reset();            
  //     this.listarProfessores();    
    
  // }

  editarProfessor(professor: Professor) {
    this.professorEditando = professor;
    this.professorForm.patchValue({
      nome: professor.nome,
      email: professor.email,
      especialidade: professor.especialidade
    });
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.listarProfessores();
    }
  }
  
  proximaPagina() {
    this.paginaAtual++;
    this.listarProfessores();
  }

}

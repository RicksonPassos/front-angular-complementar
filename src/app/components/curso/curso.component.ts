import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Curso } from 'src/app/model/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  professores: any[] = [];
  cursoEditando: Curso | null = null;
  paginaAtual = 1;
  tamanhoPagina = 10;

  cursoForm = this.fb.group({
    name: [null as string | null, Validators.required],
    category: [null as string | null, Validators.required],
    description: [null as string | null, Validators.required],
    professorId: [null as number | null, Validators.required]
  });

  constructor(private fb: FormBuilder, private cursoService: CursoService, private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.listarCursos();
    this.carregarProfessores();
  }

  carregarProfessores() {
    this.professorService.listarProfessores(1, 100).subscribe({
      next: (res) => this.professores = res.items,
      error: (err) => alert('Erro ao carregar professores')
    });
  }

  listarCursos() {
    this.cursoService.listarCursos(this.paginaAtual, this.tamanhoPagina).subscribe({
      next: (res) => this.cursos = res.items,
      error: (err) => alert('Erro ao carregar cursos')
    });
  }

  salvarCurso() {
    const curso = this.cursoForm.value as Curso;
  
    // Se estiver em modo de edição
    if (this.cursoEditando && this.cursoEditando.id) {
      curso.id = this.cursoEditando.id;
  
      this.cursoService.atualizarCurso(curso).subscribe({
        next: () => {
          alert('Curso atualizado');
          this.resetarForm();
          this.listarCursos();
        },
        error: (err) => {
          console.error('Erro na atualização:', err);
          alert('Erro ao atualizar curso');
        }
      });
    } else {
      // Novo curso
      this.cursoService.salvarCurso(curso).subscribe({
        next: () => {
          alert('Curso cadastrado');
          this.resetarForm();
          this.listarCursos();
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          alert('Erro ao cadastrar curso');
        }
      });
    }
  }

  editarCurso(curso: Curso) {
    this.cursoEditando = curso;
  
    this.cursoForm.patchValue({
      name: curso.name,
      category: curso.category,
      description: curso.description,
      professorId: curso.professorId
    });
  }

  alternarStatusCurso(curso: Curso) {
    this.cursoService.ativarOuDesativarCurso(curso.id!).subscribe({
      next: () => {
        alert(`Curso ${curso.active ? 'desativado' : 'ativado'} com sucesso.`);
        this.listarCursos();
      },
      error: () => alert('Erro ao alterar status do curso.')
    });
  }
  

  cancelarEdicao() {
    this.cursoEditando = null;
    this.cursoForm.reset({
      professorId: null
    });
  }

  resetarForm() {
    this.cursoEditando = null;
    this.cursoForm.reset({
      professorId: null
    });
  }
}
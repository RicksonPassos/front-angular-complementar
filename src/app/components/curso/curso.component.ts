import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Curso } from 'src/app/model/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  cursoEditando: Curso | null = null;
  paginaAtual = 1;
  tamanhoPagina = 10;

  cursoForm = this.fb.group({
    name: [null as string | null, Validators.required],
    category: [null as string | null, Validators.required],
    description: [null as string | null, Validators.required],
  });

  constructor(private fb: FormBuilder, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.listarCursos(this.paginaAtual, this.tamanhoPagina).subscribe({
      next: (res) => this.cursos = res.items,
      error: (err) => alert('Erro ao carregar cursos')
    });
  }

  salvarCurso() {
    const curso = this.cursoForm.value as Curso;
    console.log('Dados enviados:', curso); // 👈 Isso mostra exatamente o payload
  
    this.cursoService.salvarCurso(curso).subscribe({
      next: () => {
        alert('Curso cadastrado');
        this.resetarForm();
        this.listarCursos();
      },
      error: (err) => {
        console.error('Erro no cadastro:', err); // 👈 Log completo do erro
        alert('Erro ao cadastrar curso');
      }
    });
  }

  editarCurso(curso: Curso) {
    this.cursoEditando = curso;
  
    this.cursoForm.patchValue({
      name: curso.name,
      category: curso.category,
      description: curso.description
    });
  }

  deletarCurso(id: number) {
    if (confirm('Deseja excluir este curso?')) {
      this.cursoService.deletarCurso(id).subscribe(() => {
        alert('Curso excluído');
        this.listarCursos();
      });
    }
  }

  cancelarEdicao() {
    this.cursoEditando = null;
    this.cursoForm.reset();
  }

  resetarForm() {
    this.cursoEditando = null;
    this.cursoForm.reset();
  }
}
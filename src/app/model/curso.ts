import { Professor } from "./professor";

export interface Curso {
    id?: number;
    name: string;
    category: string;
    description: string;
    professor?: Professor;
    professorId?: number;
    alunos?: { nome: string }[]; 
    active?: boolean;
  }
  
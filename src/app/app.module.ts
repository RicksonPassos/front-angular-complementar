import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorProjetoInterceptor } from './interceptor/interceptor-projeto.interceptor';
import { HomeComponent } from './home/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { guardiaoGuard } from './guard/guardiao.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { CursoComponent } from './components/curso/curso.component';

export const appRoutes : Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[guardiaoGuard]},
  {path: 'professor', component: ProfessorComponent, canActivate:[guardiaoGuard]},
  {path: 'curso', component: CursoComponent, canActivate:[guardiaoGuard]}

];

export const routes = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfessorComponent,
    CursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routes
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorProjetoInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

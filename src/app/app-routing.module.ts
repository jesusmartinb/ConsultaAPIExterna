import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizaUsuarioComponent } from './components/actualiza-usuario/actualiza-usuario.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaUsuariosComponent },
  { path: 'user/:id', component: UsuarioComponent },
  { path: 'newuser', component: NuevoUsuarioComponent },
  { path: 'updateuser/:id', component: ActualizaUsuarioComponent },
  { path: '**', component: ListaUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

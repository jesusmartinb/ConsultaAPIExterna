import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizaUsuarioComponent } from './components/actualiza-usuario/actualiza-usuario.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaUsuariosComponent },
  { path: 'user/:iduser', component: DetalleUsuarioComponent },
  { path: 'newuser', component: NuevoUsuarioComponent },
  { path: 'updateuser/:iduser', component: ActualizaUsuarioComponent },
  { path: '**', component: ListaUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common'
// import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  arrUsuarios: Usuario[] = [];

  page: number = 1;
  total_pages: number = 2;

  loading: boolean;
  paginaProxima: boolean;
  paginaPrevia: boolean;

  constructor(
    private usuariosService: UsuariosService,
    // private router: Router,
    private scroller: ViewportScroller
    ) {
      this.loading = true;
      this.paginaProxima = false;
      this.paginaPrevia = false;
     }

  ngOnInit(): void {

    setTimeout(() => {
      this.obtenerUsuariosPorPagina();
    }, 1000)

  }

  obtenerUsuariosPorPagina() {
    this.usuariosService.getUsersByPage(this.page, this.total_pages).subscribe(data => {
      this.arrUsuarios = data.results;
      this.loading = false;
      this.paginaPrevia = true;
      this.paginaProxima = true;
    });
  }

  nextPage() {
    this.page += 1;
    this.loading = true;
    this.paginaProxima = false;
    this.paginaPrevia = false;
    setTimeout(() => {
      this.obtenerUsuariosPorPagina();
    }, 1000)
  }

  previousPage() {
    this.page -= 1;
    this.loading = true;
    this.paginaPrevia = false;
    this.paginaProxima = false;
    setTimeout(() => {
      this.obtenerUsuariosPorPagina();
    }, 1000)
  }

  goStart() {
    // setTimeout(() => {
    //   this.router.navigate([], { fragment: "inicio"}); Valido para entorno de producción
    // }, 1300);
    setTimeout(() => {
      this.scroller.scrollToAnchor('inicio');
    }, 1300)
  }

}

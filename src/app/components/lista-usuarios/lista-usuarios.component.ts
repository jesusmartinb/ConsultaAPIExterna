import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common'
// import { Router } from '@angular/router'; Para entorno producción
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
  limit: number = 10;
  offset: number = 0;

  loading: boolean;
  paginaProxima: boolean;
  paginaPrevia: boolean;

  constructor(
    private usuariosService: UsuariosService,
    // private router: Router, Para entorno producción
    private scroller: ViewportScroller
    ) {
      this.loading = true;
      this.paginaProxima = false;
      this.paginaPrevia = false;
     }

  ngOnInit(): void {

    setTimeout(() => {
      this.obtenerUsuariosPorPagina();
    }, 2000)

  }

  obtenerUsuariosPorPagina() {
    this.usuariosService.getUsersByPage(this.page, this.total_pages, this.limit, this.offset).subscribe(data => {
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
    }, 2000)
  }

  previousPage() {
    this.page -= 1;
    this.loading = true;
    this.paginaPrevia = false;
    this.paginaProxima = false;
    setTimeout(() => {
      this.obtenerUsuariosPorPagina();
    }, 2000)
  }

  goStart() {
    // setTimeout(() => {
    //   this.router.navigate([], { fragment: "inicio"}); Valido para entorno de producción
    // }, 300);
    this.scroller.scrollToAnchor('inicio');
  }

}

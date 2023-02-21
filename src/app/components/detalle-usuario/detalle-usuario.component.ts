import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  id: string = '';
  usuario: Usuario | any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
    ) {

  }

  ngOnInit(): void {
    // Observable
    this.activatedRoute.params.subscribe(params => {
      // console.log(params['iduser']);
      this.id = params['iduser'];
      this.usuariosService.getUserById(this.id).subscribe(data => {
        this.usuario = data;
      })
    })

  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

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

  delete(id: string | undefined): void {
    Swal.fire({
      title: 'Esta usted seguro',
      text: "No podra revertir el resultado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        const miObservable = {
          next: (response: Usuario) => {
            if(response) {
              console.log(response);

            }
          },
          error: (error: any) => {
            console.log(error);
          }
        };

        if(id) {
          this.usuariosService.deleteUser(id).subscribe(miObservable);
        }

        Swal.fire(
          'Eliminado!',
          'El Usuario ha sido borrado.',
          'success'
        )
      }
    });
  }


}

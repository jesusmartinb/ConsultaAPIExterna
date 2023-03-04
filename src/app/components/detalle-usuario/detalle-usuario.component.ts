import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private usuariosService: UsuariosService,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    // Observable
    this.activatedRoute.params.subscribe(params => {
      // console.log(params['iduser']);
      this.id = params['iduser'];
      const miObservable = {
        next: (response: Usuario) => {
          if(response) {
            this.usuario = response;
            console.log(response);
          }
        },
        error: (error: any) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario que intentas acceder no existe'
          })
        }
      };
      if(this.id) {
        this.usuariosService.getUserById(this.id).subscribe(miObservable);
      }
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
              Swal.fire({
                title: 'Eliminado!',
                html: `<p>El siguiente Usuario ha sido borrado:<p>
                        <p>id: ${response._id}</p>
                        <p>Nombre: ${response.first_name}</p>
                        <p>Apellido: ${response.last_name}</p>
                        <p>Apodo: ${response.username}</p>
                        <p>Email: ${response.email}</p>
                        <p>Imagen: ${response.image}</p>
                        `,
                icon: 'success'
              })
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El usuario que intentas borrar no existe'
            })
          }
        };

        if(id) {
          this.usuariosService.deleteUser(id).subscribe(miObservable);
        }
        this.router.navigate(['/home']);
      }
    });
  }


}

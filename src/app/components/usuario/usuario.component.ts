import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  @Input() miUsuario: Usuario | any;

  constructor(
    private usuariosService: UsuariosService,
    private router : Router
    ) {}

  ngOnInit(): void {
    // console.log(this.miUsuario);
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

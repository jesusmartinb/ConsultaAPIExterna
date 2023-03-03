import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private usuariosService: UsuariosService) {}

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

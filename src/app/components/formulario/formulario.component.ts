import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  id: string = '';
  usuario: Usuario | any = {};

  @Input() newUsuario: boolean | any;

  formModel: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {

    this.formModel = new FormGroup({
      first_name: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl("",[
        Validators.required
      ]),
      username: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("",[
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      image: new FormControl("",[
        Validators.required,
        Validators.pattern(/((ht|f)tp(s?))(:((\/\/)(?!\/)))(((w){3}\.)?)([a-zA-Z0-9\-_]+(\.(com|edu|gov|int|mil|net|org|biz|info|name|pro|museum|es|dev|co\.uk)))(\/(?!\/))(([a-zA-Z0-9\-_\/]*)?)([a-zA-Z0-9])+\.((jpg|jpeg|gif|png)(?!(\w|\W)))/)
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.pattern(/^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/)
      ]),
      repetirpassword: new FormControl("",[
        Validators.required
      ])
    },[
      this.checkPassword
    ]);

  }

  ngOnInit(): void {
    if(!this.newUsuario)  {
      this.activatedRoute.params.subscribe(params => {
        // console.log(params['iduser']);
        this.id = params['iduser'];
        const miObservable = {
          next: (response: Usuario) => {
            if(response) {
              this.usuario = response;
              console.log(response);
              this.formModel = new FormGroup({
                first_name: new FormControl(this.usuario.first_name,[
                  Validators.required,
                  Validators.minLength(3)
                ]),
                last_name: new FormControl(this.usuario.last_name,[
                  Validators.required
                ]),
                username: new FormControl(this.usuario.username,[
                  Validators.required,
                  Validators.minLength(3)
                ]),
                email: new FormControl(this.usuario.email,[
                  Validators.required
                ]),
                image: new FormControl(this.usuario.image,[
                  Validators.required
                ]),
                password: new FormControl(this.usuario.password,[
                  Validators.required,
                  Validators.minLength(8)
                ]),
                repetirpassword: new FormControl(this.usuario.password,[
                  Validators.required
                ])
              },[
                this.checkPassword
              ]);
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El usuario que intentas actualizar no existe'
            })
          }
        };
        if(this.id) {
          this.usuariosService.getUserById(this.id).subscribe(miObservable)
        }
      })
    }
  }

  getDataForm() {

    if(this.newUsuario){

      let nuevoUsuario: Usuario = this.formModel.value;

      // console.log(nuevoUsuario);

      this.usuariosService.createNewUser(nuevoUsuario).subscribe(data => {
        let dataResponseCreate = data;
        console.log(dataResponseCreate);
        Swal.fire({
          title: 'Usuario registrado con el id ' + dataResponseCreate.id,
          html: `
          <p>Nombre: ${dataResponseCreate.first_name}</p>
          <p>Apellido: ${dataResponseCreate.last_name}</p>
          <p>Apodo: ${dataResponseCreate.username}</p>
          <p>Email: ${dataResponseCreate.email}</p>
          <p>Imagen: ${dataResponseCreate.image}</p>
          `
        });
      });

      this.formModel.reset();
    } else {
      let usuarioActualizado: Usuario = this.formModel.value;

      // console.log(usuarioActualizado);

      this.activatedRoute.params.subscribe(params => {
       // console.log(params['iduser']);
        this.id = params['iduser'];
        const miObservable = {
          next: (response: Usuario) => {
            if(response) {
              const dataResponseUpdate = response;
              console.log(dataResponseUpdate);
              Swal.fire({
                title: `Se ha actualizado el usuario con la siguiente informaci??n:`,
                html: `
                  <p>Nombre: ${dataResponseUpdate.first_name}</p>
                  <p>Apellidos: ${dataResponseUpdate.last_name}</p>
                  <p>Apodo: ${dataResponseUpdate.username}</p>
                  <p>Email: ${dataResponseUpdate.email}</p>
                  <p>Url imagen: ${dataResponseUpdate.image}</p>
                  `,
                icon: 'success'
                });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El usuario que intentas editar no existe'
            })
          }
        };
        if(this.id) {
          this.usuariosService.updateUser(this.id, usuarioActualizado).subscribe(miObservable);
        }
      })
      this.formModel.reset();
      this.router.navigate(['/home']);
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.formModel.get(pControlName)?.hasError(pError) && this.formModel.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  checkPassword(pFormValue: AbstractControl) {

    const password: string = pFormValue.get('password')?.value;
    const repitePassword: string = pFormValue.get('repetirpassword')?.value;

    if(password !== repitePassword) {
      return { 'checkpassword': true }
    }
    return null;
  }
}

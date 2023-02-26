import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() newUsuario: boolean | any;

  formModel: FormGroup;

  constructor(private usuariosService: UsuariosService) {
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

  }

  getDataForm() {

    if(this.newUsuario){

      let nuevoUsuario: Usuario = this.formModel.value;

      console.log(nuevoUsuario);

      this.usuariosService.createNewUser(nuevoUsuario).subscribe(data => {
        console.log(data);
      });
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

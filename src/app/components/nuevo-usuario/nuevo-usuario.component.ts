import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {

  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      first_name: new FormControl("",[]),
      last_name: new FormControl("",[]),
      username: new FormControl("",[]),
      email: new FormControl("",[]),
      image: new FormControl("",[]),
      password: new FormControl("",[]),
      repetirpassword: new FormControl("",[])
    },[]);

  }

  getDataForm() {
    console.log(this.formModel.value);
  }
}

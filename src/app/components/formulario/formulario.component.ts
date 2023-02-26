import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      first_name: new FormControl("",[
        Validators.required
      ]),
      last_name: new FormControl("",[
        Validators.required
      ]),
      username: new FormControl("",[
        Validators.required
      ]),
      email: new FormControl("",[
        Validators.required
      ]),
      image: new FormControl("",[
        Validators.required
      ]),
      password: new FormControl("",[
        Validators.required
      ]),
      repetirpassword: new FormControl("",[
        Validators.required
      ])
    },[]);

  }

  getDataForm() {
    console.log(this.formModel.value);
  }
}

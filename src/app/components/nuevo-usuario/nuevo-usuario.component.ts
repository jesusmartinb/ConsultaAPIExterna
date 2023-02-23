import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {

  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({},[]);

  }

  getDataForm() {
    console.log(this.formModel.value);
  }
}

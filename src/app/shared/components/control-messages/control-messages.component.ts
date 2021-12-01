import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorsExtend } from '@app/shared/validators/validators-extend';
ValidatorsExtend

@Component({
  selector: 'control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent {

  @Input() control: FormControl;
  @Input() notContainer = false;
    constructor() {}

    get errorMessage() {
      for (const propertyName in this.control.errors) {
          if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
              return ValidatorsExtend.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
          }
      }
      return null;
    }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedConstants } from '@app/shared/shared.constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view-img',
  templateUrl: './modal-view-img.component.html',
  styleUrls: ['./modal-view-img.component.css']
})
export class ModalViewImgComponent {
  @Input() name;
  isDisabled = true;
  formConfirm: FormGroup;
  ICON_ARROW_BUTTON = SharedConstants.ICONS.ICON_ARROW_BUTTON;
  urlImagen: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    public _fb: FormBuilder
  ) {
  }
  

  closeModal(): any {
    this.activeModal.close('Close click');
  }

}
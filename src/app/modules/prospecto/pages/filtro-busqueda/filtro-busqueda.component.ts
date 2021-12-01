import { Component, OnInit } from '@angular/core';
import { AdminProspectoFormService } from '../../services/admin-prospecto-form.service';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.css']
})
export class FiltroBusquedaComponent implements OnInit {

  constructor(
    public adminProspectoForm: AdminProspectoFormService
  ) {
    this.adminProspectoForm.initForm();
  }

  ngOnInit(): void {
  }

}

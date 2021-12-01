import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepFourComponent } from './components/step-four/step-four.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { RegistroProspectoComponent } from './pages/registro-prospecto/registro-prospecto.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroProspectoComponent,
    children: [
      {
        path:'',
        redirectTo: '1'
      },
      {
        path:'1',
        component: StepOneComponent
      },
      {
        path: '2',
        component: StepTwoComponent
      },
      {
        path:'3',
        component: StepThreeComponent
      },
      {
        path: '4',
        component: StepFourComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }

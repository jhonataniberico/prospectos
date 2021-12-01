import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProspectoComponent } from './registro-prospecto.component';

describe('RegistroProspectoComponent', () => {
  let component: RegistroProspectoComponent;
  let fixture: ComponentFixture<RegistroProspectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProspectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaUnidadCentroComponent } from './ficha-unidad-centro.component';

describe('FichaUnidadCentroComponent', () => {
  let component: FichaUnidadCentroComponent;
  let fixture: ComponentFixture<FichaUnidadCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaUnidadCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaUnidadCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

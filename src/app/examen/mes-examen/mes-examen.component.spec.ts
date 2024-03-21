import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesExamenComponent } from './mes-examen.component';

describe('MesExamenComponent', () => {
  let component: MesExamenComponent;
  let fixture: ComponentFixture<MesExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

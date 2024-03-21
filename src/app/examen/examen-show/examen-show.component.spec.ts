import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenShowComponent } from './examen-show.component';

describe('ExamenShowComponent', () => {
  let component: ExamenShowComponent;
  let fixture: ComponentFixture<ExamenShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

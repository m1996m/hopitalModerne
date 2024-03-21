import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenIndexComponent } from './examen-index.component';

describe('ExamenIndexComponent', () => {
  let component: ExamenIndexComponent;
  let fixture: ComponentFixture<ExamenIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEditeComponent } from './consultation-edite.component';

describe('ConsultationEditeComponent', () => {
  let component: ConsultationEditeComponent;
  let fixture: ComponentFixture<ConsultationEditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationEditeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

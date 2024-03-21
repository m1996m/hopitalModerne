import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationIndexComponent } from './consultation-index.component';

describe('ConsultationIndexComponent', () => {
  let component: ConsultationIndexComponent;
  let fixture: ComponentFixture<ConsultationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

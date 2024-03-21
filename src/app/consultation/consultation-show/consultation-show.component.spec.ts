import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationShowComponent } from './consultation-show.component';

describe('ConsultationShowComponent', () => {
  let component: ConsultationShowComponent;
  let fixture: ComponentFixture<ConsultationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

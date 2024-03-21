import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelNavComponent } from './personnel-nav.component';

describe('PersonnelNavComponent', () => {
  let component: PersonnelNavComponent;
  let fixture: ComponentFixture<PersonnelNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

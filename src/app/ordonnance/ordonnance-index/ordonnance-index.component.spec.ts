import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceIndexComponent } from './ordonnance-index.component';

describe('OrdonnanceIndexComponent', () => {
  let component: OrdonnanceIndexComponent;
  let fixture: ComponentFixture<OrdonnanceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnanceIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceShowComponent } from './ordonnance-show.component';

describe('OrdonnanceShowComponent', () => {
  let component: OrdonnanceShowComponent;
  let fixture: ComponentFixture<OrdonnanceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnanceShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

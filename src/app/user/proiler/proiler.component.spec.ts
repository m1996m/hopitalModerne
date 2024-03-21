import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProilerComponent } from './proiler.component';

describe('ProilerComponent', () => {
  let component: ProilerComponent;
  let fixture: ComponentFixture<ProilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleDetailsComponent } from './bicycle-details.component';

describe('BicycleDetailsComponent', () => {
  let component: BicycleDetailsComponent;
  let fixture: ComponentFixture<BicycleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BicycleDetailsComponent]
    });
    fixture = TestBed.createComponent(BicycleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

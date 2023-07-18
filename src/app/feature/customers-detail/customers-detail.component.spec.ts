import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDetailComponent } from './customers-detail.component';

describe('CustomersDetailComponent', () => {
  let component: CustomersDetailComponent;
  let fixture: ComponentFixture<CustomersDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersDetailComponent]
    });
    fixture = TestBed.createComponent(CustomersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

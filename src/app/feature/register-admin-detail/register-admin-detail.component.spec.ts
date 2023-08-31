import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdminDetailComponent } from './register-admin-detail.component';

describe('RegisterAdminDetailComponent', () => {
  let component: RegisterAdminDetailComponent;
  let fixture: ComponentFixture<RegisterAdminDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAdminDetailComponent]
    });
    fixture = TestBed.createComponent(RegisterAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

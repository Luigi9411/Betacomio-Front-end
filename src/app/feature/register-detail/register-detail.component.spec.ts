import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDetailComponent } from './register-detail.component';

describe('RegisterDetailComponent', () => {
  let component: RegisterDetailComponent;
  let fixture: ComponentFixture<RegisterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterDetailComponent]
    });
    fixture = TestBed.createComponent(RegisterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

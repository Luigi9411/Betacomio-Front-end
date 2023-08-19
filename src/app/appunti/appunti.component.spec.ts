import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuntiComponent } from './appunti.component';

describe('AppuntiComponent', () => {
  let component: AppuntiComponent;
  let fixture: ComponentFixture<AppuntiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppuntiComponent]
    });
    fixture = TestBed.createComponent(AppuntiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsLoginComponent } from './cghs-login.component';

describe('CghsLoginComponent', () => {
  let component: CghsLoginComponent;
  let fixture: ComponentFixture<CghsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CghsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

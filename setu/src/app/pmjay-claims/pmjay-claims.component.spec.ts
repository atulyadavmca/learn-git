import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjayClaimsComponent } from './pmjay-claims.component';

describe('PmjayClaimsComponent', () => {
  let component: PmjayClaimsComponent;
  let fixture: ComponentFixture<PmjayClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjayClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjayClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

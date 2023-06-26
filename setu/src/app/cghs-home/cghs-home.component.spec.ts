import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsHomeComponent } from './cghs-home.component';

describe('CghsHomeComponent', () => {
  let component: CghsHomeComponent;
  let fixture: ComponentFixture<CghsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CghsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

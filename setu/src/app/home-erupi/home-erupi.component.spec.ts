import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeErupiComponent } from './home-erupi.component';

describe('HomeErupiComponent', () => {
  let component: HomeErupiComponent;
  let fixture: ComponentFixture<HomeErupiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeErupiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeErupiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

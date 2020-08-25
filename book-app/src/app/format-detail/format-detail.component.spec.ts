import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatDetailComponent } from './format-detail.component';

describe('FormatDetailComponent', () => {
  let component: FormatDetailComponent;
  let fixture: ComponentFixture<FormatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

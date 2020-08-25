import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatAddComponent } from './format-add.component';

describe('FormatAddComponent', () => {
  let component: FormatAddComponent;
  let fixture: ComponentFixture<FormatAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

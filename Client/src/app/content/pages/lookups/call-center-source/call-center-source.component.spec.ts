import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCenterSourceComponent } from './call-center-source.component';

describe('CallCenterSourceComponent', () => {
  let component: CallCenterSourceComponent;
  let fixture: ComponentFixture<CallCenterSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallCenterSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCenterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

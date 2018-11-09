import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCat2Component } from './product-cat2.component';

describe('ProductCat2Component', () => {
  let component: ProductCat2Component;
  let fixture: ComponentFixture<ProductCat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCat3Component } from './product-cat3.component';

describe('ProductCat3Component', () => {
  let component: ProductCat3Component;
  let fixture: ComponentFixture<ProductCat3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCat3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

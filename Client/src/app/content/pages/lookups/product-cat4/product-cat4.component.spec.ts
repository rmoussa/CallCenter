import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCat4Component } from './product-cat4.component';

describe('ProductCat4Component', () => {
  let component: ProductCat4Component;
  let fixture: ComponentFixture<ProductCat4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCat4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCat4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

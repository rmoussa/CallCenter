import { TestBed } from '@angular/core/testing';

import { ProductCat1Service } from './product-cat1.service';

describe('ProductCat1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCat1Service = TestBed.get(ProductCat1Service);
    expect(service).toBeTruthy();
  });
});

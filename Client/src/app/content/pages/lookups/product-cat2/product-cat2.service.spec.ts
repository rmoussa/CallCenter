import { TestBed } from '@angular/core/testing';

import { ProductCat2Service } from './product-cat2.service';

describe('ProductCat2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCat2Service = TestBed.get(ProductCat2Service);
    expect(service).toBeTruthy();
  });
});

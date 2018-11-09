import { TestBed } from '@angular/core/testing';

import { ProductCat4Service } from './product-cat4.service';

describe('ProductCat4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCat4Service = TestBed.get(ProductCat4Service);
    expect(service).toBeTruthy();
  });
});

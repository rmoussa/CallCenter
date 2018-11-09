import { TestBed } from '@angular/core/testing';

import { ProductCat3Service } from './product-cat3.service';

describe('ProductCat3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCat3Service = TestBed.get(ProductCat3Service);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CallCenterSourceService } from './call-center-source.service';

describe('CallCenterSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallCenterSourceService = TestBed.get(CallCenterSourceService);
    expect(service).toBeTruthy();
  });
});

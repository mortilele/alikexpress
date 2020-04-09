import { TestBed } from '@angular/core/testing';

import { LazyloadscriptService } from './lazyloadscript.service';

describe('LazyloadscriptService', () => {
  let service: LazyloadscriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyloadscriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

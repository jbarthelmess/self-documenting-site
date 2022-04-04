import { TestBed } from '@angular/core/testing';

import { IsBlogOwnerGuard } from './is-blog-owner.guard';

describe('IsBlogOwnerGuard', () => {
  let guard: IsBlogOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsBlogOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

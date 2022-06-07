import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmAllGameComponent } from './list-em-all-game.component';

describe('ListEmAllGameComponent', () => {
  let component: ListEmAllGameComponent;
  let fixture: ComponentFixture<ListEmAllGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmAllGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmAllGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

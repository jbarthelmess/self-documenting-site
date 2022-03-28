import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarBufferComponent } from './toolbar-buffer.component';

describe('ToolbarBufferComponent', () => {
  let component: ToolbarBufferComponent;
  let fixture: ComponentFixture<ToolbarBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarBufferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

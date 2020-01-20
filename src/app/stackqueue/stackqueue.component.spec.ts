import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackqueueComponent } from './stackqueue.component';

describe('StackqueueComponent', () => {
  let component: StackqueueComponent;
  let fixture: ComponentFixture<StackqueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackqueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

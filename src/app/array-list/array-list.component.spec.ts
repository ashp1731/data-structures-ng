import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayListComponent } from './array-list.component';

describe('ArrayListComponent', () => {
  let component: ArrayListComponent;
  let fixture: ComponentFixture<ArrayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

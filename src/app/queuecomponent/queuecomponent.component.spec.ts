import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuecomponentComponent } from './queuecomponent.component';

describe('QueuecomponentComponent', () => {
  let component: QueuecomponentComponent;
  let fixture: ComponentFixture<QueuecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

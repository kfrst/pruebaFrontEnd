import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingEventComponent } from './loading-event.component';

describe('LoadingEventComponent', () => {
  let component: LoadingEventComponent;
  let fixture: ComponentFixture<LoadingEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

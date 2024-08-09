import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWebcamOnlyComponent } from './ngx-webcam-only.component';

describe('NgxWebcamOnlyComponent', () => {
  let component: NgxWebcamOnlyComponent;
  let fixture: ComponentFixture<NgxWebcamOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxWebcamOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxWebcamOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

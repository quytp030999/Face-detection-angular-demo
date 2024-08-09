import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceDetectionGetGiftDropDownComponent } from './face-detection-get-gift-drop-down.component';

describe('FaceDetectionGetGiftDropDownComponent', () => {
  let component: FaceDetectionGetGiftDropDownComponent;
  let fixture: ComponentFixture<FaceDetectionGetGiftDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceDetectionGetGiftDropDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceDetectionGetGiftDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

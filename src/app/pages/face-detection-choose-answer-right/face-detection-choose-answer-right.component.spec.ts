import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceDetectionChooseAnswerRightComponent } from './face-detection-choose-answer-right.component';

describe('FaceDetectionChooseAnswerRightComponent', () => {
  let component: FaceDetectionChooseAnswerRightComponent;
  let fixture: ComponentFixture<FaceDetectionChooseAnswerRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceDetectionChooseAnswerRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceDetectionChooseAnswerRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

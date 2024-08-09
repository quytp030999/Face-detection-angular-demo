import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as ml5 from 'ml5';
import * as p5 from 'p5';
import { gsap } from 'gsap';

@Component({
  selector: 'app-face-detection-choose-answer-right',
  templateUrl: './face-detection-choose-answer-right.component.html',
  styleUrls: ['./face-detection-choose-answer-right.component.scss'],
})
export class FaceDetectionChooseAnswerRightComponent implements AfterViewInit {
  posenet: any;
  poses: any[] = [];
  p5Sketch: any;
  prevPose: any[] = [];

  @ViewChild('webcam') webcam: any;
  @ViewChild('canvas') canvas: any;

  videoWidth = 0;
  videoHeight = 0;

  ANGLE_THRESHOLD = 20; // Ngưỡng góc tính bằng độ
  point: number = 0;
  checkAngleLeft: number = 0;
  checkAngleRight: number = 0;

  isAngle: boolean = false;
  isShowMask: boolean = true;
  isStartFirst: boolean = true;
  canChoose: boolean = false;
  canConfirm: boolean = false;

  question: any = {
    question: 'Con gì con người chưa thể thuần hóa?',
    answer: 2,
  };
  message: string = '';

  selectedAnswerIndex = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const camera: any = document.getElementById('camera');
    this.videoHeight = camera.offsetHeight;
    this.videoWidth = camera.offsetWidth;
  }

  startGame() {
    this.isShowMask = !this.isShowMask;
    if (this.isStartFirst == true) {
      this.isStartFirst = false;
      this.isAngle = true;
      this.initP5Sketch();
    } else {
      setTimeout(() => {
        alert('Bắt đầu');
        this.isAngle = true;
        this.canChoose = true;
        this.canConfirm = true;
      }, 3000);
    }
  }

  backToRightAnswer() {
    const answers = this.elementRef.nativeElement.querySelectorAll('.answer');
    if (this.selectedAnswerIndex < answers.length - 1) {
      this.selectedAnswerIndex++;
      answers.forEach((answer: any) => answer.classList.remove('selected'));
      answers[this.selectedAnswerIndex].classList.add('selected');
    }
  }

  backToLeftAnswer() {
    const answers = this.elementRef.nativeElement.querySelectorAll('.answer');
    if (this.selectedAnswerIndex > 0) {
      this.selectedAnswerIndex--;
      answers.forEach((answer: any) => answer.classList.remove('selected'));
      answers[this.selectedAnswerIndex].classList.add('selected');
    }
  }

  resetAnswer() {
    const answers = this.elementRef.nativeElement.querySelectorAll('.answer');
    this.selectedAnswerIndex = 0;
    answers.forEach((answer: any) => answer.classList.remove('selected'));
    answers[this.selectedAnswerIndex].classList.add('selected');
  }

  initP5Sketch() {
    try {
      this.p5Sketch = (p: any) => {
        let video: any;
        let canvas: any;

        p.setup = () => {
          const container = document.querySelector('#webcam');
          video = p.createCapture(p.VIDEO);
          video.parent(container);
          canvas = p.createCanvas(this.videoWidth, this.videoHeight);
          canvas.parent(this.canvas.nativeElement);

          this.posenet = ml5.poseNet(video, () => {
            setTimeout(() => {
              alert('Bắt đầu');
              this.isAngle = true;
              this.canChoose = true;
              this.canConfirm = true;
            }, 3000);
          });
          this.posenet.on('pose', (poses: any[]) => {
            if (
              this.isAngle === true &&
              this.canChoose === true &&
              this.canConfirm == true
            ) {
              if (this.poses.length > 0) {
                this.prevPose = this.poses;
              }
              this.poses = poses;
            }
          });

          // video.hide();
        };

        p.draw = () => {
          p.image(video, 0, 0, this.videoWidth, this.videoHeight);
          if (
            this.poses.length > 0 &&
            this.prevPose.length > 0 &&
            this.isAngle === true
          ) {
            this.drawKeypoints();
          }
        };
      };
      new p5(this.p5Sketch);
    } catch (error) {
      alert('error' + error);
    }
  }

  findMax(a: number, b: number, c: number) {
    let max = a;
    if (b > max) {
      max = b;
    }
    if (c > max) {
      max = c;
    }
    return max;
  }

  drawKeypoints() {
    if (this.isAngle == true) {
      // Loop through all the poses detected
      for (let i = 0; i < this.poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = this.poses[i].pose;

        let nose = pose.nose;
        let leftEye = pose.leftEye;
        let rightEye = pose.rightEye;

        let prevNose = this.prevPose[0].pose.nose;
        let prevLeftEye = this.prevPose[0].pose.leftEye;
        let prevRightEye = this.prevPose[0].pose.rightEye;

        if (this.canChoose == true) {
          if (leftEye.y - rightEye.y >= this.ANGLE_THRESHOLD) {
            this.checkAngleLeft++;
          }
          if (rightEye.y - leftEye.y >= this.ANGLE_THRESHOLD) {
            this.checkAngleRight++;
          }
        }

        if (this.checkAngleRight === this.ANGLE_THRESHOLD - 10) {
          this.backToRightAnswer();
          this.checkAngleLeft = 0;
          this.checkAngleRight = 0;
          this.canChoose = false;
          this.distanceChoose();
        }
        if (this.checkAngleLeft === this.ANGLE_THRESHOLD - 10) {
          this.backToLeftAnswer();
          this.checkAngleLeft = 0;
          this.checkAngleRight = 0;
          this.canChoose = false;
          this.distanceChoose();
        }

        if (this.canConfirm == true) {
          if (
            nose.confidence > 0.5 &&
            leftEye.confidence > 0.5 &&
            rightEye.confidence > 0.5 &&
            prevNose.confidence > 0.5 &&
            prevLeftEye.confidence > 0.5 &&
            prevRightEye.confidence > 0.5
          ) {
            const noseYDiff = Math.abs(nose.y - prevNose.y);
            const leftEyeYDiff = Math.abs(leftEye.y - prevLeftEye.y);
            const rightEyeYDiff = Math.abs(rightEye.y - prevRightEye.y);

            const RANGE_HEADNOD = 10;
            if (
              noseYDiff > RANGE_HEADNOD &&
              leftEyeYDiff > RANGE_HEADNOD &&
              rightEyeYDiff > RANGE_HEADNOD
            ) {
              this.canChoose = false;
              this.canConfirm = false;
              if (this.question.answer == this.selectedAnswerIndex) {
                this.validateAnswer(true);
              } else {
                this.validateAnswer(false);
              }
            }
          }
        }
      }
    }
  }

  distanceChoose() {
    setTimeout(() => {
      this.canChoose = true;
    }, 1000);
  }

  validateAnswer(result: boolean) {
    this.isAngle = false;
    if (result === true) {
      this.message = 'Chúc mừng bạn đã chọn đúng';
    } else {
      this.message = 'Chia buồn nhé';
    }
    gsap.to('.popup-container', {
      display: 'block',
    });
  }

  playAgain() {
    gsap.to('.popup-container', {
      display: 'none',
    });
    this.checkAngleLeft = 0;
    this.checkAngleRight = 0;
    this.message = '';
    this.isShowMask = !this.isShowMask;
    this.prevPose = [];
    this.poses = [];
    this.resetAnswer();
    // let container: any = document.querySelector('#webcam');
    // let video: any = document.querySelector('video');
    // container.removeChild(video);
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as ml5 from 'ml5';
import * as p5 from 'p5';
import { gsap } from 'gsap';

@Component({
  selector: 'app-face-detection-get-gift-drop-down',
  templateUrl: './face-detection-get-gift-drop-down.component.html',
  styleUrls: ['./face-detection-get-gift-drop-down.component.scss'],
})
export class FaceDetectionGetGiftDropDownComponent implements AfterViewInit {
  posenet: any;
  poses: any = [];

  p5Sketch: any;

  @ViewChild('canvas') canvas: any;

  videoWidth = 0;
  videoHeight = 0;

  isShowMask: boolean = true;

  gifts: Array<any> = [
    {
      idx: 0,
      url: '../../../assets/imgs/fruits/banana.png',
      point: 10,
      left: 0,
      id: 'banana',
      delay: 1,
      duration: 15,
      click: true,
    },
    {
      idx: 1,
      url: '../../../assets/imgs/fruits/orange.png',
      point: 10,
      left: 90,
      id: 'orange',
      delay: 4,
      duration: 19,
      click: true,
    },
    {
      idx: 2,
      url: '../../../assets/imgs/fruits/guaba.png',
      point: 5,
      left: 40,
      id: 'guaba',
      delay: 3,
      duration: 24,
      click: true,
    },
    {
      idx: 3,
      url: '../../../assets/imgs/fruits/banana.png',
      point: 10,
      left: 75,
      id: 'banana-1',
      delay: 9,
      duration: 30,
      click: true,
    },
    {
      idx: 4,
      url: '../../../assets/imgs/fruits/orange.png',
      point: 10,
      left: 20,
      id: 'orange-1',
      delay: 10,
      duration: 21,
      click: true,
    },
    {
      idx: 5,
      url: '../../../assets/imgs/fruits/guaba.png',
      point: 45,
      left: 60,
      id: 'guaba-1',
      delay: 12,
      duration: 18,
      click: true,
    },
  ];
  giftsBackup: Array<any> = [
    {
      idx: 0,
      url: '../../../assets/imgs/fruits/banana.png',
      point: 10,
      left: 0,
      id: 'banana',
      delay: 1,
      duration: 15,
      click: true,
    },
    {
      idx: 1,
      url: '../../../assets/imgs/fruits/orange.png',
      point: 10,
      left: 90,
      id: 'orange',
      delay: 4,
      duration: 19,
      click: true,
    },
    {
      idx: 2,
      url: '../../../assets/imgs/fruits/guaba.png',
      point: 5,
      left: 40,
      id: 'guaba',
      delay: 3,
      duration: 24,
      click: true,
    },
    {
      idx: 3,
      url: '../../../assets/imgs/fruits/banana.png',
      point: 10,
      left: 75,
      id: 'banana-1',
      delay: 9,
      duration: 30,
      click: true,
    },
    {
      idx: 4,
      url: '../../../assets/imgs/fruits/orange.png',
      point: 10,
      left: 20,
      id: 'orange-1',
      delay: 10,
      duration: 21,
      click: true,
    },
    {
      idx: 5,
      url: '../../../assets/imgs/fruits/guaba.png',
      point: 45,
      left: 60,
      id: 'guaba-1',
      delay: 12,
      duration: 18,
      click: true,
    },
  ];
  maxDelay: number = 0;
  points: number = 0;

  positionGifts: any;
  isStartGame: boolean = false;
  isStartFirst: boolean = true;

  p5: any;

  constructor() {}

  ngAfterViewInit(): void {
    const camera: any = document.getElementById('camera');
    this.videoHeight = camera.offsetHeight;
    this.videoWidth = camera.offsetWidth;
  }

  startGame() {
    this.isShowMask = !this.isShowMask;
    if (this.isStartFirst == true) {
      this.isStartFirst = false;
      this.initP5Sketch();
    } else {
      this.initDropDownGifts();
    }
  }

  initP5Sketch() {
    this.p5Sketch = (p: any) => {
      let video: any;
      let canvas: any;

      p.setup = () => {
        const container = document.querySelector('#webcam');
        video = p.createCapture(p.VIDEO);
        video.parent(container);
        canvas = p.createCanvas(this.videoWidth, this.videoHeight);
        canvas.parent(this.canvas.nativeElement);

        this.posenet = ml5.poseNet(
          video,
          { detectionType: 'single', output: ['nose'] },
          () => {
            this.initDropDownGifts();
          }
        );
        this.posenet.on('pose', (poses: any) => {
          // console.log('pose:::', poses);

          this.poses = poses[0].pose.nose;
        });
      };

      p.draw = () => {
        // p.image(video, 0, 0, this.videoWidth, this.videoHeight);
        if (this.poses) {
          let xPosition = this.videoWidth - this.poses.x;
          gsap.to('#box-gift', {
            x: xPosition,
          });
        }
      };
    };
    new p5(this.p5Sketch);
  }

  initDropDownGifts() {
    for (let item of this.gifts) {
      gsap.to(`.${item.id}`, {
        delay: item.delay,
        duration: item.duration,
        y: this.videoHeight + this.videoHeight * 0.3,
        ease: '',
        onStart: () => {
          // gsap.delayedCall(item.duration / 2, () => {
          //   this.checkCollision(item.id);
          // });
          setTimeout(() => {
            console.log('CHECK', item.id);
            this.checkCollision(item.id);
          }, (item.duration / 2) * 1000);
        },
      });
      if (this.maxDelay < item.duration) {
        this.maxDelay = item.duration + item.delay;
      }
    }
    gsap.delayedCall(this.maxDelay, () => {
      gsap.to('.popup-container', {
        display: 'block',
      });
    });
  }

  checkCollision(id: string) {
    const boxGift: any = document.getElementById('box-gift');
    const boxGiftRect = boxGift.getBoundingClientRect();
    const gift: any = document.getElementById(`${id}`);
    const giftRect = gift.getBoundingClientRect();
    const flag = this.checkValidPosition(
      {
        x: boxGiftRect.x,
        y: boxGiftRect.y,
        width: boxGiftRect.width,
        height: boxGiftRect.height,
      },
      {
        x: giftRect.x,
        y: giftRect.y,
        width: giftRect.width,
        height: giftRect.height,
      }
    );
    if (flag == true) {
      const indexGift = this.gifts.findIndex((el: any) => {
        return el.id == id;
      });
      this.addBar(
        this.gifts[indexGift].point,
        this.gifts[indexGift].id,
        indexGift
      );
    }
  }

  checkValidPosition(
    positionBox: { x: number; y: number; width: number; height: number },
    positionGift: { x: number; y: number; width: number; height: number }
  ) {
    let flag = false;
    const positionCenterGift = {
      x: positionGift.x + positionGift.width / 2,
      y: positionGift.y + positionGift.height / 2,
    };
    const positionFullBox = {
      x1: positionBox.x,
      x2: positionBox.x + positionBox.width,
      y1: positionBox.y,
      y2: positionBox.y + positionBox.height,
    };
    if (
      positionFullBox.x1 < positionCenterGift.x &&
      positionFullBox.x2 > positionCenterGift.x &&
      positionFullBox.y1 < positionCenterGift.y &&
      positionFullBox.y2 > positionCenterGift.y
    ) {
      flag = true;
    }
    return flag;
  }

  addBar(point: number, target: string, idx: number) {
    if (this.points < 100) {
      if (this.gifts[idx].click == true) {
        this.points += point;
        this.gifts[idx].click = false;
        gsap.to(`#${target}`, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.killTweensOf(`.${target}`);
          },
        });
        gsap.to('#bar', {
          width: this.points + '%',
          duration: 1,
        });
      }
    }
  }

  playAgain() {
    this.points = 0;
    this.isShowMask = true;
    this.gifts = this.giftsBackup;
    gsap.to('.popup-container', {
      display: 'none',
    });
    gsap.to('#bar', {
      width: 0,
    });
  }
}

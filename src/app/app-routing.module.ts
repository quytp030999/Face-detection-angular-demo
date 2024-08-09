import { NgxWebcamOnlyComponent } from './pages/ngx-webcam-only/ngx-webcam-only.component';
import { FaceDetectionChooseAnswerRightComponent } from './pages/face-detection-choose-answer-right/face-detection-choose-answer-right.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceDetectionGetGiftDropDownComponent } from './pages/face-detection-get-gift-drop-down/face-detection-get-gift-drop-down.component';

const routes: Routes = [
  {
    path: '',
    component: FaceDetectionGetGiftDropDownComponent
  },
  {
    path: 'get-gift',
    component: FaceDetectionGetGiftDropDownComponent
  },
  {
    path: 'right-answers',
    component: FaceDetectionChooseAnswerRightComponent
  },
  {
    path: 'webcam-only',
    component: NgxWebcamOnlyComponent
  },
  {
    path: "**",
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaceDetectionGetGiftDropDownComponent } from './pages/face-detection-get-gift-drop-down/face-detection-get-gift-drop-down.component';
import { FaceDetectionChooseAnswerRightComponent } from './pages/face-detection-choose-answer-right/face-detection-choose-answer-right.component';
import { NgxWebcamOnlyComponent } from './pages/ngx-webcam-only/ngx-webcam-only.component';

@NgModule({
  declarations: [
    AppComponent,
    FaceDetectionGetGiftDropDownComponent,
    FaceDetectionChooseAnswerRightComponent,
    NgxWebcamOnlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import  {WordrunPage} from '../wordrun/wordrun'
import Tesseract from 'tesseract.js';  
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  srcImage: string;
  OCRAD: any;
  @ViewChild('scannedImg')
  public scannedImg: ElementRef;
  public  recognizedText: string;
  public progress: any;
  public result: any;
  public d: Date;
  constructor(public cd: ChangeDetectorRef,public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController,public camera:Camera
  ) {}
  //tesseract implementation
  ionViewDidLoad() {
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.PNG,
        quality: 100,
        targetWidth: 200,
        targetHeight: 300
    }).then((image) => {
    }).then((image) => {
      this.scannedImg.nativeElement.src = image;
      this.recognizeText(this.scannedImg.nativeElement.src);
  }, (err) => {
      console.log(err);
      this.recognizeText(this.scannedImg.nativeElement.src); // probably we're in a browser
  });
}

  //tesseract recgonition
  recognizeText(image) {
    this.d = new Date();

      Tesseract.recognize(image)
          .progress((progress) => {
              var progressStatus = progress.status + " [" + Math.ceil(progress.progress * 100) + "%]";
              console.log(progressStatus);

              this.progress = progressStatus;
          })
          .catch(err => {
              console.log(err);
          })
          .then((tesseractResult) => {
              console.log(tesseractResult);
              // console.log(JSON.stringify(tesseractResult)); - circular json
              let t = new Date();
              console.log("milliseconds", (t.getTime() - this.d.getTime()) );
              this.result = tesseractResult;
              this.recognizedText = tesseractResult.text;
              //push to wordrunner page
              this.navCtrl.push(WordrunPage, {
                text: this.recognizedText,
                
              });
              
              
          });
  }

}

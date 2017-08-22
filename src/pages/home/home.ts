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
  private progress: any;
  private result: any;
  private d: Date;
  constructor(
    public cd: ChangeDetectorRef,public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController,private camera:Camera
  ) {}
  //tesseract implementation
  ionViewDidLoad(){
    this.recognizeText(this.scannedImg.nativeElement.src);
  }
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
              console.log("millis", (t.getTime() - this.d.getTime()) );
              this.result = tesseractResult;
              this.recognizedText = tesseractResult.text;
              this.navCtrl.push(WordrunPage, {
                text: this.recognizedText,
                
              });
              
              
          });
  }





  //allow them to choose from multiple photo options, 0 = library pull 1 = camera take pic
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/demo.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
 //getting image from taking picture
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }
  //using the ocrad.js to anayalze the text, see http://antimatter15.com/ocrad.js/demo.html
  analyze() {
    let loader = this.loadingCtrl.create({
     content: 'Please wait...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
      this.navCtrl.push(WordrunPage, {
        text: text,
        
      });
    });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }
}

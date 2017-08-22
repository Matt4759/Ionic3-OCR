import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import  {WordrunPage} from '../wordrun/wordrun'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;

  constructor(
    public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController,private camera:Camera
  ) {}
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

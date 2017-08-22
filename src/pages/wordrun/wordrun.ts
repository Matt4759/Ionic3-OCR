import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-wordrun',
  templateUrl: 'wordrun.html',
})
export class WordrunPage {
text;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var str =  this.navParams.get('text');//'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium est cursus, porttitor diam vitae, congue purus. Nulla luctus augue at lacus dictum mollis. Sed eu libero vehicula, molestie lorem sed, rhoncus metus. Proin efficitur facilisis lectus in blandit. Curabitur euismod metus nibh, sit amet tristique justo laoreet id. Nullam posuere enim mi, eu fermentum metus pharetra ut. Nulla aliquam quis nulla at lacinia.In hac habitasse platea dictumst. Ut turpis dui, facilisis et leo nec, blandit ultrices enim. Donec et magna diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus felis orci, rhoncus a posuere ac, tempus vitae odio. Vivamus ut urna ultrices, commodo magna blandit, volutpat elit. Integer est nisi, mattis vitae dignissim ac, faucibus feugiat lacus. Vestibulum eu vestibulum augue. Morbi imperdiet leo in nulla hendrerit varius. Phasellus cursus dui convallis, viverra nunc sed, fringilla ex. Morbi at ultricies dolor, eu fermentum eros. Vestibulum non turpis ipsum.';
    var title = str.split(" ");
    // this.navParams.get('text');
    //['Orange', 'Apple', 'Mango', 'Airplane', 'Kiwi'];
    
    var i = 0;  // the index of the current item to show
    
    setInterval(function() {            // setInterval makes it run repeatedly
        document
            .getElementById('words')
            .innerHTML = title[i++];    // get the item and increment i to move to the next
        if (i == title.length) i = 0;   // reset to first element if you've reached the end
    }, 150);  
  }

 

}

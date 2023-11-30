import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.page.html',
  styleUrls: ['./listcategory.page.scss'],
})
export class ListcategoryPage implements OnInit {
  categories: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCategories();
  }

  async getCategories(){
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();
    try {
      this.firestore
        .collection("categories")
        .snapshotChanges()
        .subscribe(data => {
          this.categories = data.map(e => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()["name"],
              image: e.payload.doc.data()["image"],
            };
          });

          loader.dismiss();
        });

    } catch(e){
      this.showToast(e);

    }
  }
  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
  async deletePost(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Creating...",
      spinner: 'lines',
      cssClass: 'custom-loader-class'
    });
    (await loader).present();

    this.alertCtrl.create({
      header: 'Confirmation!',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.firestore.doc("categories/" + id).delete();
            this.navCtrl.navigateRoot("listcategory");
            this.showToast("Category Deleted");
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    }).then(res => {
      res.present();
    });
    (await loader).dismiss();
  }


}

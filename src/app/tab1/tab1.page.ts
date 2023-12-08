import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import Item = firebase.analytics.Item;

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public categories: any;
  public featuredProducts = [];
  public bestSellProducts = [];
  products: any;
  public orders: Item_in_order[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }
  async getCategories() {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    loader.present();
    try {
      this.firestore
        .collection('categories')
        .snapshotChanges()
        .subscribe((data) => {
          this.categories = data.map((e) => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],
              image: e.payload.doc.data()['image']
            };
          });

          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  async getProducts() {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    loader.present();
    try {
      this.firestore
        .collection('products')
        .snapshotChanges()
        .subscribe((data) => {
          this.products = data.map((e) => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],
              category: e.payload.doc.data()['category'],
              filepath: e.payload.doc.data()['filepath'],
              price: e.payload.doc.data()['price']
            };
          });
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then((toastData) => toastData.present());
  }

}

interface Item_in_order {
  id: string;
  itemIds: string[];
}

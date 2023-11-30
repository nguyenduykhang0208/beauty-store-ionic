import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Product} from "../models/product.mode";
import {Category} from "../models/category.mode";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-category-admin',
  templateUrl: './edit-category-admin.page.html',
  styleUrls: ['./edit-category-admin.page.scss'],
})
export class EditCategoryAdminPage implements OnInit {
  category = {} as Category;
  id: any;
  fb;
  constructor(
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private firestore: AngularFirestore,
      private navCtrl: NavController,
      private actRoute: ActivatedRoute,
      private alertCtrl: AlertController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getCategoryById(this.id);
  }
  formValidation(){
    if (!this.category.name){
      this.showToast("Please enter the name");
      return false;
    }
    return true;
  }
  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'success'
    })
        .then(toastData => toastData.present());
  }
  async getCategoryById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.firestore.doc("categories/" + id)
        .valueChanges()
        .subscribe(data => {
          this.category.id = data["id"];
          this.category.name = data["name"];
          this.category.image = data["image"];
        });
    //dismiss loader
    (await loader).dismiss();
  }

  async updateCategory(c: Category){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      this.alertCtrl.create({
        header: 'Alert!',
        message: 'Are you sure the information submitted is correct?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.firestore.doc("categories/" + this.id).update(c);
              this.firestore.doc("categories/" + this.id).update({filepath: this.fb});
              this.navCtrl.navigateRoot("/listcategory");
              this.showToast("Category Updated!");
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

      //dismiss loader
      (await loader).dismiss();
    }
  }
}

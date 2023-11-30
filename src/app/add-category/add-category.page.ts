import { Component, OnInit } from '@angular/core';
import {Category} from "../models/category.mode";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LoadingController, NavController, ToastController} from "@ionic/angular";
import {finalize} from "rxjs/operators";
import {Product} from "../models/product.mode";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  category = {} as Category;
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(
    private afs:AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }


  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `addCategories/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`addCategories/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log("this.fb:",this.fb);

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log("url: ",url);
        }
      });
  }


  async addCategory(category:Category){

    if(this.formValidation()){
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      const categories = this.afs.collection('categories').add(category);

      //add id to book
      const booksId = (await categories).id;
      await this.afs.collection('categories').doc(booksId).update({
        id: booksId,
        image:this.fb,
      });

      //dismiss loader
      (await loader).dismiss();
      this.showToast("Category Added Successfully")
      this.navCtrl.navigateRoot("listcategory");

    }else {
      this.showToast("Please complete the form");

    }
  }


  //check to see if user has entered their address or not
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
      duration: 3000
    })
      .then(toastData => toastData.present());
  }


}

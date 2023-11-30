import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products: any;
  allProduct: any; // Mảng để lưu trữ danh sách sản phẩm ban đầu
  categories: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getProducts();
    this.getCategories();
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

          // Lưu trữ danh sách sản phẩm ban đầu
          this.allProduct = this.products;

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

  // Function to filter products by category
  filterProductsByCategory(category: any) {
    if (category) {
      this.products = this.allProduct.filter(
        (product) => product.category === category.name
      );
    } else {
      // Nếu không có danh mục được chọn, hiển thị tất cả sản phẩm
      this.products = this.allProduct;
    }
  }
}

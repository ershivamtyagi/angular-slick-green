import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  constructor(private sanitizer: DomSanitizer,private webIntent: WebIntent,private route: ActivatedRoute,private productService: ProductService,private cartService: CartService) { }
  controllerSrc: any;
  
  ngOnInit() {
    this.fetchProductDetails();
  }

  fetchProductDetails(){
    const productId = +this.route.snapshot.paramMap.get('id');
    console.log("ID = "+productId);
    this.productService.getProductDetails(productId).subscribe(data=>{
      this.product= data;
      this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.product.sku);
      console.log("========"+this.controllerSrc);
      console.log("product = "+this.product);
    });
  }
 

  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
// const options = {
//   action: this.webIntent.ACTION_VIEW,
//   url: 'path/to/file',
//   type: 'application/vnd.android.package-archive'
// }

// this.webIntent.startActivity(options).then(onSuccess=>{
//   console.log("onSuccess",onSuccess);
// }, onError=>{
//   console.log("onError",onError);
// });
  }
}

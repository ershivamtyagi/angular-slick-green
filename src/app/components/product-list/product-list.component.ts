import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number;
  products: any;
  thePageNumber: any;
  thePageSize: any;
  theTotalElements: any;
  saveSearchRequestPayload: { username: any; keyword: string; };
  username: any;

  constructor(private route:ActivatedRoute,private productService:ProductService) { }

  ngOnInit() {
    this.handleListComponents();
  }


  handleListComponents(){
    //check if 'id' parameter is available
    const hasCategoryId = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the categoryId and convert it into number by cooncatenating + sign
      this.currentCategoryId  = +this.route.snapshot.paramMap.get('id');
    }
    else{
      //if no category avaiable set the category Id to default ie 1
      this.currentCategoryId=1;
    }

    // get the product list for given CategoryId
    this.productService.getProductList(this.currentCategoryId).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

      if(this.products.length == 0 && theKeyword!=null){
       
        console.log('No product found'+theKeyword);
        this.saveSearchRequestPayload = {
          username: this.username,
          keyword:theKeyword
        };
        //  this.productService.saveSearch(this.saveSearchRequestPayload).subscribe((data) => {
        //   console.log('seach saved successfully');
        //  }, error => {
        // console.log('error occured');
        //  });
      }
    };
  }

}

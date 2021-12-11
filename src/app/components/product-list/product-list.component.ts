import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number;
  products:Product[] = [];
  thePageNumber: any;
  thePageSize: any;
  theTotalElements: any;
  saveSearchRequestPayload: { username: any; keyword: string; };
  username: any;
  previousKeyword: string;

  constructor(private route:ActivatedRoute,private productService:ProductService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
   
  }
  heroes = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
];
  searchMode: boolean = false;
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
  
  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
                                               
  }
  handleListProducts(){
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
  setFilteredItems(eevnt) {
    const query = eevnt.detail.value.trimStart();
    console.log("I am in"+eevnt.detail.value.trimStart());
    this.productService.getProductDetailsBySearchName(query).subscribe(this.processResult());
  
}
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
      console.log("Products = "+this.products)
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

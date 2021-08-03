import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  getProductDetails(theProductId: number):Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    console.log(productUrl)
    return this.httpClient.get<Product>(productUrl);
  }
  saveSearch(saveSearchRequestPayload: any) {
    throw new Error("Method not implemented.");
  }
  private baseUrl = 'http://localhost:8080/api/products';
 // private baseUrl = 'http://ec2-3-14-83-169.us-east-2.compute.amazonaws.com:8080/api/products';
  getProductList(theCategoryId: number) :Observable<GetResponseProducts>{
    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=1&size=5`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private categoryUrl = 'http://localhost:8080/api/product-category';
  //private categoryUrl = 'http://ec2-3-14-83-169.us-east-2.compute.amazonaws.com:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response =>  response._embedded.productCategory)
    );
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
  


}
interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  setFilteredItems(eevnt) {
    const query = eevnt.detail.value.trimStart();
    console.log("I am in"+eevnt.detail.value.trimStart());
    // this.productService.getProductDetailsBySearchName(query).subscribe(this.processResult());
    this.router.navigateByUrl(`/search/`+query);
}

}

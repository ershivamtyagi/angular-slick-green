import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ComponentFactoryResolver, ElementRef, OnInit, SecurityContext, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-show-workout-details',
  templateUrl: './show-workout-details.component.html',
  styleUrls: ['./show-workout-details.component.scss'],
})

export class ShowWorkoutDetailsComponent implements OnInit {
  id: number;
  out: string;
  result: SafeResourceUrl;
  @ViewChild('main', { read: ViewContainerRef }) entry: ViewContainerRef;
  data: any;

   map = new Map([
    [ 1, "https://www.youtube.com/embed/MDg0xyAJnIc"]
]);
   someArray: {key: number, value: string}[] = [
    {key:1, value: 'https://www.youtube.com/embed/MDg0xyAJnIc'},
    {key:2, value: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MDg0xyAJnIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'},
    {key:3, value: 'two'},
    {key:4, value: 'two'}
];
  constructor(public resolver: ComponentFactoryResolver,private route:ActivatedRoute,private httpClient: HttpClient, public navCtrl: NavController,private sanitized: DomSanitizer) { }

  ngOnInit() { this.route.paramMap.subscribe(() => {
    this.getExcersizes();
});
console.log("out="+this.result);

}
//htmlString = '<h1>Hello gowtham</h1>';

private baseUrl1 = 'http://localhost:8080/api/programs/xy';
getExcersizes(){
  console.log("data");
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

  this.id = +this.route.snapshot.paramMap.get('categoryId');
   this.httpClient.get(`${this.baseUrl1}`,{headers,responseType:'text'}).subscribe(this.processResult());
}
processResult() {
  return data => {
     console.log("callout="+data);
     this.data = data; //Where it is a html markup from php server: <div class="sample"> Example </div>
    this.result = this.sanitized.sanitize(SecurityContext.HTML,this.sanitized.bypassSecurityTrustHtml(data));

            const factory = this.resolver.resolveComponentFactory(this.data);
            this.entry.createComponent(factory);
    };
}
}

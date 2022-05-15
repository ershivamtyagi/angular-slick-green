import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {

  @Input('appHideHeader') toolbar :any;
  private toolbarHeight=44;
  constructor(private renderer:Renderer2,private domCtrl:DomController) { }

  ngOnInit(){
     console.log('TEST',this.toolbar);
    this.toolbar = this.toolbar.el;

    this.domCtrl.read(()=>{

      console.log("Client Height "+this.toolbar.clientHeight);
      this.toolbarHeight = this.toolbar.clientHeight;
      // if(this.toolbarHeight == 0){
      //   this.toolbarHeight =  this.toolbar.el.clientHeight
      // }
    }

    )

  }

  @HostListener('ionScroll',['$event']) onContentScroll($event){
    console.log($event);
    const scrollTop = $event.detail.scrollTop;
    // console.log(scrollTop);
    let newPosition = -(scrollTop/5);
    if(newPosition < -this.toolbarHeight){
      newPosition = -this.toolbarHeight;
    }
    let newOpacity = 1 - (newPosition / -this.toolbarHeight);
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.toolbar,'top',`${newPosition}px`);
      this.renderer.setStyle(this.toolbar,'opacity',newOpacity);
    })
  }

}

import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer :Renderer2;
  constructor(private rendererFactory: RendererFactory2,@Inject(DOCUMENT) private document:Document) { 
    this.renderer = this.rendererFactory.createRenderer(null,null);
  }

  enableDarkMode(){
    // this.renderer.addClass(this.document.body,'dark-theme');
      this.renderer.setAttribute(document.body,'color-theme','dark');
  }
  enableLightMode(){
    // this.renderer.removeClass(this.document.body,'dark-theme');
    this.renderer.setAttribute(document.body,'color-theme','light');

  }
}

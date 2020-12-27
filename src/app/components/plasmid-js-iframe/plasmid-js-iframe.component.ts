import {Component, OnInit, SecurityContext} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-plasmid-js-iframe',
  templateUrl: './plasmid-js-iframe.component.html',
  styleUrls: ['./plasmid-js-iframe.component.css'],
})
export class PlasmidJsIframeComponent implements OnInit {

  private iFrame: HTMLIFrameElement
  public iFrameSrc: SafeResourceUrl
  private iFrameSrcSanitized: string

  constructor(private dom:DomSanitizer) {
    this.iFrameSrc = this.dom.bypassSecurityTrustResourceUrl(environment.plasmidJsSrc)
    this.iFrameSrcSanitized = this.dom.sanitize(SecurityContext.RESOURCE_URL, this.iFrameSrc)
  }


  ngOnInit() {
    this.iFrame = window.frames["iframe"]
    window.addEventListener("message", this.receiveMessage, false);
  }

  public sendMessage(message) {
    this.iFrame.contentWindow.postMessage(message, this.iFrameSrcSanitized)
  }

  public receiveMessage(event){
    console.log("parent received:", event.data)
  }



}

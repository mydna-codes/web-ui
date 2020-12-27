import {Component, OnInit, ViewChild} from '@angular/core';
import {PlasmidJsIframeComponent} from '../plasmid-js-iframe/plasmid-js-iframe.component';


@Component({
  selector: 'app-analyisis',
  templateUrl: './analyisis.component.html',
  styleUrls: ['./analyisis.component.css']
})
export class AnalyisisComponent implements OnInit {

  @ViewChild('iframeComponent') iframeComponent: PlasmidJsIframeComponent

  constructor() { }

  ngOnInit() {
  }

  message = {msg: "hello", data: "test"}

  public sendDataToIframeSource(data){
    this.iframeComponent.sendMessage(data)
  }

}

import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-ui';
  private sidebarOpened = true

  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer) {

    console.log("adding icons")
    this.matIconRegistry.addSvgIcon(
      `microscope`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/microscope.svg")
    );

  }

  ngOnInit(){
  }

}

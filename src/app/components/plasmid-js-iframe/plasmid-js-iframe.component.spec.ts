/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlasmidJsIframeComponent } from './plasmid-js-iframe.component';

describe('PlasmidJsIframeComponent', () => {
  let component: PlasmidJsIframeComponent;
  let fixture: ComponentFixture<PlasmidJsIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasmidJsIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasmidJsIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

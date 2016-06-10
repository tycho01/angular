import {Directive, Input, TemplateRef, ViewContainerRef, ViewRef} from '@angular/core';

import {isPresent} from '../facade/lang';


/**
 * Creates and inserts an embedded view based on a prepared `TemplateRef`.
 *
 * ### Syntax
 * - `<template [ngTemplateOutlet]="templateRefExpression"></template>`
 *
 * @experimental
 */
@Directive({selector: '[ngTemplateOutlet]'})
export class NgTemplateOutlet {
  private _insertedViewRef: ViewRef;

  constructor(private _viewContainerRef: ViewContainerRef) {}

  @Input()
  set ngTemplateOutlet(templateRef: TemplateRef<Object>) {
    if (isPresent(this._insertedViewRef)) {
      this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._insertedViewRef));
    }

    if (isPresent(templateRef)) {
      this._insertedViewRef = this._viewContainerRef.createEmbeddedView(templateRef);
    }
  }
}

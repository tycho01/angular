import * as fs from 'fs';
import * as path from 'path';
import {BasicNgFactory} from '../src/basic.ngfactory';
import {MyComp} from '../src/a/multiple_components';
import {ReflectiveInjector, DebugElement, getDebugNode} from '@angular/core';
import {browserPlatform, BROWSER_APP_STATIC_PROVIDERS} from '@angular/platform-browser';

describe("template codegen output", () => {
  const outDir = path.join('dist', 'all', '@angular', 'compiler_cli', 'integrationtest', 'src');

  it("should lower Decorators without reflect-metadata", () => {
    const jsOutput = path.join(outDir, 'basic.js');
    expect(fs.existsSync(jsOutput)).toBeTruthy();
    expect(fs.readFileSync(jsOutput, {encoding: 'utf-8'})).not.toContain('Reflect.decorate');
  });

  it("should produce metadata.json outputs", () => {
    const metadataOutput = path.join(outDir, 'basic.metadata.json');
    expect(fs.existsSync(metadataOutput)).toBeTruthy();
    const output = fs.readFileSync(metadataOutput, {encoding: 'utf-8'});
    expect(output).toContain('"decorators":');
    expect(output).toContain('"name":"Component","module":"@angular/core"');
  });

  it("should write .d.ts files", () => {
    const dtsOutput = path.join(outDir, 'basic.d.ts');
    expect(fs.existsSync(dtsOutput)).toBeTruthy();
    expect(fs.readFileSync(dtsOutput, {encoding: 'utf-8'})).toContain('Basic');
  });

  it("should be able to create the basic component", () => {
    const appInjector = ReflectiveInjector.resolveAndCreate(BROWSER_APP_STATIC_PROVIDERS,
      browserPlatform().injector);
    var comp = BasicNgFactory.create(appInjector);
    expect(comp.instance).toBeTruthy();
  });

  it("should support ngIf", () => {
    const appInjector = ReflectiveInjector.resolveAndCreate(BROWSER_APP_STATIC_PROVIDERS,
      browserPlatform().injector);
    var comp = BasicNgFactory.create(appInjector);
    var debugElement = <DebugElement>getDebugNode(comp.location.nativeElement);
    expect(debugElement.children.length).toBe(2);

    comp.instance.ctxBool = true;
    comp.changeDetectorRef.detectChanges();
    expect(debugElement.children.length).toBe(3);
    expect(debugElement.children[2].injector.get(MyComp)).toBeTruthy();
  });

  it("should support ngFor", () => {
    const appInjector = ReflectiveInjector.resolveAndCreate(BROWSER_APP_STATIC_PROVIDERS,
      browserPlatform().injector);
    var comp = BasicNgFactory.create(appInjector);
    var debugElement = <DebugElement>getDebugNode(comp.location.nativeElement);
    expect(debugElement.children.length).toBe(2);

    // test NgFor
    comp.instance.ctxArr = [1, 2];
    comp.changeDetectorRef.detectChanges();
    expect(debugElement.children.length).toBe(4);
    expect(debugElement.children[2].attributes['value']).toBe('1');
    expect(debugElement.children[3].attributes['value']).toBe('2');
  });
});
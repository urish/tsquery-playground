import { AfterViewInit, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { tsquery } from '@phenomnomnominal/tsquery';
import 'codemirror/mode/javascript/javascript';
import * as ts from 'typescript';
import { ICodeMirrorPosition, nodeToSelection, positionToNode } from './ast-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('codeEditor') codeEditor: CodemirrorComponent;

  sourceCode =
    'const magic = 5;\n\nfunction f(n:any){\n  return n+n;\n}\n\n\nfunction g() {\n  return f(magic);\n}\n\nconsole.log(g());';
  query = 'FunctionDeclaration';
  ast: ts.SourceFile | null = null;
  activeNode: ts.Node | null = null;
  selectorError: string | null = null;
  results: ts.Node[] = [];

  readonly codemirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: { name: 'javascript', typescript: true },
  };

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => this.runQuery());
  }

  updateQuery(query: string) {
    this.query = query;
    this.runQuery();
  }

  runQuery() {
    const { codeMirror } = this.codeEditor;
    (codeMirror as any).setSelection((codeMirror as any).getCursor());
    this.ast = tsquery.ast(this.sourceCode, 'playground.ts');
    this.selectorError = null;
    try {
      this.results = tsquery(this.ast, this.query);
    } catch (err) {
      this.selectorError = err.toString();
      return;
    }
    if (codeMirror) {
      const selections = this.results.map(nodeToSelection);
      (codeMirror as any).setSelections(selections);
    }
  }

  cursorMoved() {
    if (this.ast) {
      const cursorPos = (this.codeEditor.codeMirror as any).getCursor() as ICodeMirrorPosition;
      this.activeNode = positionToNode(this.ast, cursorPos);
      // The next line is required as ngx-codemirror does not run this event handler in the NgZone.
      // See: https://github.com/TypeCtrl/ngx-codemirror/issues/101
      this.changeDetector.detectChanges();
    }
  }
}

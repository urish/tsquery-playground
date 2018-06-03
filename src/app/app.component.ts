import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { tsquery } from '@phenomnomnominal/tsquery';
import 'codemirror/mode/javascript/javascript';
import * as ts from 'typescript';
import { astDump, nodeToSelection } from './ast-utils';
import { TSQueryApi, TSQueryNode } from '@phenomnomnominal/tsquery/dist/src/tsquery-types';

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
  ast: object | null = null;
  selectorError: string | null = null;
  results: ts.Node[] = [];

  readonly codemirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: { name: 'javascript', typescript: true },
  };

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
    const ast = tsquery.ast(this.sourceCode, 'playground.ts');
    this.ast = astDump(ast);
    this.selectorError = null;
    try {
      this.results = tsquery(ast, this.query);
    } catch (err) {
      this.selectorError = err.toString();
      return;
    }
    if (codeMirror) {
      const selections = this.results.map(nodeToSelection);
      (codeMirror as any).setSelections(selections);
    }
  }
}

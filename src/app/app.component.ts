import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { tsquery } from '@phenomnomnominal/tsquery';
import { Doc, TextMarker } from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import * as ts from 'typescript';
import { nodeToMarker, positionToNode } from './ast-utils';

const matchHighlightClass = 'ast-match-highlight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('codeEditor', { static: false }) codeEditor: CodemirrorComponent;

  private _sourceCode =
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

  private markers: TextMarker[] = [];

  ngAfterViewInit() {
    setTimeout(() => this.runQuery());
  }

  get sourceCode() {
    return this._sourceCode;
  }

  set sourceCode(value: string) {
    if (value !== this._sourceCode) {
      this._sourceCode = value;
      this.runQuery();
    }
  }

  updateQuery(query: string) {
    this.query = query;
    this.runQuery();
  }

  get doc() {
    return (this.codeEditor.codeMirror as any) as Doc;
  }

  runQuery() {
    this.ast = tsquery.ast(this.sourceCode, 'playground.ts', ts.ScriptKind.TSX);
    this.selectorError = null;
    try {
      this.results = tsquery(this.ast, this.query, { visitAllChildren: true });
    } catch (err) {
      this.selectorError = err.toString();
      return;
    }
    const { doc } = this;
    if (doc) {
      this.clearMarkers();
      const markerPositions = this.results.map(nodeToMarker);
      this.markers = markerPositions.map(({ start, end }) =>
        doc.markText(start, end, {
          className: matchHighlightClass,
          title: this.query,
        }),
      );
    }
  }

  cursorMoved() {
    if (this.ast) {
      const cursorPos = this.doc.getCursor();
      this.activeNode = positionToNode(this.ast, cursorPos);
    }
  }

  private clearMarkers() {
    for (const marker of this.markers) {
      marker.clear();
    }
    this.markers = [];
  }

  activateNode(node: ts.Node) {
    const { start, end } = nodeToMarker(node);
    this.doc.setSelection(end, start, { scroll: true });
    this.activeNode = node;
  }
}

import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import * as ts from 'typescript';
import { astChildren } from '../ast-utils';

@Component({
  selector: 'app-ast-viewer',
  templateUrl: './ast-viewer.component.html',
  styleUrls: ['./ast-viewer.component.css'],
})
export class AstViewerComponent implements OnInit, OnChanges {
  @Input() ast: ts.Node;
  @Input() highlightNode: ts.Node;
  @Output() nodeSelected = new EventEmitter<ts.Node>();

  treeControl = new NestedTreeControl<ts.Node>((node: ts.Node) => observableOf(astChildren(node)));
  dataSource = new MatTreeNestedDataSource<ts.Node>();

  constructor() {}

  ngOnInit() {
    this.dataSource.data = this.ast ? [this.ast] : [];
  }

  ngOnChanges() {
    this.dataSource.data = this.ast ? [this.ast] : [];
    this.treeControl.expand(this.ast);
    if (this.highlightNode) {
      this.revealHighlightedNode(this.ast);
    }
  }

  hasChild(_: number, node: ts.Node) {
    return node.getChildCount() > 0;
  }

  private revealHighlightedNode(node: ts.Node) {
    if (
      node.getStart() <= this.highlightNode.getStart() &&
      node.getEnd() >= this.highlightNode.getEnd()
    ) {
      this.treeControl.expand(node);
      ts.forEachChild(node, (child) => {
        this.revealHighlightedNode(child);
      });
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import * as ts from 'typescript';
import { getProperties } from '@phenomnomnominal/tsquery/dist/src/traverse';

@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.css'],
})
export class NodeItemComponent implements OnInit {
  @Input() node: ts.Node;

  constructor() {}

  ngOnInit() {}

  get nodeInfo() {
    return getProperties(this.node);
  }
}

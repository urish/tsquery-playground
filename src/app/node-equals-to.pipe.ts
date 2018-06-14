import { Pipe, PipeTransform } from '@angular/core';
import * as ts from 'typescript';

@Pipe({
  name: 'nodeEqualsTo',
  pure: true,
})
export class NodeEqualsToPipe implements PipeTransform {
  transform(node: ts.Node, other: ts.Node): any {
    if (!node || !other) {
      return node === other;
    }
    return (
      node.getStart() === other.getStart() &&
      node.getEnd() === other.getEnd() &&
      node.kind === other.kind
    );
  }
}

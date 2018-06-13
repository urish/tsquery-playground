import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export function astDump(node: ts.Node): object {
  const result: { [key: string]: any } = {};
  result.kind = tsquery.syntaxKindName(node.kind);
  for (const prop of Object.keys(node)) {
    if (prop === 'parent') {
      continue;
    }
    const value = node[prop];
    if (value && value.kind) {
      result[prop] = astDump(value);
    }
    if (value instanceof Array) {
      const entries = value.map(astDump);
      if (entries.length) {
        result[prop] = entries;
      }
    }
  }
  return result;
}

function lineCh({ line, character }: { line: number; character: number }) {
  return { line, ch: character };
}

export function nodeToSelection(node: ts.Node) {
  const sourceFile = node.getSourceFile();
  return {
    head: lineCh(ts.getLineAndCharacterOfPosition(sourceFile, node.getStart())),
    anchor: lineCh(ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd())),
  };
}

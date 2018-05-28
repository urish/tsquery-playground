import * as ts from 'typescript';

export function astDump(node: ts.Node): object {
  const result: { [key: string]: any } = {};
  result.kind = ts.SyntaxKind[node.kind];
  for (const prop of Object.keys(node)) {
    if (prop === 'parent') {
      continue;
    }
    const value = node[prop];
    if (value && value.kind) {
      result[prop] = astDump(value);
    }
    if (value instanceof Array) {
      result[prop] = value.map(astDump);
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

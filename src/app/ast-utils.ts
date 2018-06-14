import { Position } from 'codemirror';
import * as ts from 'typescript';

export function astChildren(node: ts.Node) {
  const result = [];
  ts.forEachChild(node, (child) => (result.push(child), false));
  return result;
}

function lineCh({ line, character }: { line: number; character: number }): Position {
  return { line, ch: character };
}

export function nodeToMarker(node: ts.Node) {
  const sourceFile = node.getSourceFile();
  return {
    start: lineCh(ts.getLineAndCharacterOfPosition(sourceFile, node.getStart())),
    end: lineCh(ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd())),
  };
}

export function getNodeAtFileOffset(node: ts.Node, offset: number) {
  let result = null as ts.Node | null;
  const visit = (childNode: ts.Node) => {
    ts.forEachChild(childNode, visit);
    if (!result && (childNode.getStart() <= offset && childNode.getEnd() > offset)) {
      result = childNode;
    }
  };
  visit(node);
  return result;
}

export function positionToNode(ast: ts.SourceFile, position: Position) {
  return getNodeAtFileOffset(
    ast,
    ts.getPositionOfLineAndCharacter(ast, position.line, position.ch),
  );
}

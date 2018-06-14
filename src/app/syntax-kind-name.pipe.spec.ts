import { SyntaxKindNamePipe } from './syntax-kind-name.pipe';
import * as ts from 'typescript';

describe('SyntaxKindNamePipe', () => {
  it('should return the coorect syntax kind name for a given TypeScript node', () => {
    const pipe = new SyntaxKindNamePipe();
    expect(pipe.transform(ts.createNumericLiteral('5'))).toEqual('NumericLiteral');
  });
});

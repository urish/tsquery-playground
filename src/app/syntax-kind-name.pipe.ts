import { Pipe, PipeTransform } from '@angular/core';
import { tsquery } from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';

@Pipe({
  name: 'syntaxKindName',
  pure: true,
})
export class SyntaxKindNamePipe implements PipeTransform {
  transform(value: ts.Node): any {
    return tsquery.syntaxKindName(value.kind);
  }
}

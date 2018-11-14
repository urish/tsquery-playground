import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import * as ts from 'typescript';
import { NodeItemComponent } from './node-item.component';

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

describe('NodeItemComponent', () => {
  let component: NodeItemComponent;
  let fixture: ComponentFixture<NodeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodeItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeItemComponent);
    component = fixture.componentInstance;
  });

  it('should display the name for Identifier nodes', () => {
    component.node = ts.createIdentifier('foo');
    fixture.detectChanges();
    const { textContent } = fixture.nativeElement;
    expect(normalize(textContent)).toEqual('Identifier [name=foo]');
  });

  it('should display the value for NumericLiteral nodes', () => {
    component.node = ts.createNumericLiteral('5');
    fixture.detectChanges();
    const { textContent } = fixture.nativeElement;
    expect(normalize(textContent)).toEqual('NumericLiteral [value=5]');
  });

  it('should display the value for StringLiteral nodes', () => {
    component.node = ts.createStringLiteral('hello');
    fixture.detectChanges();
    const { textContent } = fixture.nativeElement;
    expect(normalize(textContent)).toEqual('StringLiteral [value=hello]');
  });
});

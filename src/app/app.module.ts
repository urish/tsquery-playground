import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTreeModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AppComponent } from './app.component';
import { AstViewerComponent } from './ast-viewer/ast-viewer.component';
import { NodeEqualsToPipe } from './node-equals-to.pipe';
import { NodeItemComponent } from './node-item/node-item.component';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
  ],
  declarations: [
    AppComponent,
    AstViewerComponent,
    ScrollIntoViewDirective,
    NodeEqualsToPipe,
    NodeItemComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

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
import { SyntaxKindNamePipe } from './syntax-kind-name.pipe';

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
  declarations: [AppComponent, AstViewerComponent, SyntaxKindNamePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

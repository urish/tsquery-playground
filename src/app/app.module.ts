import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
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

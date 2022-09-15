import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfComponent } from './pages/pdf/pdf.component';

@NgModule({
  declarations: [AppComponent, PdfComponent],
  imports: [BrowserModule, AppRoutingModule, NgxExtendedPdfViewerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfComponent } from './pages/pdf/pdf.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CLoaderComponent } from './pages/c-loader/c-loader.component';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NzProgressModule } from 'ng-zorro-antd/progress';

registerLocaleData(es);

@NgModule({
  declarations: [AppComponent, PdfComponent, CLoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NzProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

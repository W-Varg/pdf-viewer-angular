import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './pages/pdf/pdf.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { path: '', component: PdfComponent },
  { path: '**', component: PdfComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

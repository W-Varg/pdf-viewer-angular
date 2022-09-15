import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './pages/pdf/pdf.component';

const routes: Routes = [
  { path: '', component: PdfComponent },
  { path: '**', component: PdfComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

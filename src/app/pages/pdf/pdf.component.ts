import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';
import { optiocionesUrl } from 'src/helpers/urlParameters';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfComponent {
  url: string = '';

  showToolbar: boolean = true;
  handTool: boolean = true;
  showSidebarButton: boolean = true;
  showFindButton: boolean = true;
  showPagingButtons: boolean = true;
  showZoomButtons: boolean = true;
  showPresentationModeButton: boolean = true;
  showOpenFileButton: boolean = true;
  showPrintButton: boolean = true;
  showDownloadButton: boolean = true;
  showBookmarkButton: boolean = true;
  showSecondaryToolbarButton: boolean = true;
  showRotateButton: boolean = true;
  showHandToolButton: boolean = true;
  showScrollingButton: boolean = true;
  showSpreadButton: boolean = true;
  showPropertiesButton: boolean = true;
  useBrowserLocale: boolean = true;

  base64: boolean = false;
  base64Src: string = 'false';

  constructor(private route: ActivatedRoute) {
    pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['options']) {
        const decodificado = JSON.parse(params['options']);

        this.url = decodificado.src;
        this.handTool = decodificado.otraCosa ?? true;
        this.showToolbar = decodificado.showToolbar ?? true;
        this.showFindButton = decodificado.showFindButton ?? true;
        this.showZoomButtons = decodificado.showZoomButtons ?? true;
        this.showPrintButton = decodificado.showPrintButton ?? true;
        this.showRotateButton = decodificado.showRotateButton ?? true;
        this.showSpreadButton = decodificado.showSpreadButton ?? true;
        this.useBrowserLocale = decodificado.useBrowserLocale ?? true;
        this.showSidebarButton = decodificado.showSidebarButton ?? true;
        this.showPagingButtons = decodificado.showPagingButtons ?? true;
        this.showOpenFileButton = decodificado.showOpenFileButton ?? true;
        this.showDownloadButton = decodificado.showDownloadButton ?? true;
        this.showBookmarkButton = decodificado.showBookmarkButton ?? true;
        this.showHandToolButton = decodificado.showHandToolButton ?? true;
        this.showScrollingButton = decodificado.showScrollingButton ?? true;
        this.showPropertiesButton = decodificado.showPropertiesButton ?? true;

        this.showPresentationModeButton =
          decodificado.showPresentationModeButton;
        this.showSecondaryToolbarButton =
          decodificado.showSecondaryToolbarButton;
      } else {
        this.url =
          '/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf';
      }
      if (params['url']) this.url = params['url'];
    });
  }
}

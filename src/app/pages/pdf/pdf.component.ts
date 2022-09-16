import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';
import { GetBase64Service } from 'src/app/services/get-base64.service';
import { codificadoUrl } from 'src/helpers/urlParameters';

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
  showOpenFileButton: boolean = false;
  showPrintButton: boolean = true;
  showDownloadButton: boolean = true;
  showBookmarkButton: boolean = true;
  showSecondaryToolbarButton: boolean = true;
  showRotateButton: boolean = true;
  showHandToolButton: boolean = false;
  showScrollingButton: boolean = true;
  showSpreadButton: boolean = true;
  showPropertiesButton: boolean = true;
  useBrowserLocale: boolean = false;

  base64: boolean = false;
  base64Src: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: GetBase64Service // private httpClient: HttpClient
  ) {
    pdfDefaultOptions.doubleTapZoomFactor = '100%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
  }
  ngOnInit(): void {
    // codificadoUrl;
    this.route.queryParams.subscribe((params) => {
      if (params['options']) {
        const decoded = JSON.parse(params['options']);

        this.url = decoded.src;
        this.base64 = decoded.base64 ?? false;

        this.handTool = decoded.handTool ?? true;
        this.showToolbar = decoded.showToolbar ?? true;
        this.showFindButton = decoded.showFindButton ?? true;
        this.showZoomButtons = decoded.showZoomButtons ?? true;
        this.showPrintButton = decoded.showPrintButton ?? true;
        this.showRotateButton = decoded.showRotateButton ?? true;
        this.showSpreadButton = decoded.showSpreadButton ?? true;
        this.useBrowserLocale = decoded.useBrowserLocale ?? false;
        this.showSidebarButton = decoded.showSidebarButton ?? true;
        this.showPagingButtons = decoded.showPagingButtons ?? true;
        this.showOpenFileButton = decoded.showOpenFileButton ?? false;
        this.showDownloadButton = decoded.showDownloadButton ?? true;
        this.showBookmarkButton = decoded.showBookmarkButton ?? true;
        this.showHandToolButton = decoded.showHandToolButton ?? false;
        this.showScrollingButton = decoded.showScrollingButton ?? true;
        this.showPropertiesButton = decoded.showPropertiesButton ?? true;

        this.showPresentationModeButton =
          decoded.showPresentationModeButton ?? true;
        this.showSecondaryToolbarButton =
          decoded.showSecondaryToolbarButton ?? false;

        if (this.base64) {
          this.service.makeHttpRequest(decoded).subscribe((res) => {
            const dataResponse = decoded.dataResponse;
            this.base64Src = dataResponse
              ? this.service.getDataPath(res, dataResponse)
              : res;
            if (!this.base64Src) {
              this.service
                .getDefaultBase64()
                .subscribe((data: any) => (this.base64Src = data));
            }
          });
        }
      } else {
        this.url = '/assets/pdfs/Mp-pdf-viewer-docs.pdf';
      }
      if (params['url']) this.url = params['url'];
    });
  }
}

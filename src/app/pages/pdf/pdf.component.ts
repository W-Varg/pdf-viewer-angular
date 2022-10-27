import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Spinkit, SpinnerVisibilityService } from 'ng-http-loader';
import {
  PagesLoadedEvent,
  pdfDefaultOptions,
  PdfLoadedEvent,
  PdfLoadingStartsEvent,
  ProgressBarEvent,
} from 'ngx-extended-pdf-viewer';
import { Observable, shareReplay, Subject, tap } from 'rxjs';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { CLoaderComponent } from '../c-loader/c-loader.component';
import { codificadoUrl } from 'src/helpers/urlParameters';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfComponent implements OnInit {
  public showViewer = true;
  public awesomeComponent = CLoaderComponent;
  public spinkit = Spinkit;
  public contador: number = 0;

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
  showView: boolean = false;
  base64Src: string | null | undefined = null;

  public base64Subject = new Subject<string>();
  public $base64 = Observable<String>;

  private _language = 'es-ES';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private spinner: SpinnerVisibilityService,
    private dataService: DataSharedService
  ) {
    pdfDefaultOptions.doubleTapZoomFactor = '100%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
  }

  pdfLoadingStarts($event: PdfLoadingStartsEvent) {
    this.spinner.show();
  }

  onProgress($event: ProgressBarEvent) {
    const value = Number(parseInt(`${$event.percent}`));
    this.dataService.changeCounter(value);
  }

  pdfLoaded($event: PdfLoadedEvent) {
    this.spinner.hide();
  }

  onPagesLoaded($event: PagesLoadedEvent) {}

  public pdfLoadingFailed($event: Error) {
    this.spinner.hide();
    // this.base64Src = null;
    // this.url = '/assets/pdfs/Mp-pdf-viewer-docs.pdf';
  }

  onEvent(eventName: string, $event: any) {
  }

  public ngOnInit(): void {
    // codificadoUrl;
    this.dataService.counter.subscribe((counter) => (this.contador = counter));
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
          this.makeHttpRequest(decoded);
        }
      } else {
        this.url = '/assets/pdfs/Mp-pdf-viewer-docs.pdf';
      }
      if (params['url']) {
        this.base64Src = null;
        this.url = params['url'];
      }
    });
  }
  /**
   * method by called http request
   * @param decoded url options
   * @returns
   */
  makeHttpRequest(decoded: any) {
    const body = decoded.data;
    const method = decoded.method;
    const headers = decoded.headers;
    const requestURL = decoded.requestURL;

    try {
    } catch (error) {}
    if (method === 'GET' || method === 'get') {
      this.httpClient
        .get(requestURL, { headers })
        .pipe(tap((resp: any) => this.renderBase64(resp, decoded.dataResponse)))
        .subscribe();
    }
    if (method === 'POST' || method === 'post') {
      this.httpClient
        .post(requestURL, body, { headers })
        .pipe(tap((resp: any) => this.renderBase64(resp, decoded.dataResponse)))
        .subscribe();
    }
    // return this.httpClient.get(requestURL, { headers }).pipe(shareReplay());
  }

  /**
   * method by set base64 value
   * @param resp data response from http resquest
   * @param path route when have base64 the response
   */
  renderBase64(resp: any, path: string | null = null): void {
    this.base64Src = path ? this.getDataPath(resp, path) : resp;
    if (!this.base64Src) {
      this.getDefaultBase64();
    }
  }

  /**
   * get string base64 from object response
   * @param obj response object from http resquest
   * @param path route when have base64 the response
   * @returns
   */
  getDataPath(obj: any, path: string): any {
    const arrFields = path.split('.');
    const resp = arrFields.reduce((val, field) => val[field], obj);
    return resp;
  }

  /**
   * if error on request http, thene load defaultbase64
   * @returns
   */
  getDefaultBase64() {
    this.httpClient
      .get('/assets/pdfs/pdf-docs.base64.txt', {
        responseType: 'text' as 'json',
      })
      .pipe(shareReplay())
      .subscribe((data: any) => (this.base64Src = data));
  }

  public get language(): string {
    return this._language;
  }
  // public set language(language: string) {
  //   this._language = language;
  //   this.hidePdfViewer = true;
  //   // the timeout gives the PDF viewer time
  //   // to free memory
  //   setTimeout(() => {
  //     this.hidePdfViewer = false;
  //   }, 1000);
  // }
}

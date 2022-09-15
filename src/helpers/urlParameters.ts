const options = {
  src: 'https://correspondencia-api.fiscalia.gob.bo/view/pdf/code/81919-29463-56970l7thowmi',
  showToolbar: true,
  handTool: true,
  showSidebarButton: true,
  showFindButton: true,
  showPagingButtons: true,
  showZoomButtons: true,
  showPresentationModeButton: true,
  showOpenFileButton: true,
  showPrintButton: true,
  showDownloadButton: true,
  showBookmarkButton: true,
  showSecondaryToolbarButton: true,
  showRotateButton: true,
  showHandToolButton: true,
  showScrollingButton: true,
  showSpreadButton: true,
  showPropertiesButton: true,
  useBrowserLocale: true,
  // =========
  height: '250px',
  zoom: '25%',
  headers: {
    'Content-Type': 'application/pdf',
    token: 'YOUR_TOKEN',
  },
  data: {},
  urlService: '',
  method: {},
};

export const optiocionesUrl = encodeURIComponent(JSON.stringify(options));

// ========PRIMER FORMA DE USO
// https://pdf-viewer.fiscalia.gob.bo/
// options=optiocionesUrl

// <iframe :src="'https://pdf-viewer.fiscalia.gob.bo/?options='+optiocionesUrl" ></iframe>

// ========SEGUNDA FORMA DE USO
// const url = 'https://correspondencia-api.fiscalia.gob.bo/view/pdf/code/81919-29463-56970l7thowmi'
// <iframe :src="'https://pdf-viewer.fiscalia.gob.bo/?url='+url" ></iframe>

console.log(' optiocionesUrl ', optiocionesUrl);

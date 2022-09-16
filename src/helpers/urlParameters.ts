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

  base64: true,
  method: 'GET',
  requestURL:
    'https://jl-idif-api-test.fiscalia.gob.bo/ms/files/63249806e465cae084d73191',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer tokenValid',
  },
  dataResponse: 'response.base64',
  data: {},
};
// requestURL: 'http://172.27.39.12:3001/graphql',

export const codificadoUrl = encodeURIComponent(JSON.stringify(options));

// ========PRIMER FORMA DE USO
// https://pdf-viewer.fiscalia.gob.bo/
// options=codificadoUrl

// <iframe :src="'https://pdf-viewer.fiscalia.gob.bo/?options='+codificadoUrl" ></iframe>

// ========SEGUNDA FORMA DE USO
// const url = 'https://correspondencia-api.fiscalia.gob.bo/view/pdf/code/81919-29463-56970l7thowmi'
// <iframe :src="'https://pdf-viewer.fiscalia.gob.bo/?url='+url" ></iframe>

console.log(`http://localhost:4200/?options=${codificadoUrl}`);

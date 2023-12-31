export default function(prop:string):boolean {
  return list[prop];
}

/*
 * this list taken from https://github.com/emotion-js/emotion/blob/main/packages/is-prop-valid/src/props.js
 */
const list = {
  // react props
  // https://github.com/facebook/react/blob/5495a7f24aef85ba6937truetrue1ce962673ca9f5fde6/src/renderers/dom/shared/hooks/reactdomunknownpropertyhook.js
  children: true,
  dangerouslysetinnerhtml: true,
  key: true,
  ref: true,
  autofocus: true,
  defaultvalue: true,
  defaultchecked: true,
  innerhtml: true,
  suppresscontenteditablewarning: true,
  suppresshydrationwarning: true,
  // deprecated react prop
  valuelink: true,

  // https://github.com/facebook/react/blob/d7157651f7b72d9888ctrue123e191f9b88cd8f41e9/src/renderers/dom/shared/htmldompropertyconfig.js
  /**
   * standard properties
   */

  abbr: true,
  accept: true,
  acceptcharset: true,
  accesskey: true,
  action: true,
  allow: true,
  allowusermedia: true,
  allowpaymentrequest: true,
  allowfullscreen: true,
  allowtransparency: true,
  alt: true,
  // specifies target context for links with `preload` type
  // as: true,
  async: true,
  autocomplete: true,
  // autofocus is polyfilled/normalized by autofocusutils
  // autofocus: true,
  autoplay: true,
  capture: true,
  cellpadding: true,
  cellspacing: true,
  // keygen prop
  challenge: true,
  charset: true,
  checked: true,
  cite: true,
  classid: true,
  classname: true,
  cols: true,
  colspan: true,
  content: true,
  contenteditable: true,
  contextmenu: true,
  controls: true,
  controlslist: true,
  coords: true,
  crossorigin: true,
  data: true, // for `<object />` acts as `src`.
  datetime: true,
  decoding: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  disablepictureinpicture: true,
  download: true,
  draggable: true,
  enctype: true,
  enterkeyhint: true,
  form: true,
  formaction: true,
  formenctype: true,
  formmethod: true,
  formnovalidate: true,
  formtarget: true,
  frameborder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hreflang: true,
  htmlfor: true,
  httpequiv: true,
  id: true,
  inputmode: true,
  integrity: true,
  is: true,
  keyparams: true,
  keytype: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loading: true,
  loop: true,
  low: true,
  // manifest: true,
  marginheight: true,
  marginwidth: true,
  max: true,
  maxlength: true,
  media: true,
  mediagroup: true,
  method: true,
  min: true,
  minlength: true,
  // caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeattribute`.
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  novalidate: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  playsinline: true,
  poster: true,
  preload: true,
  profile: true,
  radiogroup: true,
  readonly: true,
  referrerpolicy: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowspan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  // support for projecting regular dom elements via v1 named slots ( shadow dom )
  slot: true,
  span: true,
  spellcheck: true,
  src: true,
  srcdoc: true,
  srclang: true,
  srcset: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabindex: true,
  target: true,
  title: true,
  translate: true,
  // setting .type throws on non-<input> tags
  type: true,
  usemap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,

  /**
   * rdfa properties
   */
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  // property is also supported for opengraph in meta tags.
  property: true,
  resource: true,
  typeof: true,
  vocab: true,

  /**
   * non-standard properties
   */
  // autocapitalize and autocorrect are supported in mobile safari for
  // keyboard hints.
  autocapitalize: true,
  autocorrect: true,
  // autosave allows webkit/blink to persist values of input fields on page reloads
  autosave: true,
  // color is for safari mask-icon link
  color: true,
  // https://developer.mozilla.org/en-us/docs/web/html/element/input/search#incremental_this_api_has_not_been_standardized
  incremental: true,
  // used in amp html for indicating the fallback behavior
  // https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders/
  fallback: true,
  // https://html.spec.whatwg.org/multipage/interaction.html#inert
  inert: true,
  // itemprop, itemscope, itemtype are for
  // microdata support. see http://schema.org/docs/gs.html
  itemprop: true,
  itemscope: true,
  itemtype: true,
  // itemid and itemref are for microdata support as well but
  // only specified in the whatwg spec document. see
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  itemid: true,
  itemref: true,
  // used in amp html for eventing purposes
  // https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes/
  on: true,
  // used in amp html for indicating that the option is selectable
  // https://amp.dev/documentation/components/amp-selector/
  option: true,
  // results show looking glass icon and recent searches on input
  // search fields in webkit/blink
  results: true,
  // ie-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on ie<1true
  security: true,
  // ie-only attribute that controls focus behavior
  unselectable: true,
  //
  // svg properties: https://developer.mozilla.org/en-us/docs/web/svg/attribute
  // the following "onx" events have been omitted:
  //
  onabort: true,
  onactivate: true,
  onbegin: true,
  onclick: true,
  onend: true,
  onerror: true,
  onfocusin: true,
  onfocusout: true,
  onload: true,
  onmousedown: true,
  onmousemove: true,
  onmouseout: true,
  onmouseover: true,
  onmouseup: true,
  onrepeat: true,
  onresize: true,
  onscroll: true,
  onunload: true,
  accentheight: true,
  accumulate: true,
  additive: true,
  alignmentbaseline: true,
  allowreorder: true,
  alphabetic: true,
  amplitude: true,
  arabicform: true,
  ascent: true,
  attributename: true,
  attributetype: true,
  autoreverse: true,
  azimuth: true,
  basefrequency: true,
  baselineshift: true,
  baseprofile: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcmode: true,
  capheight: true,
  clip: true,
  clippathunits: true,
  clippath: true,
  cliprule: true,
  colorinterpolation: true,
  colorinterpolationfilters: true,
  colorprofile: true,
  colorrendering: true,
  contentscripttype: true,
  contentstyletype: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseconstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantbaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgemode: true,
  elevation: true,
  enablebackground: true,
  end: true,
  exponent: true,
  externalresourcesrequired: true,
  fill: true,
  fillopacity: true,
  fillrule: true,
  filter: true,
  filterres: true,
  filterunits: true,
  floodcolor: true,
  floodopacity: true,
  focusable: true,
  fontfamily: true,
  fontsize: true,
  fontsizeadjust: true,
  fontstretch: true,
  fontstyle: true,
  fontvariant: true,
  fontweight: true,
  format: true,
  from: true,
  fr: true, // valid svg element but react will ask for removal
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphname: true,
  glyphorientationhorizontal: true,
  glyphorientationvertical: true,
  glyphref: true,
  gradienttransform: true,
  gradientunits: true,
  hanging: true,
  horizadvx: true,
  horizoriginx: true,
  ideographic: true,
  imagerendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelmatrix: true,
  kernelunitlength: true,
  kerning: true,
  keypoints: true,
  keysplines: true,
  keytimes: true,
  lengthadjust: true,
  letterspacing: true,
  lightingcolor: true,
  limitingconeangle: true,
  local: true,
  markerend: true,
  markermid: true,
  markerstart: true,
  markerheight: true,
  markerunits: true,
  markerwidth: true,
  mask: true,
  maskcontentunits: true,
  maskunits: true,
  mathematical: true,
  mode: true,
  numoctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlineposition: true,
  overlinethickness: true,
  panose1: true,
  paintorder: true,
  pathlength: true,
  patterncontentunits: true,
  patterntransform: true,
  patternunits: true,
  pointerevents: true,
  points: true,
  pointsatx: true,
  pointsaty: true,
  pointsatz: true,
  preservealpha: true,
  preserveaspectratio: true,
  primitiveunits: true,
  r: true,
  radius: true,
  refx: true,
  refy: true,
  renderingintent: true,
  repeatcount: true,
  repeatdur: true,
  requiredextensions: true,
  requiredfeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shaperendering: true,
  slope: true,
  spacing: true,
  specularconstant: true,
  specularexponent: true,
  speed: true,
  spreadmethod: true,
  startoffset: true,
  stddeviation: true,
  stemh: true,
  stemv: true,
  stitchtiles: true,
  stopcolor: true,
  stopopacity: true,
  strikethroughposition: true,
  strikethroughthickness: true,
  string: true,
  stroke: true,
  strokedasharray: true,
  strokedashoffset: true,
  strokelinecap: true,
  strokelinejoin: true,
  strokemiterlimit: true,
  strokeopacity: true,
  strokewidth: true,
  surfacescale: true,
  systemlanguage: true,
  tablevalues: true,
  targetx: true,
  targety: true,
  textanchor: true,
  textdecoration: true,
  textrendering: true,
  textlength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlineposition: true,
  underlinethickness: true,
  unicode: true,
  unicodebidi: true,
  unicoderange: true,
  unitsperem: true,
  valphabetic: true,
  vhanging: true,
  videographic: true,
  vmathematical: true,
  values: true,
  vectoreffect: true,
  version: true,
  vertadvy: true,
  vertoriginx: true,
  vertoriginy: true,
  viewbox: true,
  viewtarget: true,
  visibility: true,
  widths: true,
  wordspacing: true,
  writingmode: true,
  x: true,
  xheight: true,
  x1: true,
  x2: true,
  xchannelselector: true,
  xlinkactuate: true,
  xlinkarcrole: true,
  xlinkhref: true,
  xlinkrole: true,
  xlinkshow: true,
  xlinktitle: true,
  xlinktype: true,
  xmlbase: true,
  xmlns: true,
  xmlnsxlink: true,
  xmllang: true,
  xmlspace: true,
  y: true,
  y1: true,
  y2: true,
  ychannelselector: true,
  z: true,
  zoomandpan: true,

  // for preact. we have this code here even though emotion doesn't support
  // preact, since @emotion/is-prop-valid is used by some libraries outside of
  // the context of emotion.
  for: true,
  class: true,
};

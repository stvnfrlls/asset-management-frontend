import jQuery from 'jquery';

if (process.client) {
  window.$ = jQuery;
  window.jQuery = jQuery;
}
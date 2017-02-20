cordova.define("cordova-plugin-admob-free.AdMob", function(require, exports, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._translateOptions = exports.AD_SIZE = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setOptions = setOptions;
exports.createBannerView = createBannerView;
exports.createInterstitialView = createInterstitialView;
exports.destroyBannerView = destroyBannerView;
exports.requestInterstitialAd = requestInterstitialAd;
exports.showAd = showAd;
exports.showInterstitialAd = showInterstitialAd;
exports.prepareInterstitial = prepareInterstitial;
exports.showInterstitial = showInterstitial;

var _exec = require('cordova/exec');

var _exec2 = _interopRequireDefault(_exec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Ad sizes.
 * @constant
 * @type {Object}
 */
var AD_SIZE = exports.AD_SIZE = {
  BANNER: 'BANNER',
  IAB_BANNER: 'IAB_BANNER',
  IAB_LEADERBOARD: 'IAB_LEADERBOARD',
  IAB_MRECT: 'IAB_MRECT',
  LARGE_BANNER: 'LARGE_BANNER',
  SMART_BANNER: 'SMART_BANNER',
  FLUID: 'FLUID',
  // android-only
  FULL_BANNER: 'FULL_BANNER',
  LEADERBOARD: 'LEADERBOARD',
  MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
  SEARCH: 'SEARCH',
  WIDE_SKYSCRAPER: 'WIDE_SKYSCRAPER'
};

function boolean2string(x) {
  if (x === null) {
    return '';
  }
  if (x === true) {
    return 'yes';
  }
  if (x === false) {
    return 'no';
  }
  return x;
}

function isUndefined(x) {
  return typeof x === 'undefined';
}

function translateOptions(options) {
  var opts = {};
  if (!isUndefined(options.forChild)) {
    opts.forChild = boolean2string(options.forChild);
    if (typeof options.forChild === 'string') {
      console.warn('`forChild` will not accept string in future, pass boolean instead');
    }
  }
  if (!isUndefined(options.forFamily)) {
    opts.forFamily = boolean2string(options.forFamily);
    if (typeof options.forFamily === 'string') {
      console.warn('`forFamily` will not accept string in future, pass boolean instead');
    }
  }
  return _extends({}, options, opts);
}
// export for testing
var _translateOptions = exports._translateOptions = translateOptions;

/**
 *
 * @param {Object} options
 * @param {string} options.publisherId
 * @param {string} options.interstitialAdId
 *
 * @param {boolean} [options.bannerAtTop=false]    Set to true, to put banner at top
 * @param {boolean} [options.overlap=true]   Set to true, to allow banner overlap webview
 * @param {boolean} [options.offsetTopBar=false]    Set to true to avoid ios7 status bar overlap
 * @param {boolean} [options.isTesting=false]    Receiving test ad
 * @param {boolean} [options.autoShow=false]    Auto show interstitial ad when loaded
 *
 * @param {boolean|null} [options.forChild=null]
 * Default is not calling `tagForChildDirectedTreatment`.
 * Set to "true" for `tagForChildDirectedTreatment(true)`.
 * Set to "false" for `tagForChildDirectedTreatment(false)`.
 *
 * @param {boolean|null} [options.forFamily=null]
 * Android-only.
 * Default is not calling `setIsDesignedForFamilies`.
 * Set to "true" for `setIsDesignedForFamilies(true)`.
 * Set to "false" for `setIsDesignedForFamilies(false)`.
 *
 * @param {function()} [successCallback]
 * @param {function()} [failureCallback]
 */
function setOptions(options, successCallback, failureCallback) {
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    cordova.exec(successCallback, failureCallback, 'AdMob', 'setOptions', [translateOptions(options)]);
  } else if (typeof failureCallback === 'function') {
    failureCallback('options should be specified.');
  }
}

function createBannerView() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var successCallback = arguments[1];
  var failureCallback = arguments[2];

  cordova.exec(successCallback, failureCallback, 'AdMob', 'createBannerView', [translateOptions(options)]);
}

function createInterstitialView(options, successCallback, failureCallback) {
  cordova.exec(successCallback, failureCallback, 'AdMob', 'createInterstitialView', [translateOptions(options)]);
}

function destroyBannerView() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var successCallback = arguments[1];
  var failureCallback = arguments[2];

  cordova.exec(successCallback, failureCallback, 'AdMob', 'destroyBannerView', []);
}

function requestInterstitialAd() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var successCallback = arguments[1];
  var failureCallback = arguments[2];

  cordova.exec(successCallback, failureCallback, 'AdMob', 'requestInterstitialAd', [translateOptions(options)]);
}

function showAd() {
  var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var successCallback = arguments[1];
  var failureCallback = arguments[2];

  cordova.exec(successCallback, failureCallback, 'AdMob', 'showAd', [show]);
}

function showInterstitialAd() {
  var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var successCallback = arguments[1];
  var failureCallback = arguments[2];

  cordova.exec(successCallback, failureCallback, 'AdMob', 'showInterstitialAd', [show]);
}

// emulate cordova-admob-pro interface

function prepareInterstitial(args, successCallback, failureCallback) {
  createInterstitialView(args, successCallback, failureCallback);
  requestInterstitialAd(args, successCallback, failureCallback);
}

function showInterstitial(successCallback, failureCallback) {
  showInterstitialAd(true, successCallback, failureCallback);
}
});

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+YqL":
/***/ (function(module, exports) {

/**
 * Allows smooth kinetic scrolling of the surface
 */
module.exports = kinetic;

function kinetic(getPoint, scroll, settings) {
  if (typeof settings !== 'object') {
    // setting could come as boolean, we should ignore it, and use an object.
    settings = {};
  }

  var minVelocity = typeof settings.minVelocity === 'number' ? settings.minVelocity : 5;
  var amplitude = typeof settings.amplitude === 'number' ? settings.amplitude : 0.25;

  var lastPoint;
  var timestamp;
  var timeConstant = 342;

  var ticker;
  var vx, targetX, ax;
  var vy, targetY, ay;

  var raf;

  return {
    start: start,
    stop: stop,
    cancel: dispose
  };

  function dispose() {
    window.clearInterval(ticker);
    window.cancelAnimationFrame(raf);
  }

  function start() {
    lastPoint = getPoint();

    ax = ay = vx = vy = 0;
    timestamp = new Date();

    window.clearInterval(ticker);
    window.cancelAnimationFrame(raf);

    // we start polling the point position to accumulate velocity
    // Once we stop(), we will use accumulated velocity to keep scrolling
    // an object.
    ticker = window.setInterval(track, 100);
  }

  function track() {
    var now = Date.now();
    var elapsed = now - timestamp;
    timestamp = now;

    var currentPoint = getPoint();

    var dx = currentPoint.x - lastPoint.x;
    var dy = currentPoint.y - lastPoint.y;

    lastPoint = currentPoint;

    var dt = 1000 / (1 + elapsed);

    // moving average
    vx = 0.8 * dx * dt + 0.2 * vx;
    vy = 0.8 * dy * dt + 0.2 * vy;
  }

  function stop() {
    window.clearInterval(ticker);
    window.cancelAnimationFrame(raf);

    var currentPoint = getPoint();

    targetX = currentPoint.x;
    targetY = currentPoint.y;
    timestamp = Date.now();

    if (vx < -minVelocity || vx > minVelocity) {
      ax = amplitude * vx;
      targetX += ax;
    }

    if (vy < -minVelocity || vy > minVelocity) {
      ay = amplitude * vy;
      targetY += ay;
    }

    raf = window.requestAnimationFrame(autoScroll);
  }

  function autoScroll() {
    var elapsed = Date.now() - timestamp;

    var moving = false;
    var dx = 0;
    var dy = 0;

    if (ax) {
      dx = -ax * Math.exp(-elapsed / timeConstant);

      if (dx > 0.5 || dx < -0.5) moving = true;else dx = ax = 0;
    }

    if (ay) {
      dy = -ay * Math.exp(-elapsed / timeConstant);

      if (dy > 0.5 || dy < -0.5) moving = true;else dy = ay = 0;
    }

    if (moving) {
      scroll(targetX + dx, targetY + dy);
      raf = window.requestAnimationFrame(autoScroll);
    }
  }
}

/***/ }),

/***/ "/aYh":
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__("UJE0");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "/w7L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "0421":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("b9XL");

var assertThisInitialized = __webpack_require__("E7HD");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "0fcM":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "0xIF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__("vkNc");

// CONCATENATED MODULE: ../node_modules/@material/tab-indicator/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Tab Indicator.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Tab Indicator into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTabIndicatorAdapter = function () {
  function MDCTabIndicatorAdapter() {
    _classCallCheck(this, MDCTabIndicatorAdapter);
  }

  /**
   * Adds the given className to the root element.
   * @param {string} className The className to add
   */
  MDCTabIndicatorAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes the given className from the root element.
   * @param {string} className The className to remove
   */


  MDCTabIndicatorAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns the client rect of the content element.
   * @return {!ClientRect}
   */


  MDCTabIndicatorAdapter.prototype.computeContentClientRect = function computeContentClientRect() {};

  /**
   * Sets a style property of the content element to the passed value
   * @param {string} propName The style property name to set
   * @param {string} value The style property value
   */


  MDCTabIndicatorAdapter.prototype.setContentStyleProperty = function setContentStyleProperty(propName, value) {};

  return MDCTabIndicatorAdapter;
}();

/* harmony default export */ var tab_indicator_adapter = (MDCTabIndicatorAdapter);
// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var base_foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/tab-indicator/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var cssClasses = {
  ACTIVE: 'mdc-tab-indicator--active',
  FADE: 'mdc-tab-indicator--fade',
  NO_TRANSITION: 'mdc-tab-indicator--no-transition'
};

/** @enum {string} */
var strings = {
  CONTENT_SELECTOR: '.mdc-tab-indicator__content'
};


// CONCATENATED MODULE: ../node_modules/@material/tab-indicator/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCTabIndicatorAdapter>}
 * @abstract
 */

var foundation_MDCTabIndicatorFoundation = function (_MDCFoundation) {
  _inherits(MDCTabIndicatorFoundation, _MDCFoundation);

  _createClass(MDCTabIndicatorFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }

    /**
     * @see MDCTabIndicatorAdapter for typing information
     * @return {!MDCTabIndicatorAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTabIndicatorAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          computeContentClientRect: function computeContentClientRect() {},
          setContentStyleProperty: function setContentStyleProperty() {}
        }
      );
    }

    /** @param {!MDCTabIndicatorAdapter} adapter */

  }]);

  function MDCTabIndicatorFoundation(adapter) {
    foundation__classCallCheck(this, MDCTabIndicatorFoundation);

    return _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCTabIndicatorFoundation.defaultAdapter, adapter)));
  }

  /** @return {!ClientRect} */


  MDCTabIndicatorFoundation.prototype.computeContentClientRect = function computeContentClientRect() {
    return this.adapter_.computeContentClientRect();
  };

  /**
   * Activates the indicator
   * @param {!ClientRect=} previousIndicatorClientRect
   * @abstract
   */


  MDCTabIndicatorFoundation.prototype.activate = function activate(previousIndicatorClientRect) {}; // eslint-disable-line no-unused-vars

  /** @abstract */


  MDCTabIndicatorFoundation.prototype.deactivate = function deactivate() {};

  return MDCTabIndicatorFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var tab_indicator_foundation = (foundation_MDCTabIndicatorFoundation);
// CONCATENATED MODULE: ../node_modules/@material/tab-indicator/sliding-foundation.js
function sliding_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sliding_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function sliding_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCTabIndicatorFoundation}
 * @final
 */

var sliding_foundation_MDCSlidingTabIndicatorFoundation = function (_MDCTabIndicatorFound) {
  sliding_foundation__inherits(MDCSlidingTabIndicatorFoundation, _MDCTabIndicatorFound);

  function MDCSlidingTabIndicatorFoundation() {
    sliding_foundation__classCallCheck(this, MDCSlidingTabIndicatorFoundation);

    return sliding_foundation__possibleConstructorReturn(this, _MDCTabIndicatorFound.apply(this, arguments));
  }

  /** @param {!ClientRect=} previousIndicatorClientRect */
  MDCSlidingTabIndicatorFoundation.prototype.activate = function activate(previousIndicatorClientRect) {
    // Early exit if no indicator is present to handle cases where an indicator
    // may be activated without a prior indicator state
    if (!previousIndicatorClientRect) {
      this.adapter_.addClass(tab_indicator_foundation.cssClasses.ACTIVE);
      return;
    }

    // This animation uses the FLIP approach. You can read more about it at the link below:
    // https://aerotwist.com/blog/flip-your-animations/

    // Calculate the dimensions based on the dimensions of the previous indicator
    var currentClientRect = this.computeContentClientRect();
    var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
    var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    this.adapter_.addClass(tab_indicator_foundation.cssClasses.NO_TRANSITION);
    this.adapter_.setContentStyleProperty('transform', 'translateX(' + xPosition + 'px) scaleX(' + widthDelta + ')');

    // Force repaint before updating classes and transform to ensure the transform properly takes effect
    this.computeContentClientRect();

    this.adapter_.removeClass(tab_indicator_foundation.cssClasses.NO_TRANSITION);
    this.adapter_.addClass(tab_indicator_foundation.cssClasses.ACTIVE);
    this.adapter_.setContentStyleProperty('transform', '');
  };

  MDCSlidingTabIndicatorFoundation.prototype.deactivate = function deactivate() {
    this.adapter_.removeClass(tab_indicator_foundation.cssClasses.ACTIVE);
  };

  return MDCSlidingTabIndicatorFoundation;
}(tab_indicator_foundation);

/* harmony default export */ var sliding_foundation = (sliding_foundation_MDCSlidingTabIndicatorFoundation);
// CONCATENATED MODULE: ../node_modules/@material/tab-indicator/fading-foundation.js
function fading_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fading_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function fading_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCTabIndicatorFoundation}
 * @final
 */

var fading_foundation_MDCFadingTabIndicatorFoundation = function (_MDCTabIndicatorFound) {
  fading_foundation__inherits(MDCFadingTabIndicatorFoundation, _MDCTabIndicatorFound);

  function MDCFadingTabIndicatorFoundation() {
    fading_foundation__classCallCheck(this, MDCFadingTabIndicatorFoundation);

    return fading_foundation__possibleConstructorReturn(this, _MDCTabIndicatorFound.apply(this, arguments));
  }

  MDCFadingTabIndicatorFoundation.prototype.activate = function activate() {
    this.adapter_.addClass(tab_indicator_foundation.cssClasses.ACTIVE);
  };

  MDCFadingTabIndicatorFoundation.prototype.deactivate = function deactivate() {
    this.adapter_.removeClass(tab_indicator_foundation.cssClasses.ACTIVE);
  };

  return MDCFadingTabIndicatorFoundation;
}(tab_indicator_foundation);

/* harmony default export */ var fading_foundation = (fading_foundation_MDCFadingTabIndicatorFoundation);
// CONCATENATED MODULE: ../node_modules/@material/tab-indicator/index.js
var tab_indicator__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function tab_indicator__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tab_indicator__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function tab_indicator__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */









/**
 * @extends {MDCComponent<!MDCTabIndicatorFoundation>}
 * @final
 */

var tab_indicator_MDCTabIndicator = function (_MDCComponent) {
  tab_indicator__inherits(MDCTabIndicator, _MDCComponent);

  /**
   * @param {!Element} root
   * @return {!MDCTabIndicator}
   */
  MDCTabIndicator.attachTo = function attachTo(root) {
    return new MDCTabIndicator(root);
  };

  /**
   * @param {...?} args
   */


  function MDCTabIndicator() {
    tab_indicator__classCallCheck(this, MDCTabIndicator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {?Element} */
    var _this = tab_indicator__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.content_;
    return _this;
  }

  MDCTabIndicator.prototype.initialize = function initialize() {
    this.content_ = this.root_.querySelector(tab_indicator_foundation.strings.CONTENT_SELECTOR);
  };

  /**
   * @return {!ClientRect}
   */


  MDCTabIndicator.prototype.computeContentClientRect = function computeContentClientRect() {
    return this.foundation_.computeContentClientRect();
  };

  /**
   * @return {!MDCTabIndicatorFoundation}
   */


  MDCTabIndicator.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    var adapter = /** @type {!MDCTabIndicatorAdapter} */tab_indicator__extends({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      computeContentClientRect: function computeContentClientRect() {
        return _this2.content_.getBoundingClientRect();
      },
      setContentStyleProperty: function setContentStyleProperty(prop, value) {
        return _this2.content_.style.setProperty(prop, value);
      }
    });

    if (this.root_.classList.contains(tab_indicator_foundation.cssClasses.FADE)) {
      return new fading_foundation(adapter);
    }

    // Default to the sliding indicator
    return new sliding_foundation(adapter);
  };

  /**
   * @param {!ClientRect=} previousIndicatorClientRect
   */


  MDCTabIndicator.prototype.activate = function activate(previousIndicatorClientRect) {
    this.foundation_.activate(previousIndicatorClientRect);
  };

  MDCTabIndicator.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  return MDCTabIndicator;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/tab/adapter.js
function adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * MDCTabDimensions provides details about the left and right edges of the Tab
 * root element and the Tab content element. These values are used to determine
 * the visual position of the Tab with respect it's parent container.
 * @typedef {{rootLeft: number, rootRight: number, contentLeft: number, contentRight: number}}
 */
var MDCTabDimensions = void 0;

/**
 * Adapter for MDC Tab.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Tab  into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

var MDCTabAdapter = function () {
  function MDCTabAdapter() {
    adapter__classCallCheck(this, MDCTabAdapter);
  }

  /**
   * Adds the given className to the root element.
   * @param {string} className The className to add
   */
  MDCTabAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes the given className from the root element.
   * @param {string} className The className to remove
   */


  MDCTabAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns whether the root element has the given className.
   * @param {string} className The className to remove
   * @return {boolean}
   */


  MDCTabAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Sets the given attrName of the root element to the given value.
   * @param {string} attr The attribute name to set
   * @param {string} value The value so give the attribute
   */


  MDCTabAdapter.prototype.setAttr = function setAttr(attr, value) {};

  /**
   * Activates the indicator element.
   * @param {!ClientRect=} previousIndicatorClientRect The client rect of the previously activated indicator
   */


  MDCTabAdapter.prototype.activateIndicator = function activateIndicator(previousIndicatorClientRect) {};

  /** Deactivates the indicator. */


  MDCTabAdapter.prototype.deactivateIndicator = function deactivateIndicator() {};

  /**
   * Emits the MDCTab:interacted event for use by parent components
   */


  MDCTabAdapter.prototype.notifyInteracted = function notifyInteracted() {};

  /**
   * Returns the offsetLeft value of the root element.
   * @return {number}
   */


  MDCTabAdapter.prototype.getOffsetLeft = function getOffsetLeft() {};

  /**
   * Returns the offsetWidth value of the root element.
   * @return {number}
   */


  MDCTabAdapter.prototype.getOffsetWidth = function getOffsetWidth() {};

  /**
   * Returns the offsetLeft of the content element.
   * @return {number}
   */


  MDCTabAdapter.prototype.getContentOffsetLeft = function getContentOffsetLeft() {};

  /**
   * Returns the offsetWidth of the content element.
   * @return {number}
   */


  MDCTabAdapter.prototype.getContentOffsetWidth = function getContentOffsetWidth() {};

  /**
   * Applies focus to the root element
   */


  MDCTabAdapter.prototype.focus = function focus() {};

  return MDCTabAdapter;
}();


// CONCATENATED MODULE: ../node_modules/@material/tab/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var constants_cssClasses = {
  ACTIVE: 'mdc-tab--active'
};

/** @enum {string} */
var constants_strings = {
  ARIA_SELECTED: 'aria-selected',
  RIPPLE_SELECTOR: '.mdc-tab__ripple',
  CONTENT_SELECTOR: '.mdc-tab__content',
  TAB_INDICATOR_SELECTOR: '.mdc-tab-indicator',
  TABINDEX: 'tabIndex',
  INTERACTED_EVENT: 'MDCTab:interacted'
};


// CONCATENATED MODULE: ../node_modules/@material/tab/foundation.js
var foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function tab_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */



/**
 * @extends {MDCFoundation<!MDCTabAdapter>}
 * @final
 */

var foundation_MDCTabFoundation = function (_MDCFoundation) {
  foundation__inherits(MDCTabFoundation, _MDCFoundation);

  foundation__createClass(MDCTabFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return constants_cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return constants_strings;
    }

    /**
     * @see MDCTabAdapter for typing information
     * @return {!MDCTabAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTabAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          setAttr: function setAttr() {},
          activateIndicator: function activateIndicator() {},
          deactivateIndicator: function deactivateIndicator() {},
          notifyInteracted: function notifyInteracted() {},
          getOffsetLeft: function getOffsetLeft() {},
          getOffsetWidth: function getOffsetWidth() {},
          getContentOffsetLeft: function getContentOffsetLeft() {},
          getContentOffsetWidth: function getContentOffsetWidth() {},
          focus: function focus() {}
        }
      );
    }

    /** @param {!MDCTabAdapter} adapter */

  }]);

  function MDCTabFoundation(adapter) {
    tab_foundation__classCallCheck(this, MDCTabFoundation);

    /** @private {function(?Event): undefined} */
    var _this = foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, foundation__extends(MDCTabFoundation.defaultAdapter, adapter)));

    _this.handleClick_ = function () {
      return _this.handleClick();
    };
    return _this;
  }

  /**
   * Handles the "click" event
   */


  MDCTabFoundation.prototype.handleClick = function handleClick() {
    // It's up to the parent component to keep track of the active Tab and
    // ensure we don't activate a Tab that's already active.
    this.adapter_.notifyInteracted();
  };

  /**
   * Returns the Tab's active state
   * @return {boolean}
   */


  MDCTabFoundation.prototype.isActive = function isActive() {
    return this.adapter_.hasClass(constants_cssClasses.ACTIVE);
  };

  /**
   * Activates the Tab
   * @param {!ClientRect=} previousIndicatorClientRect
   */


  MDCTabFoundation.prototype.activate = function activate(previousIndicatorClientRect) {
    this.adapter_.addClass(constants_cssClasses.ACTIVE);
    this.adapter_.setAttr(constants_strings.ARIA_SELECTED, 'true');
    this.adapter_.setAttr(constants_strings.TABINDEX, '0');
    this.adapter_.activateIndicator(previousIndicatorClientRect);
    this.adapter_.focus();
  };

  /**
   * Deactivates the Tab
   */


  MDCTabFoundation.prototype.deactivate = function deactivate() {
    // Early exit
    if (!this.isActive()) {
      return;
    }

    this.adapter_.removeClass(constants_cssClasses.ACTIVE);
    this.adapter_.setAttr(constants_strings.ARIA_SELECTED, 'false');
    this.adapter_.setAttr(constants_strings.TABINDEX, '-1');
    this.adapter_.deactivateIndicator();
  };

  /**
   * Returns the dimensions of the Tab
   * @return {!MDCTabDimensions}
   */


  MDCTabFoundation.prototype.computeDimensions = function computeDimensions() {
    var rootWidth = this.adapter_.getOffsetWidth();
    var rootLeft = this.adapter_.getOffsetLeft();
    var contentWidth = this.adapter_.getContentOffsetWidth();
    var contentLeft = this.adapter_.getContentOffsetLeft();

    return {
      rootLeft: rootLeft,
      rootRight: rootLeft + rootWidth,
      contentLeft: rootLeft + contentLeft,
      contentRight: rootLeft + contentLeft + contentWidth
    };
  };

  return MDCTabFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var tab_foundation = (foundation_MDCTabFoundation);
// CONCATENATED MODULE: ../node_modules/@material/tab/index.js
var tab__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var tab__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function tab__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tab__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function tab__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-disable no-unused-vars */



/* eslint-enable no-unused-vars */



/**
 * @extends {MDCComponent<!MDCTabFoundation>}
 * @final
 */

var tab_MDCTab = function (_MDCComponent) {
  tab__inherits(MDCTab, _MDCComponent);

  /**
   * @param {...?} args
   */
  function MDCTab() {
    tab__classCallCheck(this, MDCTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {?MDCRipple} */
    var _this = tab__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.ripple_;
    /** @private {?MDCTabIndicator} */
    _this.tabIndicator_;
    /** @private {?Element} */
    _this.content_;

    /** @private {?Function} */
    _this.handleClick_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTab}
   */


  MDCTab.attachTo = function attachTo(root) {
    return new MDCTab(root);
  };

  MDCTab.prototype.initialize = function initialize() {
    var rippleFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el, foundation) {
      return new ripple["MDCRipple"](el, foundation);
    };
    var tabIndicatorFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
      return new tab_indicator_MDCTabIndicator(el);
    };

    var rippleSurface = this.root_.querySelector(tab_foundation.strings.RIPPLE_SELECTOR);
    var rippleAdapter = tab__extends(ripple["MDCRipple"].createAdapter( /** @type {!RippleCapableSurface} */this), {
      addClass: function addClass(className) {
        return rippleSurface.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return rippleSurface.classList.remove(className);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return rippleSurface.style.setProperty(varName, value);
      }
    });
    var rippleFoundation = new ripple["MDCRippleFoundation"](rippleAdapter);
    this.ripple_ = rippleFactory(this.root_, rippleFoundation);

    var tabIndicatorElement = this.root_.querySelector(tab_foundation.strings.TAB_INDICATOR_SELECTOR);
    this.tabIndicator_ = tabIndicatorFactory(tabIndicatorElement);

    this.content_ = this.root_.querySelector(tab_foundation.strings.CONTENT_SELECTOR);
  };

  MDCTab.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.handleClick_ = this.foundation_.handleClick.bind(this.foundation_);
    this.listen('click', this.handleClick_);
  };

  MDCTab.prototype.destroy = function destroy() {
    this.unlisten('click', /** @type {!Function} */this.handleClick_);
    this.ripple_.destroy();
    _MDCComponent.prototype.destroy.call(this);
  };

  /**
   * @return {!MDCTabFoundation}
   */


  MDCTab.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new tab_foundation(
    /** @type {!MDCTabAdapter} */{
      setAttr: function setAttr(attr, value) {
        return _this2.root_.setAttribute(attr, value);
      },
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      activateIndicator: function activateIndicator(previousIndicatorClientRect) {
        return _this2.tabIndicator_.activate(previousIndicatorClientRect);
      },
      deactivateIndicator: function deactivateIndicator() {
        return _this2.tabIndicator_.deactivate();
      },
      notifyInteracted: function notifyInteracted() {
        return _this2.emit(tab_foundation.strings.INTERACTED_EVENT, { tab: _this2 }, true /* bubble */);
      },
      getOffsetLeft: function getOffsetLeft() {
        return _this2.root_.offsetLeft;
      },
      getOffsetWidth: function getOffsetWidth() {
        return _this2.root_.offsetWidth;
      },
      getContentOffsetLeft: function getContentOffsetLeft() {
        return _this2.content_.offsetLeft;
      },
      getContentOffsetWidth: function getContentOffsetWidth() {
        return _this2.content_.offsetWidth;
      },
      focus: function focus() {
        return _this2.root_.focus();
      }
    });
  };

  /**
   * Getter for the active state of the tab
   * @return {boolean}
   */


  /**
   * Activates the tab
   * @param {!ClientRect=} computeIndicatorClientRect
   */
  MDCTab.prototype.activate = function activate(computeIndicatorClientRect) {
    this.foundation_.activate(computeIndicatorClientRect);
  };

  /**
   * Deactivates the tab
   */


  MDCTab.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  /**
   * Returns the indicator's client rect
   * @return {!ClientRect}
   */


  MDCTab.prototype.computeIndicatorClientRect = function computeIndicatorClientRect() {
    return this.tabIndicator_.computeContentClientRect();
  };

  /**
   * @return {!MDCTabDimensions}
   */


  MDCTab.prototype.computeDimensions = function computeDimensions() {
    return this.foundation_.computeDimensions();
  };

  /**
   * Focuses the tab
   */


  MDCTab.prototype.focus = function focus() {
    this.root_.focus();
  };

  tab__createClass(MDCTab, [{
    key: 'active',
    get: function get() {
      return this.foundation_.isActive();
    }
  }]);

  return MDCTab;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/adapter.js
function tab_scroller_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * MDCTabScrollerAnimation contains the values required for animating from the
 * current scroll position to the new scroll position. The "finalScrollPosition"
 * value represents the new scroll position while the "scrollDelta" value is the
 * corresponding transformation that is applied to the scroll content. Together,
 * they create the animation by first updating the scroll value then applying
 * the transformation and animating the transition. Both pieces are necessary
 * for the scroll animation to work. The values are used as-is by the tab
 * scroller animation method, ensuring that all logic for determining scroll
 * position or transformation is abstracted away from the animation method.
 * @typedef {{finalScrollPosition: number, scrollDelta: number}}
 */
var MDCTabScrollerAnimation = void 0;

/**
 * MDCTabScrollerHorizontalEdges represents the left and right edges of the
 * scroll content. These values vary depending on how scrolling in RTL is
 * implemented by the browser. One value is always 0 and one value is always
 * the max scrollable value as either a positive or negative integer.
 * @typedef {{left: number, right: number}}
 */
var MDCTabScrollerHorizontalEdges = void 0;

/**
 * Adapter for MDC Tab Scroller.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Tab  into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

var MDCTabScrollerAdapter = function () {
  function MDCTabScrollerAdapter() {
    tab_scroller_adapter__classCallCheck(this, MDCTabScrollerAdapter);
  }

  /**
   * Adds the given className to the root element.
   * @param {string} className The className to add
   */
  MDCTabScrollerAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes the given className from the root element.
   * @param {string} className The className to remove
   */


  MDCTabScrollerAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Adds the given className to the scroll area element.
   * @param {string} className The className to add
   */


  MDCTabScrollerAdapter.prototype.addScrollAreaClass = function addScrollAreaClass(className) {};

  /**
   * Returns whether the event target matches given className.
   * @param {EventTarget} evtTarget The event target
   * @param {string} selector The selector to check
   * @return {boolean}
   */


  MDCTabScrollerAdapter.prototype.eventTargetMatchesSelector = function eventTargetMatchesSelector(evtTarget, selector) {};

  /**
   * Sets a style property of the area element to the passed value.
   * @param {string} propName The style property name to set
   * @param {string} value The style property value
   */


  MDCTabScrollerAdapter.prototype.setScrollAreaStyleProperty = function setScrollAreaStyleProperty(propName, value) {};

  /**
   * Sets a style property of the content element to the passed value.
   * @param {string} propName The style property name to set
   * @param {string} value The style property value
   */


  MDCTabScrollerAdapter.prototype.setScrollContentStyleProperty = function setScrollContentStyleProperty(propName, value) {};

  /**
   * Returns the scroll content element's computed style value of the given css property `propertyName`.
   * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
   * @param {string} propertyName
   * @return {string}
   */


  MDCTabScrollerAdapter.prototype.getScrollContentStyleValue = function getScrollContentStyleValue(propertyName) {};

  /**
   * Sets the scrollLeft value of the scroll area element to the passed value.
   * @param {number} scrollLeft The new scrollLeft value
   */


  MDCTabScrollerAdapter.prototype.setScrollAreaScrollLeft = function setScrollAreaScrollLeft(scrollLeft) {};

  /**
   * Returns the scrollLeft value of the scroll area element.
   * @return {number}
   */


  MDCTabScrollerAdapter.prototype.getScrollAreaScrollLeft = function getScrollAreaScrollLeft() {};

  /**
   * Returns the offsetWidth of the scroll content element.
   * @return {number}
   */


  MDCTabScrollerAdapter.prototype.getScrollContentOffsetWidth = function getScrollContentOffsetWidth() {};

  /**
   * Returns the offsetWitdth of the scroll area element.
   * @return {number}
   */


  MDCTabScrollerAdapter.prototype.getScrollAreaOffsetWidth = function getScrollAreaOffsetWidth() {};

  /**
   * Returns the bounding client rect of the scroll area element.
   * @return {!ClientRect}
   */


  MDCTabScrollerAdapter.prototype.computeScrollAreaClientRect = function computeScrollAreaClientRect() {};

  /**
   * Returns the bounding client rect of the scroll content element.
   * @return {!ClientRect}
   */


  MDCTabScrollerAdapter.prototype.computeScrollContentClientRect = function computeScrollContentClientRect() {};

  /**
   * Returns the height of the browser's horizontal scrollbars (in px).
   * @return {number}
   */


  MDCTabScrollerAdapter.prototype.computeHorizontalScrollbarHeight = function computeHorizontalScrollbarHeight() {};

  return MDCTabScrollerAdapter;
}();


// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var tab_scroller_constants_cssClasses = {
  ANIMATING: 'mdc-tab-scroller--animating',
  SCROLL_TEST: 'mdc-tab-scroller__test',
  SCROLL_AREA_SCROLL: 'mdc-tab-scroller__scroll-area--scroll'
};

/** @enum {string} */
var tab_scroller_constants_strings = {
  AREA_SELECTOR: '.mdc-tab-scroller__scroll-area',
  CONTENT_SELECTOR: '.mdc-tab-scroller__scroll-content'
};


// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/rtl-scroller.js
function rtl_scroller__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @abstract
 */

var MDCTabScrollerRTL = function () {
  /** @param {!MDCTabScrollerAdapter} adapter */
  function MDCTabScrollerRTL(adapter) {
    rtl_scroller__classCallCheck(this, MDCTabScrollerRTL);

    /** @private */
    this.adapter_ = adapter;
  }

  /**
   * @param {number} translateX The current translateX position
   * @return {number}
   * @abstract
   */


  MDCTabScrollerRTL.prototype.getScrollPositionRTL = function getScrollPositionRTL(translateX) {};

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   * @abstract
   */


  MDCTabScrollerRTL.prototype.scrollToRTL = function scrollToRTL(scrollX) {};

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   * @abstract
   */


  MDCTabScrollerRTL.prototype.incrementScrollRTL = function incrementScrollRTL(scrollX) {};

  /**
   * @param {number} scrollX The current scrollX position
   * @param {number} translateX The current translateX position
   * @return {number}
   * @abstract
   */


  MDCTabScrollerRTL.prototype.getAnimatingScrollPosition = function getAnimatingScrollPosition(scrollX, translateX) {};

  return MDCTabScrollerRTL;
}();

/* harmony default export */ var rtl_scroller = (MDCTabScrollerRTL);
// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/rtl-default-scroller.js
function rtl_default_scroller__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function rtl_default_scroller__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function rtl_default_scroller__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends {MDCTabScrollerRTL}
 * @final
 */

var MDCTabScrollerRTLDefault = function (_MDCTabScrollerRTL) {
  rtl_default_scroller__inherits(MDCTabScrollerRTLDefault, _MDCTabScrollerRTL);

  function MDCTabScrollerRTLDefault() {
    rtl_default_scroller__classCallCheck(this, MDCTabScrollerRTLDefault);

    return rtl_default_scroller__possibleConstructorReturn(this, _MDCTabScrollerRTL.apply(this, arguments));
  }

  /**
   * @return {number}
   */
  MDCTabScrollerRTLDefault.prototype.getScrollPositionRTL = function getScrollPositionRTL() {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();

    var _calculateScrollEdges = this.calculateScrollEdges_(),
        right = _calculateScrollEdges.right;
    // Scroll values on most browsers are ints instead of floats so we round


    return Math.round(right - currentScrollLeft);
  };

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  MDCTabScrollerRTLDefault.prototype.scrollToRTL = function scrollToRTL(scrollX) {
    var edges = this.calculateScrollEdges_();
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
    return (/** @type {!MDCTabScrollerAnimation} */{
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  MDCTabScrollerRTLDefault.prototype.incrementScrollRTL = function incrementScrollRTL(scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return (/** @type {!MDCTabScrollerAnimation} */{
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {number}
   */


  MDCTabScrollerRTLDefault.prototype.getAnimatingScrollPosition = function getAnimatingScrollPosition(scrollX) {
    return scrollX;
  };

  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  MDCTabScrollerRTLDefault.prototype.calculateScrollEdges_ = function calculateScrollEdges_() {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (/** @type {!MDCTabScrollerHorizontalEdges} */{
        left: 0,
        right: contentWidth - rootWidth
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {number}
   * @private
   */


  MDCTabScrollerRTLDefault.prototype.clampScrollValue_ = function clampScrollValue_(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  };

  return MDCTabScrollerRTLDefault;
}(rtl_scroller);

/* harmony default export */ var rtl_default_scroller = (MDCTabScrollerRTLDefault);
// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/rtl-negative-scroller.js
function rtl_negative_scroller__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function rtl_negative_scroller__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function rtl_negative_scroller__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends {MDCTabScrollerRTL}
 * @final
 */

var MDCTabScrollerRTLNegative = function (_MDCTabScrollerRTL) {
  rtl_negative_scroller__inherits(MDCTabScrollerRTLNegative, _MDCTabScrollerRTL);

  function MDCTabScrollerRTLNegative() {
    rtl_negative_scroller__classCallCheck(this, MDCTabScrollerRTLNegative);

    return rtl_negative_scroller__possibleConstructorReturn(this, _MDCTabScrollerRTL.apply(this, arguments));
  }

  /**
   * @param {number} translateX The current translateX position
   * @return {number}
   */
  MDCTabScrollerRTLNegative.prototype.getScrollPositionRTL = function getScrollPositionRTL(translateX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    return Math.round(translateX - currentScrollLeft);
  };

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  MDCTabScrollerRTLNegative.prototype.scrollToRTL = function scrollToRTL(scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(-scrollX);
    return (/** @type {!MDCTabScrollerAnimation} */{
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  MDCTabScrollerRTLNegative.prototype.incrementScrollRTL = function incrementScrollRTL(scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return (/** @type {!MDCTabScrollerAnimation} */{
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      }
    );
  };

  /**
   * @param {number} scrollX
   * @param {number} translateX
   * @return {number}
   */


  MDCTabScrollerRTLNegative.prototype.getAnimatingScrollPosition = function getAnimatingScrollPosition(scrollX, translateX) {
    return scrollX - translateX;
  };

  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  MDCTabScrollerRTLNegative.prototype.calculateScrollEdges_ = function calculateScrollEdges_() {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (/** @type {!MDCTabScrollerHorizontalEdges} */{
        left: rootWidth - contentWidth,
        right: 0
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {number}
   * @private
   */


  MDCTabScrollerRTLNegative.prototype.clampScrollValue_ = function clampScrollValue_(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.max(Math.min(edges.right, scrollX), edges.left);
  };

  return MDCTabScrollerRTLNegative;
}(rtl_scroller);

/* harmony default export */ var rtl_negative_scroller = (MDCTabScrollerRTLNegative);
// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/rtl-reverse-scroller.js
function rtl_reverse_scroller__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function rtl_reverse_scroller__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function rtl_reverse_scroller__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends {MDCTabScrollerRTL}
 * @final
 */

var MDCTabScrollerRTLReverse = function (_MDCTabScrollerRTL) {
  rtl_reverse_scroller__inherits(MDCTabScrollerRTLReverse, _MDCTabScrollerRTL);

  function MDCTabScrollerRTLReverse() {
    rtl_reverse_scroller__classCallCheck(this, MDCTabScrollerRTLReverse);

    return rtl_reverse_scroller__possibleConstructorReturn(this, _MDCTabScrollerRTL.apply(this, arguments));
  }

  /**
   * @param {number} translateX
   * @return {number}
   */
  MDCTabScrollerRTLReverse.prototype.getScrollPositionRTL = function getScrollPositionRTL(translateX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    // Scroll values on most browsers are ints instead of floats so we round
    return Math.round(currentScrollLeft - translateX);
  };

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  MDCTabScrollerRTLReverse.prototype.scrollToRTL = function scrollToRTL(scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(scrollX);
    return (/** @type {!MDCTabScrollerAnimation} */{
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: currentScrollLeft - clampedScrollLeft
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {!MDCTabScrollerAnimation}
   */


  MDCTabScrollerRTLReverse.prototype.incrementScrollRTL = function incrementScrollRTL(scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
    return (/** @type {!MDCTabScrollerAnimation} */{
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: currentScrollLeft - clampedScrollLeft
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {number}
   */


  MDCTabScrollerRTLReverse.prototype.getAnimatingScrollPosition = function getAnimatingScrollPosition(scrollX, translateX) {
    return scrollX + translateX;
  };

  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  MDCTabScrollerRTLReverse.prototype.calculateScrollEdges_ = function calculateScrollEdges_() {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (/** @type {!MDCTabScrollerHorizontalEdges} */{
        left: contentWidth - rootWidth,
        right: 0
      }
    );
  };

  /**
   * @param {number} scrollX
   * @return {number}
   * @private
   */


  MDCTabScrollerRTLReverse.prototype.clampScrollValue_ = function clampScrollValue_(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.right, scrollX), edges.left);
  };

  return MDCTabScrollerRTLReverse;
}(rtl_scroller);

/* harmony default export */ var rtl_reverse_scroller = (MDCTabScrollerRTLReverse);
// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/foundation.js
var tab_scroller_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var tab_scroller_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function tab_scroller_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tab_scroller_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function tab_scroller_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */




/**
 * @extends {MDCFoundation<!MDCTabScrollerAdapter>}
 * @final
 */

var foundation_MDCTabScrollerFoundation = function (_MDCFoundation) {
  tab_scroller_foundation__inherits(MDCTabScrollerFoundation, _MDCFoundation);

  tab_scroller_foundation__createClass(MDCTabScrollerFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return tab_scroller_constants_cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return tab_scroller_constants_strings;
    }

    /**
     * @see MDCTabScrollerAdapter for typing information
     * @return {!MDCTabScrollerAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTabScrollerAdapter} */{
          eventTargetMatchesSelector: function eventTargetMatchesSelector() {},
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          addScrollAreaClass: function addScrollAreaClass() {},
          setScrollAreaStyleProperty: function setScrollAreaStyleProperty() {},
          setScrollContentStyleProperty: function setScrollContentStyleProperty() {},
          getScrollContentStyleValue: function getScrollContentStyleValue() {},
          setScrollAreaScrollLeft: function setScrollAreaScrollLeft() {},
          getScrollAreaScrollLeft: function getScrollAreaScrollLeft() {},
          getScrollContentOffsetWidth: function getScrollContentOffsetWidth() {},
          getScrollAreaOffsetWidth: function getScrollAreaOffsetWidth() {},
          computeScrollAreaClientRect: function computeScrollAreaClientRect() {},
          computeScrollContentClientRect: function computeScrollContentClientRect() {},
          computeHorizontalScrollbarHeight: function computeHorizontalScrollbarHeight() {}
        }
      );
    }

    /** @param {!MDCTabScrollerAdapter} adapter */

  }]);

  function MDCTabScrollerFoundation(adapter) {
    tab_scroller_foundation__classCallCheck(this, MDCTabScrollerFoundation);

    /**
     * This boolean controls whether we should handle the transitionend and interaction events during the animation.
     * @private {boolean}
     */
    var _this = tab_scroller_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, tab_scroller_foundation__extends(MDCTabScrollerFoundation.defaultAdapter, adapter)));

    _this.isAnimating_ = false;

    /**
     * The MDCTabScrollerRTL instance varies per browser and allows us to encapsulate the peculiar browser behavior
     * of RTL scrolling in it's own class.
     * @private {?MDCTabScrollerRTL}
     */
    _this.rtlScrollerInstance_;
    return _this;
  }

  MDCTabScrollerFoundation.prototype.init = function init() {
    // Compute horizontal scrollbar height on scroller with overflow initially hidden, then update overflow to scroll
    // and immediately adjust bottom margin to avoid the scrollbar initially appearing before JS runs.
    var horizontalScrollbarHeight = this.adapter_.computeHorizontalScrollbarHeight();
    this.adapter_.setScrollAreaStyleProperty('margin-bottom', -horizontalScrollbarHeight + 'px');
    this.adapter_.addScrollAreaClass(MDCTabScrollerFoundation.cssClasses.SCROLL_AREA_SCROLL);
  };

  /**
   * Computes the current visual scroll position
   * @return {number}
   */


  MDCTabScrollerFoundation.prototype.getScrollPosition = function getScrollPosition() {
    if (this.isRTL_()) {
      return this.computeCurrentScrollPositionRTL_();
    }

    var currentTranslateX = this.calculateCurrentTranslateX_();
    var scrollLeft = this.adapter_.getScrollAreaScrollLeft();
    return scrollLeft - currentTranslateX;
  };

  /**
   * Handles interaction events that occur during transition
   */


  MDCTabScrollerFoundation.prototype.handleInteraction = function handleInteraction() {
    // Early exit if we aren't animating
    if (!this.isAnimating_) {
      return;
    }

    // Prevent other event listeners from handling this event
    this.stopScrollAnimation_();
  };

  /**
   * Handles the transitionend event
   * @param {!Event} evt
   */


  MDCTabScrollerFoundation.prototype.handleTransitionEnd = function handleTransitionEnd(evt) {
    // Early exit if we aren't animating or the event was triggered by a different element.
    if (!this.isAnimating_ || !this.adapter_.eventTargetMatchesSelector(evt.target, MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)) {
      return;
    }

    this.isAnimating_ = false;
    this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
  };

  /**
   * Increment the scroll value by the scrollXIncrement
   * @param {number} scrollXIncrement The value by which to increment the scroll position
   */


  MDCTabScrollerFoundation.prototype.incrementScroll = function incrementScroll(scrollXIncrement) {
    // Early exit for non-operational increment values
    if (scrollXIncrement === 0) {
      return;
    }

    if (this.isRTL_()) {
      return this.incrementScrollRTL_(scrollXIncrement);
    }

    this.incrementScroll_(scrollXIncrement);
  };

  /**
   * Scrolls to the given scrollX value
   * @param {number} scrollX
   */


  MDCTabScrollerFoundation.prototype.scrollTo = function scrollTo(scrollX) {
    if (this.isRTL_()) {
      return this.scrollToRTL_(scrollX);
    }

    this.scrollTo_(scrollX);
  };

  /**
   * Returns the appropriate version of the MDCTabScrollerRTL
   * @return {!MDCTabScrollerRTL}
   */


  MDCTabScrollerFoundation.prototype.getRTLScroller = function getRTLScroller() {
    if (!this.rtlScrollerInstance_) {
      this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
    }

    return this.rtlScrollerInstance_;
  };

  /**
   * Returns the translateX value from a CSS matrix transform function string
   * @return {number}
   * @private
   */


  MDCTabScrollerFoundation.prototype.calculateCurrentTranslateX_ = function calculateCurrentTranslateX_() {
    var transformValue = this.adapter_.getScrollContentStyleValue('transform');
    // Early exit if no transform is present
    if (transformValue === 'none') {
      return 0;
    }

    // The transform value comes back as a matrix transformation in the form
    // of `matrix(a, b, c, d, tx, ty)`. We only care about tx (translateX) so
    // we're going to grab all the parenthesized values, strip out tx, and
    // parse it.
    var results = /\((.+)\)/.exec(transformValue)[1];
    var parts = results.split(',');
    return parseFloat(parts[4]);
  };

  /**
   * Calculates a safe scroll value that is > 0 and < the max scroll value
   * @param {number} scrollX The distance to scroll
   * @return {number}
   * @private
   */


  MDCTabScrollerFoundation.prototype.clampScrollValue_ = function clampScrollValue_(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  };

  /**
   * @return {number}
   * @private
   */


  MDCTabScrollerFoundation.prototype.computeCurrentScrollPositionRTL_ = function computeCurrentScrollPositionRTL_() {
    var translateX = this.calculateCurrentTranslateX_();
    return this.getRTLScroller().getScrollPositionRTL(translateX);
  };

  /**
   * @return {!MDCTabScrollerHorizontalEdges}
   * @private
   */


  MDCTabScrollerFoundation.prototype.calculateScrollEdges_ = function calculateScrollEdges_() {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return (/** @type {!MDCTabScrollerHorizontalEdges} */{
        left: 0,
        right: contentWidth - rootWidth
      }
    );
  };

  /**
   * Internal scroll method
   * @param {number} scrollX The new scroll position
   * @private
   */


  MDCTabScrollerFoundation.prototype.scrollTo_ = function scrollTo_(scrollX) {
    var currentScrollX = this.getScrollPosition();
    var safeScrollX = this.clampScrollValue_(scrollX);
    var scrollDelta = safeScrollX - currentScrollX;
    this.animate_( /** @type {!MDCTabScrollerAnimation} */{
      finalScrollPosition: safeScrollX,
      scrollDelta: scrollDelta
    });
  };

  /**
   * Internal RTL scroll method
   * @param {number} scrollX The new scroll position
   * @private
   */


  MDCTabScrollerFoundation.prototype.scrollToRTL_ = function scrollToRTL_(scrollX) {
    var animation = this.getRTLScroller().scrollToRTL(scrollX);
    this.animate_(animation);
  };

  /**
   * Internal increment scroll method
   * @param {number} scrollX The new scroll position increment
   * @private
   */


  MDCTabScrollerFoundation.prototype.incrementScroll_ = function incrementScroll_(scrollX) {
    var currentScrollX = this.getScrollPosition();
    var targetScrollX = scrollX + currentScrollX;
    var safeScrollX = this.clampScrollValue_(targetScrollX);
    var scrollDelta = safeScrollX - currentScrollX;
    this.animate_( /** @type {!MDCTabScrollerAnimation} */{
      finalScrollPosition: safeScrollX,
      scrollDelta: scrollDelta
    });
  };

  /**
   * Internal incremenet scroll RTL method
   * @param {number} scrollX The new scroll position RTL increment
   * @private
   */


  MDCTabScrollerFoundation.prototype.incrementScrollRTL_ = function incrementScrollRTL_(scrollX) {
    var animation = this.getRTLScroller().incrementScrollRTL(scrollX);
    this.animate_(animation);
  };

  /**
   * Animates the tab scrolling
   * @param {!MDCTabScrollerAnimation} animation The animation to apply
   * @private
   */


  MDCTabScrollerFoundation.prototype.animate_ = function animate_(animation) {
    var _this2 = this;

    // Early exit if translateX is 0, which means there's no animation to perform
    if (animation.scrollDelta === 0) {
      return;
    }

    this.stopScrollAnimation_();
    // This animation uses the FLIP approach.
    // Read more here: https://aerotwist.com/blog/flip-your-animations/
    this.adapter_.setScrollAreaScrollLeft(animation.finalScrollPosition);
    this.adapter_.setScrollContentStyleProperty('transform', 'translateX(' + animation.scrollDelta + 'px)');
    // Force repaint
    this.adapter_.computeScrollAreaClientRect();

    requestAnimationFrame(function () {
      _this2.adapter_.addClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
      _this2.adapter_.setScrollContentStyleProperty('transform', 'none');
    });

    this.isAnimating_ = true;
  };

  /**
   * Stops scroll animation
   * @private
   */


  MDCTabScrollerFoundation.prototype.stopScrollAnimation_ = function stopScrollAnimation_() {
    this.isAnimating_ = false;
    var currentScrollPosition = this.getAnimatingScrollPosition_();
    this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
    this.adapter_.setScrollContentStyleProperty('transform', 'translateX(0px)');
    this.adapter_.setScrollAreaScrollLeft(currentScrollPosition);
  };

  /**
   * Gets the current scroll position during animation
   * @return {number}
   * @private
   */


  MDCTabScrollerFoundation.prototype.getAnimatingScrollPosition_ = function getAnimatingScrollPosition_() {
    var currentTranslateX = this.calculateCurrentTranslateX_();
    var scrollLeft = this.adapter_.getScrollAreaScrollLeft();
    if (this.isRTL_()) {
      return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
    }

    return scrollLeft - currentTranslateX;
  };

  /**
   * Determines the RTL Scroller to use
   * @return {!MDCTabScrollerRTL}
   * @private
   */


  MDCTabScrollerFoundation.prototype.rtlScrollerFactory_ = function rtlScrollerFactory_() {
    // Browsers have three different implementations of scrollLeft in RTL mode,
    // dependent on the browser. The behavior is based off the max LTR
    // scrollleft value and 0.
    //
    // * Default scrolling in RTL *
    //    - Left-most value: 0
    //    - Right-most value: Max LTR scrollLeft value
    //
    // * Negative scrolling in RTL *
    //    - Left-most value: Negated max LTR scrollLeft value
    //    - Right-most value: 0
    //
    // * Reverse scrolling in RTL *
    //    - Left-most value: Max LTR scrollLeft value
    //    - Right-most value: 0
    //
    // We use those principles below to determine which RTL scrollLeft
    // behavior is implemented in the current browser.
    var initialScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft - 1);
    var newScrollLeft = this.adapter_.getScrollAreaScrollLeft();

    // If the newScrollLeft value is negative,then we know that the browser has
    // implemented negative RTL scrolling, since all other implementations have
    // only positive values.
    if (newScrollLeft < 0) {
      // Undo the scrollLeft test check
      this.adapter_.setScrollAreaScrollLeft(initialScrollLeft);
      return new rtl_negative_scroller(this.adapter_);
    }

    var rootClientRect = this.adapter_.computeScrollAreaClientRect();
    var contentClientRect = this.adapter_.computeScrollContentClientRect();
    var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right);
    // Undo the scrollLeft test check
    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft);

    // By calculating the clientRect of the root element and the clientRect of
    // the content element, we can determine how much the scroll value changed
    // when we performed the scrollLeft subtraction above.
    if (rightEdgeDelta === newScrollLeft) {
      return new rtl_reverse_scroller(this.adapter_);
    }

    return new rtl_default_scroller(this.adapter_);
  };

  /**
   * @return {boolean}
   * @private
   */


  MDCTabScrollerFoundation.prototype.isRTL_ = function isRTL_() {
    return this.adapter_.getScrollContentStyleValue('direction') === 'rtl';
  };

  return MDCTabScrollerFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var tab_scroller_foundation = (foundation_MDCTabScrollerFoundation);
// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/util.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * Stores result from computeHorizontalScrollbarHeight to avoid redundant processing.
 * @private {number|undefined}
 */
var horizontalScrollbarHeight_ = void 0;

/**
 * Computes the height of browser-rendered horizontal scrollbars using a self-created test element.
 * May return 0 (e.g. on OS X browsers under default configuration).
 * @param {!Document} documentObj
 * @param {boolean=} shouldCacheResult
 * @return {number}
 */
function util_computeHorizontalScrollbarHeight(documentObj) {
  var shouldCacheResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (shouldCacheResult && typeof horizontalScrollbarHeight_ !== 'undefined') {
    return horizontalScrollbarHeight_;
  }

  var el = documentObj.createElement('div');
  el.classList.add(tab_scroller_constants_cssClasses.SCROLL_TEST);
  documentObj.body.appendChild(el);

  var horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
  documentObj.body.removeChild(el);

  if (shouldCacheResult) {
    horizontalScrollbarHeight_ = horizontalScrollbarHeight;
  }
  return horizontalScrollbarHeight;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}


// CONCATENATED MODULE: ../node_modules/@material/tab-scroller/index.js
function tab_scroller__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tab_scroller__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function tab_scroller__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */







/**
 * @extends {MDCComponent<!MDCTabScrollerFoundation>}
 * @final
 */

var tab_scroller_MDCTabScroller = function (_MDCComponent) {
  tab_scroller__inherits(MDCTabScroller, _MDCComponent);

  /**
   * @param {!Element} root
   * @return {!MDCTabScroller}
   */
  MDCTabScroller.attachTo = function attachTo(root) {
    return new MDCTabScroller(root);
  };

  function MDCTabScroller() {
    tab_scroller__classCallCheck(this, MDCTabScroller);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {?Element} */
    var _this = tab_scroller__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.content_;

    /** @private {?Element} */
    _this.area_;

    /** @private {?function(?Event): undefined} */
    _this.handleInteraction_;

    /** @private {?function(!Event): undefined} */
    _this.handleTransitionEnd_;
    return _this;
  }

  MDCTabScroller.prototype.initialize = function initialize() {
    this.area_ = this.root_.querySelector(tab_scroller_foundation.strings.AREA_SELECTOR);
    this.content_ = this.root_.querySelector(tab_scroller_foundation.strings.CONTENT_SELECTOR);
  };

  MDCTabScroller.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    var _this2 = this;

    this.handleInteraction_ = function () {
      return _this2.foundation_.handleInteraction();
    };
    this.handleTransitionEnd_ = function (evt) {
      return _this2.foundation_.handleTransitionEnd(evt);
    };

    this.area_.addEventListener('wheel', this.handleInteraction_);
    this.area_.addEventListener('touchstart', this.handleInteraction_);
    this.area_.addEventListener('pointerdown', this.handleInteraction_);
    this.area_.addEventListener('mousedown', this.handleInteraction_);
    this.area_.addEventListener('keydown', this.handleInteraction_);
    this.content_.addEventListener('transitionend', this.handleTransitionEnd_);
  };

  MDCTabScroller.prototype.destroy = function destroy() {
    _MDCComponent.prototype.destroy.call(this);

    this.area_.removeEventListener('wheel', this.handleInteraction_);
    this.area_.removeEventListener('touchstart', this.handleInteraction_);
    this.area_.removeEventListener('pointerdown', this.handleInteraction_);
    this.area_.removeEventListener('mousedown', this.handleInteraction_);
    this.area_.removeEventListener('keydown', this.handleInteraction_);
    this.content_.removeEventListener('transitionend', this.handleTransitionEnd_);
  };

  /**
   * @return {!MDCTabScrollerFoundation}
   */


  MDCTabScroller.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this3 = this;

    var adapter = /** @type {!MDCTabScrollerAdapter} */{
      eventTargetMatchesSelector: function eventTargetMatchesSelector(evtTarget, selector) {
        var MATCHES = getMatchesProperty(HTMLElement.prototype);
        return evtTarget[MATCHES](selector);
      },
      addClass: function addClass(className) {
        return _this3.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this3.root_.classList.remove(className);
      },
      addScrollAreaClass: function addScrollAreaClass(className) {
        return _this3.area_.classList.add(className);
      },
      setScrollAreaStyleProperty: function setScrollAreaStyleProperty(prop, value) {
        return _this3.area_.style.setProperty(prop, value);
      },
      setScrollContentStyleProperty: function setScrollContentStyleProperty(prop, value) {
        return _this3.content_.style.setProperty(prop, value);
      },
      getScrollContentStyleValue: function getScrollContentStyleValue(propName) {
        return window.getComputedStyle(_this3.content_).getPropertyValue(propName);
      },
      setScrollAreaScrollLeft: function setScrollAreaScrollLeft(scrollX) {
        return _this3.area_.scrollLeft = scrollX;
      },
      getScrollAreaScrollLeft: function getScrollAreaScrollLeft() {
        return _this3.area_.scrollLeft;
      },
      getScrollContentOffsetWidth: function getScrollContentOffsetWidth() {
        return _this3.content_.offsetWidth;
      },
      getScrollAreaOffsetWidth: function getScrollAreaOffsetWidth() {
        return _this3.area_.offsetWidth;
      },
      computeScrollAreaClientRect: function computeScrollAreaClientRect() {
        return _this3.area_.getBoundingClientRect();
      },
      computeScrollContentClientRect: function computeScrollContentClientRect() {
        return _this3.content_.getBoundingClientRect();
      },
      computeHorizontalScrollbarHeight: function computeHorizontalScrollbarHeight() {
        return util_computeHorizontalScrollbarHeight(document);
      }
    };

    return new tab_scroller_foundation(adapter);
  };

  /**
   * Returns the current visual scroll position
   * @return {number}
   */


  MDCTabScroller.prototype.getScrollPosition = function getScrollPosition() {
    return this.foundation_.getScrollPosition();
  };

  /**
   * Returns the width of the scroll content
   * @return {number}
   */


  MDCTabScroller.prototype.getScrollContentWidth = function getScrollContentWidth() {
    return this.content_.offsetWidth;
  };

  /**
   * Increments the scroll value by the given amount
   * @param {number} scrollXIncrement The pixel value by which to increment the scroll value
   */


  MDCTabScroller.prototype.incrementScroll = function incrementScroll(scrollXIncrement) {
    this.foundation_.incrementScroll(scrollXIncrement);
  };

  /**
   * Scrolls to the given pixel position
   * @param {number} scrollX The pixel value to scroll to
   */


  MDCTabScroller.prototype.scrollTo = function scrollTo(scrollX) {
    this.foundation_.scrollTo(scrollX);
  };

  return MDCTabScroller;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/tab-bar/adapter.js
function tab_bar_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * Adapter for MDC Tab Bar.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Tab Bar into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

var MDCTabBarAdapter = function () {
  function MDCTabBarAdapter() {
    tab_bar_adapter__classCallCheck(this, MDCTabBarAdapter);
  }

  /**
   * Scrolls to the given position
   * @param {number} scrollX The position to scroll to
   */
  MDCTabBarAdapter.prototype.scrollTo = function scrollTo(scrollX) {};

  /**
   * Increments the current scroll position by the given amount
   * @param {number} scrollXIncrement The amount to increment scroll
   */


  MDCTabBarAdapter.prototype.incrementScroll = function incrementScroll(scrollXIncrement) {};

  /**
   * Returns the current scroll position
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getScrollPosition = function getScrollPosition() {};

  /**
   * Returns the width of the scroll content
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getScrollContentWidth = function getScrollContentWidth() {};

  /**
   * Returns the root element's offsetWidth
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getOffsetWidth = function getOffsetWidth() {};

  /**
   * Returns if the Tab Bar language direction is RTL
   * @return {boolean}
   */


  MDCTabBarAdapter.prototype.isRTL = function isRTL() {};

  /**
   * Sets the tab at the given index to be activated
   * @param {number} index The index of the tab to activate
   */


  MDCTabBarAdapter.prototype.setActiveTab = function setActiveTab(index) {};

  /**
   * Activates the tab at the given index with the given client rect
   * @param {number} index The index of the tab to activate
   * @param {!ClientRect} clientRect The client rect of the previously active Tab Indicator
   */


  MDCTabBarAdapter.prototype.activateTabAtIndex = function activateTabAtIndex(index, clientRect) {};

  /**
   * Deactivates the tab at the given index
   * @param {number} index The index of the tab to deactivate
   */


  MDCTabBarAdapter.prototype.deactivateTabAtIndex = function deactivateTabAtIndex(index) {};

  /**
   * Focuses the tab at the given index
   * @param {number} index The index of the tab to focus
   */


  MDCTabBarAdapter.prototype.focusTabAtIndex = function focusTabAtIndex(index) {};

  /**
   * Returns the client rect of the tab's indicator
   * @param {number} index The index of the tab
   * @return {!ClientRect}
   */


  MDCTabBarAdapter.prototype.getTabIndicatorClientRectAtIndex = function getTabIndicatorClientRectAtIndex(index) {};

  /**
   * Returns the tab dimensions of the tab at the given index
   * @param {number} index The index of the tab
   * @return {!MDCTabDimensions}
   */


  MDCTabBarAdapter.prototype.getTabDimensionsAtIndex = function getTabDimensionsAtIndex(index) {};

  /**
   * Returns the length of the tab list
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getTabListLength = function getTabListLength() {};

  /**
   * Returns the index of the previously active tab
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getPreviousActiveTabIndex = function getPreviousActiveTabIndex() {};

  /**
   * Returns the index of the focused tab
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getFocusedTabIndex = function getFocusedTabIndex() {};

  /**
   * Returns the index of the given tab
   * @param {!MDCTab} tab The tab whose index to determin
   * @return {number}
   */


  MDCTabBarAdapter.prototype.getIndexOfTab = function getIndexOfTab(tab) {};

  /**
   * Emits the MDCTabBar:activated event
   * @param {number} index The index of the activated tab
   */


  MDCTabBarAdapter.prototype.notifyTabActivated = function notifyTabActivated(index) {};

  return MDCTabBarAdapter;
}();

/* harmony default export */ var tab_bar_adapter = (MDCTabBarAdapter);
// CONCATENATED MODULE: ../node_modules/@material/tab-bar/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var tab_bar_constants_strings = {
  TAB_ACTIVATED_EVENT: 'MDCTabBar:activated',
  TAB_SCROLLER_SELECTOR: '.mdc-tab-scroller',
  TAB_SELECTOR: '.mdc-tab',
  ARROW_LEFT_KEY: 'ArrowLeft',
  ARROW_RIGHT_KEY: 'ArrowRight',
  END_KEY: 'End',
  HOME_KEY: 'Home',
  ENTER_KEY: 'Enter',
  SPACE_KEY: 'Space'
};

/** @enum {number} */
var numbers = {
  EXTRA_SCROLL_AMOUNT: 20,
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  HOME_KEYCODE: 36,
  ENTER_KEYCODE: 13,
  SPACE_KEYCODE: 32
};


// CONCATENATED MODULE: ../node_modules/@material/tab-bar/foundation.js
var tab_bar_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var tab_bar_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function tab_bar_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tab_bar_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function tab_bar_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @type {Set<string>}
 */
var ACCEPTABLE_KEYS = new Set();
// IE11 has no support for new Set with iterable so we need to initialize this by hand
ACCEPTABLE_KEYS.add(tab_bar_constants_strings.ARROW_LEFT_KEY);
ACCEPTABLE_KEYS.add(tab_bar_constants_strings.ARROW_RIGHT_KEY);
ACCEPTABLE_KEYS.add(tab_bar_constants_strings.END_KEY);
ACCEPTABLE_KEYS.add(tab_bar_constants_strings.HOME_KEY);
ACCEPTABLE_KEYS.add(tab_bar_constants_strings.ENTER_KEY);
ACCEPTABLE_KEYS.add(tab_bar_constants_strings.SPACE_KEY);

/**
 * @type {Map<number, string>}
 */
var KEYCODE_MAP = new Map();
// IE11 has no support for new Map with iterable so we need to initialize this by hand
KEYCODE_MAP.set(numbers.ARROW_LEFT_KEYCODE, tab_bar_constants_strings.ARROW_LEFT_KEY);
KEYCODE_MAP.set(numbers.ARROW_RIGHT_KEYCODE, tab_bar_constants_strings.ARROW_RIGHT_KEY);
KEYCODE_MAP.set(numbers.END_KEYCODE, tab_bar_constants_strings.END_KEY);
KEYCODE_MAP.set(numbers.HOME_KEYCODE, tab_bar_constants_strings.HOME_KEY);
KEYCODE_MAP.set(numbers.ENTER_KEYCODE, tab_bar_constants_strings.ENTER_KEY);
KEYCODE_MAP.set(numbers.SPACE_KEYCODE, tab_bar_constants_strings.SPACE_KEY);

/**
 * @extends {MDCFoundation<!MDCTabBarAdapter>}
 * @final
 */

var foundation_MDCTabBarFoundation = function (_MDCFoundation) {
  tab_bar_foundation__inherits(MDCTabBarFoundation, _MDCFoundation);

  tab_bar_foundation__createClass(MDCTabBarFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return tab_bar_constants_strings;
    }

    /** @return enum {number} */

  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }

    /**
     * @see MDCTabBarAdapter for typing information
     * @return {!MDCTabBarAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTabBarAdapter} */{
          scrollTo: function scrollTo() {},
          incrementScroll: function incrementScroll() {},
          getScrollPosition: function getScrollPosition() {},
          getScrollContentWidth: function getScrollContentWidth() {},
          getOffsetWidth: function getOffsetWidth() {},
          isRTL: function isRTL() {},
          setActiveTab: function setActiveTab() {},
          activateTabAtIndex: function activateTabAtIndex() {},
          deactivateTabAtIndex: function deactivateTabAtIndex() {},
          focusTabAtIndex: function focusTabAtIndex() {},
          getTabIndicatorClientRectAtIndex: function getTabIndicatorClientRectAtIndex() {},
          getTabDimensionsAtIndex: function getTabDimensionsAtIndex() {},
          getPreviousActiveTabIndex: function getPreviousActiveTabIndex() {},
          getFocusedTabIndex: function getFocusedTabIndex() {},
          getIndexOfTab: function getIndexOfTab() {},
          getTabListLength: function getTabListLength() {},
          notifyTabActivated: function notifyTabActivated() {}
        }
      );
    }

    /**
     * @param {!MDCTabBarAdapter} adapter
     * */

  }]);

  function MDCTabBarFoundation(adapter) {
    tab_bar_foundation__classCallCheck(this, MDCTabBarFoundation);

    /** @private {boolean} */
    var _this = tab_bar_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, tab_bar_foundation__extends(MDCTabBarFoundation.defaultAdapter, adapter)));

    _this.useAutomaticActivation_ = false;
    return _this;
  }

  /**
   * Switches between automatic and manual activation modes.
   * See https://www.w3.org/TR/wai-aria-practices/#tabpanel for examples.
   * @param {boolean} useAutomaticActivation
   */


  MDCTabBarFoundation.prototype.setUseAutomaticActivation = function setUseAutomaticActivation(useAutomaticActivation) {
    this.useAutomaticActivation_ = useAutomaticActivation;
  };

  /**
   * Activates the tab at the given index
   * @param {number} index
   */


  MDCTabBarFoundation.prototype.activateTab = function activateTab(index) {
    var previousActiveIndex = this.adapter_.getPreviousActiveTabIndex();
    if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
      return;
    }

    this.adapter_.deactivateTabAtIndex(previousActiveIndex);
    this.adapter_.activateTabAtIndex(index, this.adapter_.getTabIndicatorClientRectAtIndex(previousActiveIndex));
    this.scrollIntoView(index);

    this.adapter_.notifyTabActivated(index);
  };

  /**
   * Handles the keydown event
   * @param {!Event} evt
   */


  MDCTabBarFoundation.prototype.handleKeyDown = function handleKeyDown(evt) {
    // Get the key from the event
    var key = this.getKeyFromEvent_(evt);

    // Early exit if the event key isn't one of the keyboard navigation keys
    if (key === undefined) {
      return;
    }

    // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple
    if (!this.isActivationKey_(key)) {
      evt.preventDefault();
    }

    if (this.useAutomaticActivation_) {
      if (this.isActivationKey_(key)) {
        return;
      }

      var index = this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(), key);
      this.adapter_.setActiveTab(index);
      this.scrollIntoView(index);
    } else {
      var focusedTabIndex = this.adapter_.getFocusedTabIndex();
      if (this.isActivationKey_(key)) {
        this.adapter_.setActiveTab(focusedTabIndex);
      } else {
        var _index = this.determineTargetFromKey_(focusedTabIndex, key);
        this.adapter_.focusTabAtIndex(_index);
        this.scrollIntoView(_index);
      }
    }
  };

  /**
   * Handles the MDCTab:interacted event
   * @param {!Event} evt
   */


  MDCTabBarFoundation.prototype.handleTabInteraction = function handleTabInteraction(evt) {
    this.adapter_.setActiveTab(this.adapter_.getIndexOfTab(evt.detail.tab));
  };

  /**
   * Scrolls the tab at the given index into view
   * @param {number} index The tab index to make visible
   */


  MDCTabBarFoundation.prototype.scrollIntoView = function scrollIntoView(index) {
    // Early exit if the index is out of range
    if (!this.indexIsInRange_(index)) {
      return;
    }

    // Always scroll to 0 if scrolling to the 0th index
    if (index === 0) {
      return this.adapter_.scrollTo(0);
    }

    // Always scroll to the max value if scrolling to the Nth index
    // MDCTabScroller.scrollTo() will never scroll past the max possible value
    if (index === this.adapter_.getTabListLength() - 1) {
      return this.adapter_.scrollTo(this.adapter_.getScrollContentWidth());
    }

    if (this.isRTL_()) {
      return this.scrollIntoViewRTL_(index);
    }

    this.scrollIntoView_(index);
  };

  /**
   * Private method for determining the index of the destination tab based on what key was pressed
   * @param {number} origin The original index from which to determine the destination
   * @param {string} key The name of the key
   * @return {number}
   * @private
   */


  MDCTabBarFoundation.prototype.determineTargetFromKey_ = function determineTargetFromKey_(origin, key) {
    var isRTL = this.isRTL_();
    var maxIndex = this.adapter_.getTabListLength() - 1;
    var shouldGoToEnd = key === tab_bar_constants_strings.END_KEY;
    var shouldDecrement = key === tab_bar_constants_strings.ARROW_LEFT_KEY && !isRTL || key === tab_bar_constants_strings.ARROW_RIGHT_KEY && isRTL;
    var shouldIncrement = key === tab_bar_constants_strings.ARROW_RIGHT_KEY && !isRTL || key === tab_bar_constants_strings.ARROW_LEFT_KEY && isRTL;
    var index = origin;

    if (shouldGoToEnd) {
      index = maxIndex;
    } else if (shouldDecrement) {
      index -= 1;
    } else if (shouldIncrement) {
      index += 1;
    } else {
      index = 0;
    }

    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }

    return index;
  };

  /**
   * Calculates the scroll increment that will make the tab at the given index visible
   * @param {number} index The index of the tab
   * @param {number} nextIndex The index of the next tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the Tab Bar
   * @return {number}
   * @private
   */


  MDCTabBarFoundation.prototype.calculateScrollIncrement_ = function calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth) {
    var nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
    var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
    var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
    var leftIncrement = relativeContentRight - numbers.EXTRA_SCROLL_AMOUNT;
    var rightIncrement = relativeContentLeft + numbers.EXTRA_SCROLL_AMOUNT;

    if (nextIndex < index) {
      return Math.min(leftIncrement, 0);
    }

    return Math.max(rightIncrement, 0);
  };

  /**
   * Calculates the scroll increment that will make the tab at the given index visible in RTL
   * @param {number} index The index of the tab
   * @param {number} nextIndex The index of the next tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the Tab Bar
   * @param {number} scrollContentWidth The width of the scroll content
   * @return {number}
   * @private
   */


  MDCTabBarFoundation.prototype.calculateScrollIncrementRTL_ = function calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
    var nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
    var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
    var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
    var leftIncrement = relativeContentRight + numbers.EXTRA_SCROLL_AMOUNT;
    var rightIncrement = relativeContentLeft - numbers.EXTRA_SCROLL_AMOUNT;

    if (nextIndex > index) {
      return Math.max(leftIncrement, 0);
    }

    return Math.min(rightIncrement, 0);
  };

  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar
   * @param {number} index The index of the tab
   * @param {!MDCTabDimensions} tabDimensions The dimensions of the tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the tab bar
   * @return {number}
   * @private
   */


  MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdge_ = function findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth) {
    /**
     * Tabs are laid out in the Tab Scroller like this:
     *
     *    Scroll Position
     *    +---+
     *    |   |   Bar Width
     *    |   +-----------------------------------+
     *    |   |                                   |
     *    |   V                                   V
     *    |   +-----------------------------------+
     *    V   |             Tab Scroller          |
     *    +------------+--------------+-------------------+
     *    |    Tab     |      Tab     |        Tab        |
     *    +------------+--------------+-------------------+
     *        |                                   |
     *        +-----------------------------------+
     *
     * To determine the next adjacent index, we look at the Tab root left and
     * Tab root right, both relative to the scroll position. If the Tab root
     * left is less than 0, then we know it's out of view to the left. If the
     * Tab root right minus the bar width is greater than 0, we know the Tab is
     * out of view to the right. From there, we either increment or decrement
     * the index.
     */
    var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
    var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
    var relativeRootDelta = relativeRootLeft + relativeRootRight;
    var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
    var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;

    if (leftEdgeIsCloser) {
      return index - 1;
    }

    if (rightEdgeIsCloser) {
      return index + 1;
    }

    return -1;
  };

  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar in RTL
   * @param {number} index The index of the tab
   * @param {!MDCTabDimensions} tabDimensions The dimensions of the tab
   * @param {number} scrollPosition The current scroll position
   * @param {number} barWidth The width of the tab bar
   * @param {number} scrollContentWidth The width of the scroller content
   * @return {number}
   * @private
   */


  MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
    var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
    var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
    var rootDelta = rootLeft + rootRight;
    var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
    var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;

    if (leftEdgeIsCloser) {
      return index + 1;
    }

    if (rightEdgeIsCloser) {
      return index - 1;
    }

    return -1;
  };

  /**
   * Returns the key associated with a keydown event
   * @param {!Event} evt The keydown event
   * @return {string}
   * @private
   */


  MDCTabBarFoundation.prototype.getKeyFromEvent_ = function getKeyFromEvent_(evt) {
    if (ACCEPTABLE_KEYS.has(evt.key)) {
      return evt.key;
    }

    return KEYCODE_MAP.get(evt.keyCode);
  };

  MDCTabBarFoundation.prototype.isActivationKey_ = function isActivationKey_(key) {
    return key === tab_bar_constants_strings.SPACE_KEY || key === tab_bar_constants_strings.ENTER_KEY;
  };

  /**
   * Returns whether a given index is inclusively between the ends
   * @param {number} index The index to test
   * @private
   */


  MDCTabBarFoundation.prototype.indexIsInRange_ = function indexIsInRange_(index) {
    return index >= 0 && index < this.adapter_.getTabListLength();
  };

  /**
   * Returns the view's RTL property
   * @return {boolean}
   * @private
   */


  MDCTabBarFoundation.prototype.isRTL_ = function isRTL_() {
    return this.adapter_.isRTL();
  };

  /**
   * Scrolls the tab at the given index into view for left-to-right useragents
   * @param {number} index The index of the tab to scroll into view
   * @private
   */


  MDCTabBarFoundation.prototype.scrollIntoView_ = function scrollIntoView_(index) {
    var scrollPosition = this.adapter_.getScrollPosition();
    var barWidth = this.adapter_.getOffsetWidth();
    var tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
    var nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);

    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }

    var scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
    this.adapter_.incrementScroll(scrollIncrement);
  };

  /**
   * Scrolls the tab at the given index into view in RTL
   * @param {number} index The tab index to make visible
   * @private
   */


  MDCTabBarFoundation.prototype.scrollIntoViewRTL_ = function scrollIntoViewRTL_(index) {
    var scrollPosition = this.adapter_.getScrollPosition();
    var barWidth = this.adapter_.getOffsetWidth();
    var tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
    var scrollWidth = this.adapter_.getScrollContentWidth();
    var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);

    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }

    var scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
    this.adapter_.incrementScroll(scrollIncrement);
  };

  return MDCTabBarFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var tab_bar_foundation = (foundation_MDCTabBarFoundation);
// CONCATENATED MODULE: ../node_modules/@material/tab-bar/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTabBar", function() { return tab_bar_MDCTabBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTabBarFoundation", function() { return tab_bar_foundation; });
var tab_bar__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function tab_bar__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tab_bar__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function tab_bar__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */









/**
 * @extends {MDCComponent<!MDCTabBarFoundation>}
 * @final
 */

var tab_bar_MDCTabBar = function (_MDCComponent) {
  tab_bar__inherits(MDCTabBar, _MDCComponent);

  /**
   * @param {...?} args
   */
  function MDCTabBar() {
    tab_bar__classCallCheck(this, MDCTabBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {!Array<!MDCTab>} */
    var _this = tab_bar__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.tabList_;

    /** @type {(function(!Element): !MDCTab)} */
    _this.tabFactory_;

    /** @private {?MDCTabScroller} */
    _this.tabScroller_;

    /** @type {(function(!Element): !MDCTabScroller)} */
    _this.tabScrollerFactory_;

    /** @private {?function(?Event): undefined} */
    _this.handleTabInteraction_;

    /** @private {?function(?Event): undefined} */
    _this.handleKeyDown_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTabBar}
   */


  MDCTabBar.attachTo = function attachTo(root) {
    return new MDCTabBar(root);
  };

  /**
   * @param {(function(!Element): !MDCTab)=} tabFactory A function which creates a new MDCTab
   * @param {(function(!Element): !MDCTabScroller)=} tabScrollerFactory A function which creates a new MDCTabScroller
   */
  MDCTabBar.prototype.initialize = function initialize() {
    var _this2 = this;

    var tabFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el) {
      return new tab_MDCTab(el);
    };
    var tabScrollerFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
      return new tab_scroller_MDCTabScroller(el);
    };

    this.tabFactory_ = tabFactory;
    this.tabScrollerFactory_ = tabScrollerFactory;

    this.tabList_ = this.getTabElements_().map(function (el) {
      return _this2.tabFactory_(el);
    });

    var tabScrollerElement = this.root_.querySelector(tab_bar_foundation.strings.TAB_SCROLLER_SELECTOR);
    if (tabScrollerElement) {
      this.tabScroller_ = this.tabScrollerFactory_(tabScrollerElement);
    }
  };

  MDCTabBar.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    var _this3 = this;

    this.handleTabInteraction_ = function (evt) {
      return _this3.foundation_.handleTabInteraction(evt);
    };
    this.handleKeyDown_ = function (evt) {
      return _this3.foundation_.handleKeyDown(evt);
    };

    this.root_.addEventListener(tab_foundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
    this.root_.addEventListener('keydown', this.handleKeyDown_);

    for (var i = 0; i < this.tabList_.length; i++) {
      if (this.tabList_[i].active) {
        this.scrollIntoView(i);
        break;
      }
    }
  };

  MDCTabBar.prototype.destroy = function destroy() {
    _MDCComponent.prototype.destroy.call(this);
    this.root_.removeEventListener(tab_foundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
    this.root_.removeEventListener('keydown', this.handleKeyDown_);
    this.tabList_.forEach(function (tab) {
      return tab.destroy();
    });
    this.tabScroller_.destroy();
  };

  /**
   * @return {!MDCTabBarFoundation}
   */


  MDCTabBar.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this4 = this;

    return new tab_bar_foundation(
    /** @type {!MDCTabBarAdapter} */{
      scrollTo: function scrollTo(scrollX) {
        return _this4.tabScroller_.scrollTo(scrollX);
      },
      incrementScroll: function incrementScroll(scrollXIncrement) {
        return _this4.tabScroller_.incrementScroll(scrollXIncrement);
      },
      getScrollPosition: function getScrollPosition() {
        return _this4.tabScroller_.getScrollPosition();
      },
      getScrollContentWidth: function getScrollContentWidth() {
        return _this4.tabScroller_.getScrollContentWidth();
      },
      getOffsetWidth: function getOffsetWidth() {
        return _this4.root_.offsetWidth;
      },
      isRTL: function isRTL() {
        return window.getComputedStyle(_this4.root_).getPropertyValue('direction') === 'rtl';
      },
      setActiveTab: function setActiveTab(index) {
        return _this4.foundation_.activateTab(index);
      },
      activateTabAtIndex: function activateTabAtIndex(index, clientRect) {
        return _this4.tabList_[index].activate(clientRect);
      },
      deactivateTabAtIndex: function deactivateTabAtIndex(index) {
        return _this4.tabList_[index].deactivate();
      },
      focusTabAtIndex: function focusTabAtIndex(index) {
        return _this4.tabList_[index].focus();
      },
      getTabIndicatorClientRectAtIndex: function getTabIndicatorClientRectAtIndex(index) {
        return _this4.tabList_[index].computeIndicatorClientRect();
      },
      getTabDimensionsAtIndex: function getTabDimensionsAtIndex(index) {
        return _this4.tabList_[index].computeDimensions();
      },
      getPreviousActiveTabIndex: function getPreviousActiveTabIndex() {
        for (var i = 0; i < _this4.tabList_.length; i++) {
          if (_this4.tabList_[i].active) {
            return i;
          }
        }
        return -1;
      },
      getFocusedTabIndex: function getFocusedTabIndex() {
        var tabElements = _this4.getTabElements_();
        var activeElement = document.activeElement;
        return tabElements.indexOf(activeElement);
      },
      getIndexOfTab: function getIndexOfTab(tabToFind) {
        return _this4.tabList_.indexOf(tabToFind);
      },
      getTabListLength: function getTabListLength() {
        return _this4.tabList_.length;
      },
      notifyTabActivated: function notifyTabActivated(index) {
        return _this4.emit(tab_bar_foundation.strings.TAB_ACTIVATED_EVENT, { index: index }, true);
      }
    });
  };

  /**
   * Activates the tab at the given index
   * @param {number} index The index of the tab
   */


  MDCTabBar.prototype.activateTab = function activateTab(index) {
    this.foundation_.activateTab(index);
  };

  /**
   * Scrolls the tab at the given index into view
   * @param {number} index THe index of the tab
   */


  MDCTabBar.prototype.scrollIntoView = function scrollIntoView(index) {
    this.foundation_.scrollIntoView(index);
  };

  MDCTabBar.prototype.getTabElements_ = function getTabElements_() {
    return [].slice.call(this.root_.querySelectorAll(tab_bar_foundation.strings.TAB_SELECTOR));
  };

  tab_bar__createClass(MDCTabBar, [{
    key: 'useAutomaticActivation',
    set: function set(useAutomaticActivation) {
      this.foundation_.setUseAutomaticActivation(useAutomaticActivation);
    }
  }]);

  return MDCTabBar;
}(component["a" /* default */]);



/***/ }),

/***/ "2TVm":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "3JCP":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var url = __webpack_require__("Vy1O");
var URL = url.URL;
var http = __webpack_require__("gHkb");
var https = __webpack_require__("XgVs");
var assert = __webpack_require__("5E5G");
var Writable = __webpack_require__("97RM").Writable;
var debug = __webpack_require__("8NLT")("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    } else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new Error("write after end");
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
      this.emit("error", new Error("Request body larger than maxBodyLength limit"));
      this.abort();
    }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  } else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  } else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  if (callback) {
    this.once("timeout", callback);
  }

  if (this.socket) {
    startTimer(this, msecs);
  } else {
    var self = this;
    this._currentRequest.once("socket", function () {
      startTimer(self, msecs);
    });
  }

  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

function startTimer(request, msecs) {
  clearTimeout(request._timeout);
  request._timeout = setTimeout(function () {
    request.emit("timeout");
  }, msecs);
}

function clearTimer() {
  clearTimeout(this._timeout);
}

// Proxy all other public ClientRequest methods
["abort", "flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function get() {
      return this._currentRequest[property];
    }
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          }
          // End the request if `end` has been called on us
          else if (self._ended) {
              request.end();
            }
      }
    })();
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false && response.statusCode >= 300 && response.statusCode < 400) {
    // Abort the current request
    this._currentRequest.removeAllListeners();
    this._currentRequest.on("error", noop);
    this._currentRequest.abort();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    _extends(this._options, url.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();

    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        } catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      } else if (URL && input instanceof URL) {
        input = urlToOptions(input);
      } else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = _extends({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (input, options, callback) {
      var request = wrappedProtocol.request(input, options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

/* istanbul ignore next */
function noop() {} /* empty */

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
    /* istanbul ignore next */
    urlObject.hostname.slice(1, -1) : urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;

/***/ }),

/***/ "3bIi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("YdsM");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "4MWp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// CONCATENATED MODULE: ../node_modules/@material/slider/constants.js
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var cssClasses = {
  ACTIVE: 'mdc-slider--active',
  DISABLED: 'mdc-slider--disabled',
  DISCRETE: 'mdc-slider--discrete',
  FOCUS: 'mdc-slider--focus',
  IN_TRANSIT: 'mdc-slider--in-transit',
  IS_DISCRETE: 'mdc-slider--discrete',
  HAS_TRACK_MARKER: 'mdc-slider--display-markers'
};

/** @enum {string} */
var strings = {
  TRACK_SELECTOR: '.mdc-slider__track',
  TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
  LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
  THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
  PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUENOW: 'aria-valuenow',
  ARIA_DISABLED: 'aria-disabled',
  STEP_DATA_ATTR: 'data-step',
  CHANGE_EVENT: 'MDCSlider:change',
  INPUT_EVENT: 'MDCSlider:input'
};

/** @enum {number} */
var numbers = {
  PAGE_FACTOR: 4
};


// CONCATENATED MODULE: ../node_modules/@material/slider/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint-disable no-unused-vars */

/**
 * Adapter for MDC Slider.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Slider into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCSliderAdapter = function () {
  function MDCSliderAdapter() {
    _classCallCheck(this, MDCSliderAdapter);
  }

  /**
   * Returns true if className exists for the slider Element
   * @param {string} className
   * @return {boolean}
   */
  MDCSliderAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Adds a class to the slider Element
   * @param {string} className
   */


  MDCSliderAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the slider Element
   * @param {string} className
   */


  MDCSliderAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns a string if attribute name exists on the slider Element,
   * otherwise returns null
   * @param {string} name
   * @return {?string}
   */


  MDCSliderAdapter.prototype.getAttribute = function getAttribute(name) {};

  /**
   * Sets attribute name on slider Element to value
   * @param {string} name
   * @param {string} value
   */


  MDCSliderAdapter.prototype.setAttribute = function setAttribute(name, value) {};

  /**
   * Removes attribute name from slider Element
   * @param {string} name
   */


  MDCSliderAdapter.prototype.removeAttribute = function removeAttribute(name) {};

  /**
   * Returns the bounding client rect for the slider Element
   * @return {?ClientRect}
   */


  MDCSliderAdapter.prototype.computeBoundingRect = function computeBoundingRect() {};

  /**
   * Returns the tab index of the slider Element
   * @return {number}
   */


  MDCSliderAdapter.prototype.getTabIndex = function getTabIndex() {};

  /**
   * Registers an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(type, handler) {};

  /**
   * Deregisters an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(type, handler) {};

  /**
   * Registers an event handler on the thumb container element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.registerThumbContainerInteractionHandler = function registerThumbContainerInteractionHandler(type, handler) {};

  /**
   * Deregisters an event handler on the thumb container element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.deregisterThumbContainerInteractionHandler = function deregisterThumbContainerInteractionHandler(type, handler) {};

  /**
   * Registers an event handler on the body for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.registerBodyInteractionHandler = function registerBodyInteractionHandler(type, handler) {};

  /**
   * Deregisters an event handler on the body for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.deregisterBodyInteractionHandler = function deregisterBodyInteractionHandler(type, handler) {};

  /**
   * Registers an event handler for the window resize event
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /**
   * Deregisters an event handler for the window resize event
   * @param {function(!Event): undefined} handler
   */


  MDCSliderAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /**
   * Emits a custom event MDCSlider:input from the root
   */


  MDCSliderAdapter.prototype.notifyInput = function notifyInput() {};

  /**
   * Emits a custom event MDCSlider:change from the root
   */


  MDCSliderAdapter.prototype.notifyChange = function notifyChange() {};

  /**
   * Sets a style property of the thumb container element to the passed value
   * @param {string} propertyName
   * @param {string} value
   */


  MDCSliderAdapter.prototype.setThumbContainerStyleProperty = function setThumbContainerStyleProperty(propertyName, value) {};

  /**
   * Sets a style property of the track element to the passed value
   * @param {string} propertyName
   * @param {string} value
   */


  MDCSliderAdapter.prototype.setTrackStyleProperty = function setTrackStyleProperty(propertyName, value) {};

  /**
   * Sets the inner text of the pin marker to the passed value
   * @param {number} value
   */


  MDCSliderAdapter.prototype.setMarkerValue = function setMarkerValue(value) {};

  /**
   * Appends the passed number of track markers to the track mark container element
   * @param {number} numMarkers
   */


  MDCSliderAdapter.prototype.appendTrackMarkers = function appendTrackMarkers(numMarkers) {};

  /**
   * Removes all track markers fromt he track mark container element
   */


  MDCSliderAdapter.prototype.removeTrackMarkers = function removeTrackMarkers() {};

  /**
   * Sets a style property of the last track marker to the passed value
   * @param {string} propertyName
   * @param {string} value
   */


  MDCSliderAdapter.prototype.setLastTrackMarkersStyleProperty = function setLastTrackMarkersStyleProperty(propertyName, value) {};

  /**
   * Returns true if the root element is RTL, otherwise false
   * @return {boolean}
   */


  MDCSliderAdapter.prototype.isRTL = function isRTL() {};

  return MDCSliderAdapter;
}();

/* harmony default export */ var adapter = (MDCSliderAdapter);
// CONCATENATED MODULE: ../node_modules/@material/animation/index.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string,
 *   styleProperty: string
 * }}
 */
var VendorPropertyMapType = void 0;

/** @const {Object<string, !VendorPropertyMapType>} */
var eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation'
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation'
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation'
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition'
  }
};

/** @const {Object<string, !VendorPropertyMapType>} */
var cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  var el = windowObj['document']['createElement']('div');
  var eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.

var transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}


// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/slider/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */







/** @enum {string} */
var KEY_IDS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
};

/** @enum {string} */
var MOVE_EVENT_MAP = {
  'mousedown': 'mousemove',
  'touchstart': 'touchmove',
  'pointerdown': 'pointermove'
};

var DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
var UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

/**
 * @extends {MDCFoundation<!MDCSliderAdapter>}
 */

var foundation_MDCSliderFoundation = function (_MDCFoundation) {
  _inherits(MDCSliderFoundation, _MDCFoundation);

  _createClass(MDCSliderFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {cssClasses} */
    get: function get() {
      return cssClasses;
    }

    /** @return enum {strings} */

  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }

    /** @return enum {numbers} */

  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }

    /** @return {!MDCSliderAdapter} */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCSliderAdapter} */{
          hasClass: function hasClass() {
            return (/* className: string */ /* boolean */false
            );
          },
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          getAttribute: function getAttribute() {
            return (/* name: string */ /* string|null */null
            );
          },
          setAttribute: function setAttribute() /* name: string, value: string */{},
          removeAttribute: function removeAttribute() /* name: string */{},
          computeBoundingRect: function computeBoundingRect() {
            return (/* ClientRect */{
                top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0
              }
            );
          },
          getTabIndex: function getTabIndex() {
            return (/* number */0
            );
          },
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
          registerBodyInteractionHandler: function registerBodyInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler() /* type: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          notifyInput: function notifyInput() {},
          notifyChange: function notifyChange() {},
          setThumbContainerStyleProperty: function setThumbContainerStyleProperty() /* propertyName: string, value: string */{},
          setTrackStyleProperty: function setTrackStyleProperty() /* propertyName: string, value: string */{},
          setMarkerValue: function setMarkerValue() /* value: number */{},
          appendTrackMarkers: function appendTrackMarkers() /* numMarkers: number */{},
          removeTrackMarkers: function removeTrackMarkers() {},
          setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty() /* propertyName: string, value: string */{},
          isRTL: function isRTL() {
            return (/* boolean */false
            );
          }
        }
      );
    }

    /**
     * Creates a new instance of MDCSliderFoundation
     * @param {?MDCSliderAdapter} adapter
     */

  }]);

  function MDCSliderFoundation(adapter) {
    foundation__classCallCheck(this, MDCSliderFoundation);

    /** @private {?ClientRect} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCSliderFoundation.defaultAdapter, adapter)));

    _this.rect_ = null;
    // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
    // because those could be valid tabindices set by the client code.
    _this.savedTabIndex_ = NaN;
    _this.active_ = false;
    _this.inTransit_ = false;
    _this.isDiscrete_ = false;
    _this.hasTrackMarker_ = false;
    _this.handlingThumbTargetEvt_ = false;
    _this.min_ = 0;
    _this.max_ = 100;
    _this.step_ = 0;
    _this.value_ = 0;
    _this.disabled_ = false;
    _this.preventFocusState_ = false;
    _this.updateUIFrame_ = 0;
    _this.thumbContainerPointerHandler_ = function () {
      _this.handlingThumbTargetEvt_ = true;
    };
    _this.interactionStartHandler_ = function (evt) {
      return _this.handleDown_(evt);
    };
    _this.keydownHandler_ = function (evt) {
      return _this.handleKeydown_(evt);
    };
    _this.focusHandler_ = function () {
      return _this.handleFocus_();
    };
    _this.blurHandler_ = function () {
      return _this.handleBlur_();
    };
    _this.resizeHandler_ = function () {
      return _this.layout();
    };
    return _this;
  }

  MDCSliderFoundation.prototype.init = function init() {
    var _this2 = this;

    this.isDiscrete_ = this.adapter_.hasClass(cssClasses.IS_DISCRETE);
    this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses.HAS_TRACK_MARKER);
    DOWN_EVENTS.forEach(function (evtName) {
      return _this2.adapter_.registerInteractionHandler(evtName, _this2.interactionStartHandler_);
    });
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    DOWN_EVENTS.forEach(function (evtName) {
      _this2.adapter_.registerThumbContainerInteractionHandler(evtName, _this2.thumbContainerPointerHandler_);
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.layout();
    // At last step, provide a reasonable default value to discrete slider
    if (this.isDiscrete_ && this.getStep() == 0) {
      this.step_ = 1;
    }
  };

  MDCSliderFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    DOWN_EVENTS.forEach(function (evtName) {
      _this3.adapter_.deregisterInteractionHandler(evtName, _this3.interactionStartHandler_);
    });
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    DOWN_EVENTS.forEach(function (evtName) {
      _this3.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this3.thumbContainerPointerHandler_);
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  };

  MDCSliderFoundation.prototype.setupTrackMarker = function setupTrackMarker() {
    if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() != 0) {
      var min = this.getMin();
      var max = this.getMax();
      var step = this.getStep();
      var numMarkers = (max - min) / step;

      // In case distance between max & min is indivisible to step,
      // we place the secondary to last marker proportionally at where thumb
      // could reach and place the last marker at max value
      var indivisible = Math.ceil(numMarkers) !== numMarkers;
      if (indivisible) {
        numMarkers = Math.ceil(numMarkers);
      }

      this.adapter_.removeTrackMarkers();
      this.adapter_.appendTrackMarkers(numMarkers);

      if (indivisible) {
        var lastStepRatio = (max - numMarkers * step) / step + 1;
        var flex = getCorrectPropertyName(window, 'flex');
        this.adapter_.setLastTrackMarkersStyleProperty(flex, String(lastStepRatio));
      }
    }
  };

  MDCSliderFoundation.prototype.layout = function layout() {
    this.rect_ = this.adapter_.computeBoundingRect();
    this.updateUIForCurrentValue_();
  };

  /** @return {number} */


  MDCSliderFoundation.prototype.getValue = function getValue() {
    return this.value_;
  };

  /** @param {number} value */


  MDCSliderFoundation.prototype.setValue = function setValue(value) {
    this.setValue_(value, false);
  };

  /** @return {number} */


  MDCSliderFoundation.prototype.getMax = function getMax() {
    return this.max_;
  };

  /** @param {number} max */


  MDCSliderFoundation.prototype.setMax = function setMax(max) {
    if (max < this.min_) {
      throw new Error('Cannot set max to be less than the slider\'s minimum value');
    }
    this.max_ = max;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(strings.ARIA_VALUEMAX, String(this.max_));
    this.setupTrackMarker();
  };

  /** @return {number} */


  MDCSliderFoundation.prototype.getMin = function getMin() {
    return this.min_;
  };

  /** @param {number} min */


  MDCSliderFoundation.prototype.setMin = function setMin(min) {
    if (min > this.max_) {
      throw new Error('Cannot set min to be greater than the slider\'s maximum value');
    }
    this.min_ = min;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(strings.ARIA_VALUEMIN, String(this.min_));
    this.setupTrackMarker();
  };

  /** @return {number} */


  MDCSliderFoundation.prototype.getStep = function getStep() {
    return this.step_;
  };

  /** @param {number} step */


  MDCSliderFoundation.prototype.setStep = function setStep(step) {
    if (step < 0) {
      throw new Error('Step cannot be set to a negative number');
    }
    if (this.isDiscrete_ && (typeof step !== 'number' || step < 1)) {
      step = 1;
    }
    this.step_ = step;
    this.setValue_(this.value_, false, true);
    this.setupTrackMarker();
  };

  /** @return {boolean} */


  MDCSliderFoundation.prototype.isDisabled = function isDisabled() {
    return this.disabled_;
  };

  /** @param {boolean} disabled */


  MDCSliderFoundation.prototype.setDisabled = function setDisabled(disabled) {
    this.disabled_ = disabled;
    this.toggleClass_(cssClasses.DISABLED, this.disabled_);
    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setAttribute(strings.ARIA_DISABLED, 'true');
      this.adapter_.removeAttribute('tabindex');
    } else {
      this.adapter_.removeAttribute(strings.ARIA_DISABLED);
      if (!isNaN(this.savedTabIndex_)) {
        this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
      }
    }
  };

  /**
   * Called when the user starts interacting with the slider
   * @param {!Event} evt
   * @private
   */


  MDCSliderFoundation.prototype.handleDown_ = function handleDown_(evt) {
    var _this4 = this;

    if (this.disabled_) {
      return;
    }

    this.preventFocusState_ = true;
    this.setInTransit_(!this.handlingThumbTargetEvt_);
    this.handlingThumbTargetEvt_ = false;
    this.setActive_(true);

    var moveHandler = function moveHandler(evt) {
      _this4.handleMove_(evt);
    };

    // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
    // do not always fire these consistently in pairs.
    // (See https://github.com/material-components/material-components-web/issues/1192)
    var upHandler = function upHandler() {
      _this4.handleUp_();
      _this4.adapter_.deregisterBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
      UP_EVENTS.forEach(function (evtName) {
        return _this4.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
      });
    };

    this.adapter_.registerBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
    UP_EVENTS.forEach(function (evtName) {
      return _this4.adapter_.registerBodyInteractionHandler(evtName, upHandler);
    });
    this.setValueFromEvt_(evt);
  };

  /**
   * Called when the user moves the slider
   * @param {!Event} evt
   * @private
   */


  MDCSliderFoundation.prototype.handleMove_ = function handleMove_(evt) {
    evt.preventDefault();
    this.setValueFromEvt_(evt);
  };

  /**
   * Called when the user's interaction with the slider ends
   * @private
   */


  MDCSliderFoundation.prototype.handleUp_ = function handleUp_() {
    this.setActive_(false);
    this.adapter_.notifyChange();
  };

  /**
   * Returns the pageX of the event
   * @param {!Event} evt
   * @return {number}
   * @private
   */


  MDCSliderFoundation.prototype.getPageX_ = function getPageX_(evt) {
    if (evt.targetTouches && evt.targetTouches.length > 0) {
      return evt.targetTouches[0].pageX;
    }
    return evt.pageX;
  };

  /**
   * Sets the slider value from an event
   * @param {!Event} evt
   * @private
   */


  MDCSliderFoundation.prototype.setValueFromEvt_ = function setValueFromEvt_(evt) {
    var pageX = this.getPageX_(evt);
    var value = this.computeValueFromPageX_(pageX);
    this.setValue_(value, true);
  };

  /**
   * Computes the new value from the pageX position
   * @param {number} pageX
   * @return {number}
   */


  MDCSliderFoundation.prototype.computeValueFromPageX_ = function computeValueFromPageX_(pageX) {
    var max = this.max_,
        min = this.min_;

    var xPos = pageX - this.rect_.left;
    var pctComplete = xPos / this.rect_.width;
    if (this.adapter_.isRTL()) {
      pctComplete = 1 - pctComplete;
    }
    // Fit the percentage complete between the range [min,max]
    // by remapping from [0, 1] to [min, min+(max-min)].
    return min + pctComplete * (max - min);
  };

  /**
   * Handles keydown events
   * @param {!Event} evt
   */


  MDCSliderFoundation.prototype.handleKeydown_ = function handleKeydown_(evt) {
    var keyId = this.getKeyId_(evt);
    var value = this.getValueForKeyId_(keyId);
    if (isNaN(value)) {
      return;
    }

    // Prevent page from scrolling due to key presses that would normally scroll the page
    evt.preventDefault();
    this.adapter_.addClass(cssClasses.FOCUS);
    this.setValue_(value, true);
    this.adapter_.notifyChange();
  };

  /**
   * Returns the computed name of the event
   * @param {!Event} kbdEvt
   * @return {string}
   */


  MDCSliderFoundation.prototype.getKeyId_ = function getKeyId_(kbdEvt) {
    if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
      return KEY_IDS.ARROW_LEFT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
      return KEY_IDS.ARROW_RIGHT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
      return KEY_IDS.ARROW_UP;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
      return KEY_IDS.ARROW_DOWN;
    }
    if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
      return KEY_IDS.HOME;
    }
    if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
      return KEY_IDS.END;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
      return KEY_IDS.PAGE_UP;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
      return KEY_IDS.PAGE_DOWN;
    }

    return '';
  };

  /**
   * Computes the value given a keyboard key ID
   * @param {string} keyId
   * @return {number}
   */


  MDCSliderFoundation.prototype.getValueForKeyId_ = function getValueForKeyId_(keyId) {
    var max = this.max_,
        min = this.min_,
        step = this.step_;

    var delta = step || (max - min) / 100;
    var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
    if (valueNeedsToBeFlipped) {
      delta = -delta;
    }

    switch (keyId) {
      case KEY_IDS.ARROW_LEFT:
      case KEY_IDS.ARROW_DOWN:
        return this.value_ - delta;
      case KEY_IDS.ARROW_RIGHT:
      case KEY_IDS.ARROW_UP:
        return this.value_ + delta;
      case KEY_IDS.HOME:
        return this.min_;
      case KEY_IDS.END:
        return this.max_;
      case KEY_IDS.PAGE_UP:
        return this.value_ + delta * numbers.PAGE_FACTOR;
      case KEY_IDS.PAGE_DOWN:
        return this.value_ - delta * numbers.PAGE_FACTOR;
      default:
        return NaN;
    }
  };

  MDCSliderFoundation.prototype.handleFocus_ = function handleFocus_() {
    if (this.preventFocusState_) {
      return;
    }
    this.adapter_.addClass(cssClasses.FOCUS);
  };

  MDCSliderFoundation.prototype.handleBlur_ = function handleBlur_() {
    this.preventFocusState_ = false;
    this.adapter_.removeClass(cssClasses.FOCUS);
  };

  /**
   * Sets the value of the slider
   * @param {number} value
   * @param {boolean} shouldFireInput
   * @param {boolean=} force
   */


  MDCSliderFoundation.prototype.setValue_ = function setValue_(value, shouldFireInput) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (value === this.value_ && !force) {
      return;
    }

    var min = this.min_,
        max = this.max_;

    var valueSetToBoundary = value === min || value === max;
    if (this.step_ && !valueSetToBoundary) {
      value = this.quantize_(value);
    }
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    this.value_ = value;
    this.adapter_.setAttribute(strings.ARIA_VALUENOW, String(this.value_));
    this.updateUIForCurrentValue_();

    if (shouldFireInput) {
      this.adapter_.notifyInput();
      if (this.isDiscrete_) {
        this.adapter_.setMarkerValue(value);
      }
    }
  };

  /**
   * Calculates the quantized value
   * @param {number} value
   * @return {number}
   */


  MDCSliderFoundation.prototype.quantize_ = function quantize_(value) {
    var numSteps = Math.round(value / this.step_);
    var quantizedVal = numSteps * this.step_;
    return quantizedVal;
  };

  MDCSliderFoundation.prototype.updateUIForCurrentValue_ = function updateUIForCurrentValue_() {
    var _this5 = this;

    var max = this.max_,
        min = this.min_,
        value = this.value_;

    var pctComplete = (value - min) / (max - min);
    var translatePx = pctComplete * this.rect_.width;
    if (this.adapter_.isRTL()) {
      translatePx = this.rect_.width - translatePx;
    }

    var transformProp = getCorrectPropertyName(window, 'transform');
    var transitionendEvtName = getCorrectEventName(window, 'transitionend');

    if (this.inTransit_) {
      var onTransitionEnd = function onTransitionEnd() {
        _this5.setInTransit_(false);
        _this5.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
      };
      this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
    }

    this.updateUIFrame_ = requestAnimationFrame(function () {
      // NOTE(traviskaufman): It would be nice to use calc() here,
      // but IE cannot handle calcs in transforms correctly.
      // See: https://goo.gl/NC2itk
      // Also note that the -50% offset is used to center the slider thumb.
      _this5.adapter_.setThumbContainerStyleProperty(transformProp, 'translateX(' + translatePx + 'px) translateX(-50%)');
      _this5.adapter_.setTrackStyleProperty(transformProp, 'scaleX(' + pctComplete + ')');
    });
  };

  /**
   * Toggles the active state of the slider
   * @param {boolean} active
   */


  MDCSliderFoundation.prototype.setActive_ = function setActive_(active) {
    this.active_ = active;
    this.toggleClass_(cssClasses.ACTIVE, this.active_);
  };

  /**
   * Toggles the inTransit state of the slider
   * @param {boolean} inTransit
   */


  MDCSliderFoundation.prototype.setInTransit_ = function setInTransit_(inTransit) {
    this.inTransit_ = inTransit;
    this.toggleClass_(cssClasses.IN_TRANSIT, this.inTransit_);
  };

  /**
   * Conditionally adds or removes a class based on shouldBePresent
   * @param {string} className
   * @param {boolean} shouldBePresent
   */


  MDCSliderFoundation.prototype.toggleClass_ = function toggleClass_(className, shouldBePresent) {
    if (shouldBePresent) {
      this.adapter_.addClass(className);
    } else {
      this.adapter_.removeClass(className);
    }
  };

  return MDCSliderFoundation;
}(foundation["a" /* default */]);

/* harmony default export */ var slider_foundation = (foundation_MDCSliderFoundation);
// CONCATENATED MODULE: ../node_modules/@material/slider/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCSlider", function() { return slider_MDCSlider; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCSliderFoundation", function() { return slider_foundation; });
var slider__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function slider__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function slider__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function slider__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */







/**
 * @extends MDCComponent<!MDCSliderFoundation>
 */

var slider_MDCSlider = function (_MDCComponent) {
  slider__inherits(MDCSlider, _MDCComponent);

  MDCSlider.attachTo = function attachTo(root) {
    return new MDCSlider(root);
  };

  function MDCSlider() {
    slider__classCallCheck(this, MDCSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {?Element} */
    var _this = slider__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.thumbContainer_;
    /** @type {?Element} */
    _this.track_;
    /** @type {?Element} */
    _this.pinValueMarker_;
    /** @type {?Element} */
    _this.trackMarkerContainer_;
    return _this;
  }

  /** @return {number} */


  MDCSlider.prototype.initialize = function initialize() {
    this.thumbContainer_ = this.root_.querySelector(strings.THUMB_CONTAINER_SELECTOR);
    this.track_ = this.root_.querySelector(strings.TRACK_SELECTOR);
    this.pinValueMarker_ = this.root_.querySelector(strings.PIN_VALUE_MARKER_SELECTOR);
    this.trackMarkerContainer_ = this.root_.querySelector(strings.TRACK_MARKER_CONTAINER_SELECTOR);
  };

  /**
   * @return {!MDCSliderFoundation}
   */


  MDCSlider.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new slider_foundation(
    /** @type {!MDCSliderAdapter} */{
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      getAttribute: function getAttribute(name) {
        return _this2.root_.getAttribute(name);
      },
      setAttribute: function setAttribute(name, value) {
        return _this2.root_.setAttribute(name, value);
      },
      removeAttribute: function removeAttribute(name) {
        return _this2.root_.removeAttribute(name);
      },
      computeBoundingRect: function computeBoundingRect() {
        return _this2.root_.getBoundingClientRect();
      },
      getTabIndex: function getTabIndex() {
        return _this2.root_.tabIndex;
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        _this2.root_.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        _this2.root_.removeEventListener(type, handler);
      },
      registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler(type, handler) {
        _this2.thumbContainer_.addEventListener(type, handler);
      },
      deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler(type, handler) {
        _this2.thumbContainer_.removeEventListener(type, handler);
      },
      registerBodyInteractionHandler: function registerBodyInteractionHandler(type, handler) {
        document.body.addEventListener(type, handler);
      },
      deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler(type, handler) {
        document.body.removeEventListener(type, handler);
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        window.removeEventListener('resize', handler);
      },
      notifyInput: function notifyInput() {
        _this2.emit(strings.INPUT_EVENT, _this2);
      },
      notifyChange: function notifyChange() {
        _this2.emit(strings.CHANGE_EVENT, _this2);
      },
      setThumbContainerStyleProperty: function setThumbContainerStyleProperty(propertyName, value) {
        _this2.thumbContainer_.style.setProperty(propertyName, value);
      },
      setTrackStyleProperty: function setTrackStyleProperty(propertyName, value) {
        _this2.track_.style.setProperty(propertyName, value);
      },
      setMarkerValue: function setMarkerValue(value) {
        _this2.pinValueMarker_.innerText = value;
      },
      appendTrackMarkers: function appendTrackMarkers(numMarkers) {
        var frag = document.createDocumentFragment();
        for (var i = 0; i < numMarkers; i++) {
          var marker = document.createElement('div');
          marker.classList.add('mdc-slider__track-marker');
          frag.appendChild(marker);
        }
        _this2.trackMarkerContainer_.appendChild(frag);
      },
      removeTrackMarkers: function removeTrackMarkers() {
        while (_this2.trackMarkerContainer_.firstChild) {
          _this2.trackMarkerContainer_.removeChild(_this2.trackMarkerContainer_.firstChild);
        }
      },
      setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty(propertyName, value) {
        // We remove and append new nodes, thus, the last track marker must be dynamically found.
        var lastTrackMarker = _this2.root_.querySelector(strings.LAST_TRACK_MARKER_SELECTOR);
        lastTrackMarker.style.setProperty(propertyName, value);
      },
      isRTL: function isRTL() {
        return getComputedStyle(_this2.root_).direction === 'rtl';
      }
    });
  };

  MDCSlider.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    var origValueNow = parseFloat(this.root_.getAttribute(strings.ARIA_VALUENOW));
    this.min = parseFloat(this.root_.getAttribute(strings.ARIA_VALUEMIN)) || this.min;
    this.max = parseFloat(this.root_.getAttribute(strings.ARIA_VALUEMAX)) || this.max;
    this.step = parseFloat(this.root_.getAttribute(strings.STEP_DATA_ATTR)) || this.step;
    this.value = origValueNow || this.value;
    this.disabled = this.root_.hasAttribute(strings.ARIA_DISABLED) && this.root_.getAttribute(strings.ARIA_DISABLED) !== 'false';
    this.foundation_.setupTrackMarker();
  };

  MDCSlider.prototype.layout = function layout() {
    this.foundation_.layout();
  };

  /** @param {number=} amount */


  MDCSlider.prototype.stepUp = function stepUp() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.step || 1;

    this.value += amount;
  };

  /** @param {number=} amount */


  MDCSlider.prototype.stepDown = function stepDown() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.step || 1;

    this.value -= amount;
  };

  slider__createClass(MDCSlider, [{
    key: 'value',
    get: function get() {
      return this.foundation_.getValue();
    }

    /** @param {number} value */
    ,
    set: function set(value) {
      this.foundation_.setValue(value);
    }

    /** @return {number} */

  }, {
    key: 'min',
    get: function get() {
      return this.foundation_.getMin();
    }

    /** @param {number} min */
    ,
    set: function set(min) {
      this.foundation_.setMin(min);
    }

    /** @return {number} */

  }, {
    key: 'max',
    get: function get() {
      return this.foundation_.getMax();
    }

    /** @param {number} max */
    ,
    set: function set(max) {
      this.foundation_.setMax(max);
    }

    /** @return {number} */

  }, {
    key: 'step',
    get: function get() {
      return this.foundation_.getStep();
    }

    /** @param {number} step */
    ,
    set: function set(step) {
      this.foundation_.setStep(step);
    }

    /** @return {boolean} */

  }, {
    key: 'disabled',
    get: function get() {
      return this.foundation_.isDisabled();
    }

    /** @param {boolean} disabled */
    ,
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    }
  }]);

  return MDCSlider;
}(component["a" /* default */]);



/***/ }),

/***/ "5E5G":
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "5iVr":
/***/ (function(module, exports) {

/**
 * Disallows selecting text.
 */
module.exports = createTextSelectionInterceptor;

function createTextSelectionInterceptor() {
  var dragObject;
  var prevSelectStart;
  var prevDragStart;

  return {
    capture: capture,
    release: release
  };

  function capture(domObject) {
    prevSelectStart = window.document.onselectstart;
    prevDragStart = window.document.ondragstart;

    window.document.onselectstart = disabled;

    dragObject = domObject;
    dragObject.ondragstart = disabled;
  }

  function release() {
    window.document.onselectstart = prevSelectStart;
    if (dragObject) dragObject.ondragstart = prevDragStart;
  }
}

function disabled(e) {
  e.stopPropagation();
  return false;
}

/***/ }),

/***/ "5sRW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var util_namespaceObject = {};
__webpack_require__.d(util_namespaceObject, "createFocusTrapInstance", function() { return createFocusTrapInstance; });

// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var foundation = __webpack_require__("uJAj");

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// CONCATENATED MODULE: ../node_modules/@material/base/index.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__("vkNc");

// CONCATENATED MODULE: ../node_modules/@material/dialog/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var cssClasses = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
};

var strings = {
  OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
  DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
  ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
  ACCEPT_EVENT: 'MDCDialog:accept',
  CANCEL_EVENT: 'MDCDialog:cancel'
};

var numbers = {
  DIALOG_ANIMATION_TIME_MS: 120
};


// CONCATENATED MODULE: ../node_modules/@material/dialog/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




var foundation_MDCDialogFoundation = function (_MDCFoundation) {
  _inherits(MDCDialogFoundation, _MDCFoundation);

  _createClass(MDCDialogFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        addBodyClass: function addBodyClass() /* className: string */{},
        removeBodyClass: function removeBodyClass() /* className: string */{},
        eventTargetHasClass: function eventTargetHasClass() {
          return (/* target: EventTarget, className: string */ /* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        notifyAccept: function notifyAccept() {},
        notifyCancel: function notifyCancel() {},
        trapFocusOnSurface: function trapFocusOnSurface() {},
        untrapFocusOnSurface: function untrapFocusOnSurface() {},
        isDialog: function isDialog() {
          return (/* el: Element */ /* boolean */false
          );
        }
      };
    }
  }]);

  function MDCDialogFoundation(adapter) {
    _classCallCheck(this, MDCDialogFoundation);

    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

    _this.isOpen_ = false;
    _this.componentClickHandler_ = function (evt) {
      if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.BACKDROP)) {
        _this.cancel(true);
      }
    };
    _this.dialogClickHandler_ = function (evt) {
      return _this.handleDialogClick_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.cancel(true);
      }
    };

    _this.timerId_ = 0;
    _this.animationTimerEnd_ = function (evt) {
      return _this.handleAnimationTimerEnd_(evt);
    };
    return _this;
  }

  MDCDialogFoundation.prototype.destroy = function destroy() {
    // Ensure that dialog is cleaned up when destroyed
    if (this.isOpen_) {
      this.close();
    }
    // Final cleanup of animating class in case the timer has not completed.
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
    clearTimeout(this.timerId_);
  };

  MDCDialogFoundation.prototype.open = function open() {
    this.isOpen_ = true;
    this.disableScroll_();
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
    clearTimeout(this.timerId_);
    this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
  };

  MDCDialogFoundation.prototype.close = function close() {
    this.isOpen_ = false;
    this.enableScroll_();
    this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.untrapFocusOnSurface();
    clearTimeout(this.timerId_);
    this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
  };

  MDCDialogFoundation.prototype.isOpen = function isOpen() {
    return this.isOpen_;
  };

  MDCDialogFoundation.prototype.accept = function accept(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyAccept();
    }

    this.close();
  };

  MDCDialogFoundation.prototype.cancel = function cancel(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyCancel();
    }

    this.close();
  };

  MDCDialogFoundation.prototype.handleDialogClick_ = function handleDialogClick_(evt) {
    var target = evt.target;

    if (this.adapter_.eventTargetHasClass(target, cssClasses.ACCEPT_BTN)) {
      this.accept(true);
    } else if (this.adapter_.eventTargetHasClass(target, cssClasses.CANCEL_BTN)) {
      this.cancel(true);
    }
  };

  MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function handleAnimationTimerEnd_() {
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
    if (this.isOpen_) {
      this.adapter_.trapFocusOnSurface();
    }
  };

  MDCDialogFoundation.prototype.disableScroll_ = function disableScroll_() {
    this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
  };

  MDCDialogFoundation.prototype.enableScroll_ = function enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
  };

  return MDCDialogFoundation;
}(foundation["a" /* default */]);


// EXTERNAL MODULE: ../node_modules/focus-trap/index.js
var focus_trap = __webpack_require__("ySUw");
var focus_trap_default = /*#__PURE__*/__webpack_require__.n(focus_trap);

// CONCATENATED MODULE: ../node_modules/@material/dialog/util.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
  var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focus_trap_default.a;

  return focusTrapFactory(surfaceEl, {
    initialFocus: acceptButtonEl,
    clickOutsideDeactivates: true
  });
}
// CONCATENATED MODULE: ../node_modules/@material/dialog/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCDialog", function() { return dialog_MDCDialog; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCDialogFoundation", function() { return foundation_MDCDialogFoundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "util", function() { return util_namespaceObject; });
var dialog__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function dialog__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dialog__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function dialog__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */










var dialog_MDCDialog = function (_MDCComponent) {
  dialog__inherits(MDCDialog, _MDCComponent);

  function MDCDialog() {
    dialog__classCallCheck(this, MDCDialog);

    return dialog__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCDialog.attachTo = function attachTo(root) {
    return new MDCDialog(root);
  };

  MDCDialog.prototype.initialize = function initialize() {
    this.focusTrap_ = createFocusTrapInstance(this.dialogSurface_, this.acceptButton_);
    this.footerBtnRipples_ = [];

    var footerBtns = this.root_.querySelectorAll('.mdc-dialog__footer__button');
    for (var i = 0, footerBtn; footerBtn = footerBtns[i]; i++) {
      this.footerBtnRipples_.push(new ripple["MDCRipple"](footerBtn));
    }
  };

  MDCDialog.prototype.destroy = function destroy() {
    this.footerBtnRipples_.forEach(function (ripple) {
      return ripple.destroy();
    });
    _MDCComponent.prototype.destroy.call(this);
  };

  MDCDialog.prototype.show = function show() {
    this.foundation_.open();
  };

  MDCDialog.prototype.close = function close() {
    this.foundation_.close();
  };

  MDCDialog.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new foundation_MDCDialogFoundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      eventTargetHasClass: function eventTargetHasClass(target, className) {
        return target.classList.contains(className);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this2.root_.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this2.root_.removeEventListener(evt, handler);
      },
      registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler(evt, handler) {
        return _this2.dialogSurface_.addEventListener(evt, handler);
      },
      deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler(evt, handler) {
        return _this2.dialogSurface_.removeEventListener(evt, handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      notifyAccept: function notifyAccept() {
        return _this2.emit(foundation_MDCDialogFoundation.strings.ACCEPT_EVENT);
      },
      notifyCancel: function notifyCancel() {
        return _this2.emit(foundation_MDCDialogFoundation.strings.CANCEL_EVENT);
      },
      trapFocusOnSurface: function trapFocusOnSurface() {
        return _this2.focusTrap_.activate();
      },
      untrapFocusOnSurface: function untrapFocusOnSurface() {
        return _this2.focusTrap_.deactivate();
      },
      isDialog: function isDialog(el) {
        return el === _this2.dialogSurface_;
      }
    });
  };

  dialog__createClass(MDCDialog, [{
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    }
  }, {
    key: 'acceptButton_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCDialogFoundation.strings.ACCEPT_SELECTOR);
    }
  }, {
    key: 'dialogSurface_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCDialogFoundation.strings.DIALOG_SURFACE_SELECTOR);
    }
  }]);

  return MDCDialog;
}(component["a" /* default */]);

/***/ }),

/***/ "6IAg":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),

/***/ "6rxR":
/***/ (function(module, exports) {

module.exports = makeSvgController;

function makeSvgController(svgElement, options) {
  var elementValid = svgElement instanceof SVGElement;
  if (!elementValid) {
    throw new Error('svg element is required for svg.panzoom to work');
  }

  var owner = svgElement.ownerSVGElement;
  if (!owner) {
    throw new Error('Do not apply panzoom to the root <svg> element. ' + 'Use its child instead (e.g. <g></g>). ' + 'As of March 2016 only FireFox supported transform on the root element');
  }

  if (!options.disableKeyboardInteraction) {
    owner.setAttribute('tabindex', 0);
  }

  var api = {
    getBBox: getBBox,
    getScreenCTM: getScreenCTM,
    getOwner: getOwner,
    applyTransform: applyTransform,
    initTransform: initTransform
  };

  return api;

  function getOwner() {
    return owner;
  }

  function getBBox() {
    var bbox = svgElement.getBBox();
    return {
      left: bbox.x,
      top: bbox.y,
      width: bbox.width,
      height: bbox.height
    };
  }

  function getScreenCTM() {
    return owner.getScreenCTM();
  }

  function initTransform(transform) {
    var screenCTM = svgElement.getScreenCTM();
    transform.x = screenCTM.e;
    transform.y = screenCTM.f;
    transform.scale = screenCTM.a;
    owner.removeAttributeNS(null, 'viewBox');
  }

  function applyTransform(transform) {
    svgElement.setAttribute('transform', 'matrix(' + transform.scale + ' 0 0 ' + transform.scale + ' ' + transform.x + ' ' + transform.y + ')');
  }
}

/***/ }),

/***/ "6vkq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Slider = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _typeof2 = _interopRequireDefault(__webpack_require__("b9XL"));

var _slider = __webpack_require__("4MWp");

var _bindDecorator = __webpack_require__("gKs0");

var _preact = __webpack_require__("KM04");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__("uc5p"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

var Slider =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Slider, _MaterialComponent);

  function Slider() {
    var _this;

    (0, _classCallCheck2.default)(this, Slider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Slider).apply(this, arguments));
    _this.componentName = 'slider';
    _this.mdcProps = ['discrete'];
    return _this;
  }

  (0, _createClass2.default)(Slider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Slider.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        this.MDComponent = new _slider.MDCSlider(this.control);
        this.MDComponent.listen('MDCSlider:change', this.onChange);
        this.MDComponent.listen('MDCSlider:input', this.onInput);
      }

      this.setValue(this.props.value); // set initial value programatically because of error if min is greater than initial max
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Slider.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.unlisten('MDCSlider:change', this.onChange);
        this.MDComponent.unlisten('MDCSlider:input', this.onInput);
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.MDComponent) {
        return this.MDComponent.value;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this$props = this.props,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === void 0 ? false : _this$props$disabled,
          _this$props$min = _this$props.min,
          min = _this$props$min === void 0 ? 0 : _this$props$min,
          _this$props$max = _this$props.max,
          max = _this$props$max === void 0 ? 100 : _this$props$max,
          step = _this$props.step;

      if (this.MDComponent) {
        if (min > this.MDComponent.max) {
          this.MDComponent.max = max;
          this.MDComponent.min = min;
        } else {
          this.MDComponent.min = min;
          this.MDComponent.max = max;
        }

        if (value) {
          this.MDComponent.value = value;
        }

        this.MDComponent.disabled = disabled;

        if (step) {
          this.MDComponent.step = step;
        }
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      if (this.props.onInput) {
        this.props.onInput(e);
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(allprops) {
      var _allprops$tabindex = allprops.tabindex,
          tabIndex = _allprops$tabindex === void 0 ? 0 : _allprops$tabindex,
          props = __rest(allprops, ["tabindex"]);

      this.setValue(allprops);
      return (0, _preact.h)("div", _extends({
        tabIndex: tabIndex,
        role: "slider",
        "aria-label": "Select Value",
        ref: this.setControlRef
      }, props), (0, _preact.h)("div", {
        class: "mdc-slider__track-container"
      }, (0, _preact.h)("div", {
        class: "mdc-slider__track"
      })), (0, _preact.h)("div", {
        class: "mdc-slider__thumb-container"
      }, props.discrete && (0, _preact.h)("div", {
        class: "mdc-slider__pin"
      }, (0, _preact.h)("span", {
        class: "mdc-slider__pin-value-marker"
      })), (0, _preact.h)("svg", {
        class: "mdc-slider__thumb",
        width: "21",
        height: "21"
      }, (0, _preact.h)("circle", {
        cx: "10.5",
        cy: "10.5",
        r: "7.875"
      })), (0, _preact.h)("div", {
        class: "mdc-slider__focus-ring"
      })));
    }
  }]);
  return Slider;
}(_MaterialComponent2.default);

exports.Slider = Slider;

__decorate([_bindDecorator.bind], Slider.prototype, "onChange", null);

__decorate([_bindDecorator.bind], Slider.prototype, "onInput", null);

var _default = Slider;
exports.default = _default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "7/2Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
  );
};

/***/ }),

/***/ "7/cg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Button = exports.ButtonIcon = void 0;

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _preact = __webpack_require__("KM04");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__("uc5p"));

var _Icon2 = _interopRequireDefault(__webpack_require__("MeGi"));

var _generateThemeClass = _interopRequireDefault(__webpack_require__("QTRl"));

var ButtonIcon =
/*#__PURE__*/
function (_Icon) {
  (0, _inherits2.default)(ButtonIcon, _Icon);

  function ButtonIcon() {
    var _this;

    (0, _classCallCheck2.default)(this, ButtonIcon);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ButtonIcon).apply(this, arguments));
    _this.componentName = 'button__icon';
    return _this;
  }

  return ButtonIcon;
}(_Icon2.default);

exports.ButtonIcon = ButtonIcon;

var Button =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Button, _MaterialComponent);

  function Button() {
    var _this2;

    (0, _classCallCheck2.default)(this, Button);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Button).apply(this, arguments));
    _this2.componentName = 'button';
    _this2.mdcProps = ['dense', 'raised', 'unelevated', 'outlined'];
    _this2.themeProps = ['primary', 'secondary'];
    return _this2;
  }

  (0, _createClass2.default)(Button, [{
    key: "materialDom",
    value: function materialDom(props) {
      var ButtonElement = props.href ? 'a' : 'button';
      var className = '';
      this.themeProps.forEach(function (themeProp) {
        if (themeProp in props && props[themeProp] !== false) {
          className += (0, _generateThemeClass.default)(themeProp) + ' ';
        }
      });
      return (0, _preact.h)(ButtonElement, _extends({
        ref: this.setControlRef
      }, props, {
        className: className
      }), this.props.children);
    }
  }]);
  return Button;
}(_MaterialComponent2.default);

exports.Button = Button;

var default_1 =
/*#__PURE__*/
function (_Button) {
  (0, _inherits2.default)(default_1, _Button);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(Button);

exports.default = default_1;
default_1.Icon = ButtonIcon;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "8NLT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__("jcLW");
} else {
  module.exports = __webpack_require__("9WM/");
}

/***/ }),

/***/ "97RM":
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "9WM/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var tty = __webpack_require__("Axko");

var util = __webpack_require__("Bcfi");
/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __webpack_require__("DYmO");

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return (/^debug_/i.test(key)
  );
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__("Kest")(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/***/ }),

/***/ "AZ2D":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"palete":"palete__2Kli4","color":"color__1NDm2","active":"active__25DOn","logo":"logo__1ECGO"};

/***/ }),

/***/ "AkAO":
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "Axko":
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "BXyq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");
var normalizeHeaderName = __webpack_require__("M8l6");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("KRuG");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__("bRJm");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/***/ }),

/***/ "Bcfi":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "Cv2I":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TextField = exports.TextFieldInput = exports.Label = exports.HelperText = void 0;

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _textfield = __webpack_require__("VcCu");

var _preact = __webpack_require__("KM04");

var _MaterialComponent4 = _interopRequireDefault(__webpack_require__("uc5p"));

var _Icon = _interopRequireDefault(__webpack_require__("MeGi"));

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

var HelperText =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(HelperText, _MaterialComponent);

  function HelperText() {
    var _this;

    (0, _classCallCheck2.default)(this, HelperText);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HelperText).apply(this, arguments));
    _this.componentName = 'text-field-helper-text';
    _this.mdcProps = ['persistent', 'validation-msg'];
    return _this;
  }

  (0, _createClass2.default)(HelperText, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("p", _extends({}, props, {
        "aria-hidden": "true"
      }), props.children);
    }
  }]);
  return HelperText;
}(_MaterialComponent4.default);

exports.HelperText = HelperText;

var Label =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(Label, _MaterialComponent2);

  function Label() {
    var _this2;

    (0, _classCallCheck2.default)(this, Label);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Label).apply(this, arguments));
    _this2.componentName = 'floating-label';
    _this2.mdcProps = [];
    return _this2;
  }

  (0, _createClass2.default)(Label, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("label", _extends({}, props), props.children);
    }
  }]);
  return Label;
}(_MaterialComponent4.default);

exports.Label = Label;

var TextFieldInput =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(TextFieldInput, _MaterialComponent3);

  function TextFieldInput() {
    var _this3;

    (0, _classCallCheck2.default)(this, TextFieldInput);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TextFieldInput).apply(this, arguments));
    _this3.state = {
      jsComponentAttached: false
    };
    _this3.componentName = 'text-field';
    _this3.mdcProps = ['fullwidth', 'textarea', 'dense', 'disabled', 'box', 'outlined'];
    _this3.mdcNotifyProps = ['valid', 'disabled'];
    return _this3;
  }

  (0, _createClass2.default)(TextFieldInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      (0, _get2.default)((0, _getPrototypeOf2.default)(TextFieldInput.prototype), "componentDidMount", this).call(this);
      this.setState({
        jsComponentAttached: true
      }, function () {
        if (_this4.control) {
          _this4.MDComponent = new _textfield.MDCTextField(_this4.control);

          if (_this4.props.onInit) {
            _this4.props.onInit(_this4.MDComponent);
          }

          if (_this4.props.value) {
            _this4.MDComponent.value = _this4.props.value;
          }
        }

        _this4.afterComponentDidMount();
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TextFieldInput.prototype), "componentWillReceiveProps", this).call(this, nextProps);

      if (this.MDComponent && nextProps.value && this.props.value !== nextProps.value && this.MDComponent.value !== nextProps.value) {
        this.MDComponent.value = nextProps.value;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TextFieldInput.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.MDComponent ? this.MDComponent.value : null;
    }
  }, {
    key: "materialDom",
    value: function materialDom(allprops) {
      var className = allprops.className,
          outerStyle = allprops.outerStyle,
          outlined = allprops.outlined,
          props = __rest(allprops, ["className", "outerStyle", "outlined"]);

      className = className || '';

      if ('leadingIcon' in props) {
        className += ' mdc-text-field--box mdc-text-field--with-leading-icon';
      }

      if ('trailingIcon' in props) {
        className += ' mdc-text-field--box mdc-text-field--with-trailing-icon';
      }

      if ('value' in props && this.state.jsComponentAttached) {
        className = [className, 'mdc-text-field--upgraded'].join(' ');
      }

      if (props.label && props.fullwidth) {
        console.log('Passing a "label" prop is not supported when using a "fullwidth" text field.');
      } // noinspection RequiredAttributes


      return (0, _preact.h)("div", {
        className: className,
        ref: this.setControlRef,
        style: outerStyle
      }, props.leadingIcon ? (0, _preact.h)(_Icon.default, {
        className: "mdc-text-field__icon"
      }, props.leadingIcon) : null, props.textarea ? (0, _preact.h)("textarea", _extends({
        className: "mdc-text-field__input"
      }, props)) : (0, _preact.h)("input", _extends({
        type: props.type || 'text',
        className: "mdc-text-field__input",
        placeholder: this.state.jsComponentAttached ? undefined : props.label + this.props.required ? '*' : ''
      }, props)), props.label && this.state.jsComponentAttached && (0, _preact.h)(Label, {
        for: props.id
      }, props.label), props.trailingIcon ? (0, _preact.h)(_Icon.default, {
        className: "mdc-text-field__icon"
      }, props.trailingIcon) : null, props.textarea || outlined ? null : (0, _preact.h)("div", {
        class: "mdc-line-ripple"
      }), outlined ? (0, _preact.h)("div", {
        class: "mdc-notched-outline"
      }, (0, _preact.h)("svg", null, (0, _preact.h)("path", {
        className: "mdc-notched-outline__path"
      }))) : null, outlined ? (0, _preact.h)("div", {
        className: "mdc-notched-outline__idle"
      }) : null);
    }
  }, {
    key: "buildClassName",
    value: function buildClassName(props) {
      var cn = (0, _get2.default)((0, _getPrototypeOf2.default)(TextFieldInput.prototype), "buildClassName", this).call(this, props);

      if (this.MDComponent) {
        cn += ' mdc-text-field--upgraded';
      }

      return cn;
    }
  }]);
  return TextFieldInput;
}(_MaterialComponent4.default);

exports.TextFieldInput = TextFieldInput;
TextFieldInput.defaultProps = {
  valid: true
};

var TextField =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TextField, _Component);

  function TextField() {
    var _this5;

    (0, _classCallCheck2.default)(this, TextField);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TextField).apply(this, arguments));
    _this5.id = TextField.uid();
    return _this5;
  }

  (0, _createClass2.default)(TextField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        jsComponentAttached: true
      });
    }
  }, {
    key: "render",
    value: function render(allprops) {
      var _this6 = this;

      var className = allprops.className,
          outerStyle = allprops.outerStyle,
          helperTextPersistent = allprops.helperTextPersistent,
          helperTextValidationMsg = allprops.helperTextValidationMsg,
          props = __rest(allprops, ["className", "outerStyle", "helperTextPersistent", "helperTextValidationMsg"]);

      var showDiv = props.helperText;

      if ((props.helperText || props.label) && !props.id) {
        props.id = "tf-".concat(this.id);
      } // Helper text


      var helperTextProps = {
        persistent: helperTextPersistent,
        'validation-msg': helperTextValidationMsg
      };
      return showDiv ? (0, _preact.h)("div", {
        className: className,
        style: outerStyle
      }, (0, _preact.h)(TextFieldInput, _extends({}, props, {
        onInit: function onInit(MDComponent) {
          _this6.MDComponent = MDComponent;
        },
        "aria-controls": props.helperText && "".concat(props.id, "-helper-text")
      })), props.helperText && (0, _preact.h)(HelperText, _extends({
        id: "".concat(props.id, "-helper-text")
      }, helperTextProps), props.helperText)) : (0, _preact.h)(TextFieldInput, _extends({}, props, {
        className: className,
        outerStyle: outerStyle,
        onInit: function onInit(MDComponent) {
          _this6.MDComponent = MDComponent;
        }
      }));
    }
  }], [{
    key: "uid",
    value: function uid() {
      return ++this.uidCounter;
    }
  }]);
  return TextField;
}(_preact.Component);

exports.TextField = TextField;
TextField.uidCounter = 0;

var default_1 =
/*#__PURE__*/
function (_TextField) {
  (0, _inherits2.default)(default_1, _TextField);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(TextField);

exports.default = default_1;
default_1.HelperText = HelperText;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "DYmO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function hasFlag(flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
}();

/***/ }),

/***/ "E7HD":
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "ED/T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "EQDb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__("uJAj");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @template F
 */

var MDCComponent = function () {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  MDCComponent.attachTo = function attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
  };

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.prototype.initialize = function initialize() /* ...args */{}
  // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.


  /**
   * @return {!F} foundation
   */
  ;

  MDCComponent.prototype.getDefaultFoundation = function getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.listen = function listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.unlisten = function unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  MDCComponent.prototype.emit = function emit(evtType, evtData) {
    var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (MDCComponent);

/***/ }),

/***/ "FJnM":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _preact = __webpack_require__("KM04");

var _preactSideEffect = __webpack_require__("xToX");

var _preactSideEffect2 = _interopRequireDefault(_preactSideEffect);

var _deepEqual = __webpack_require__("koiw");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _objectAssign = __webpack_require__("J4Nk");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("Qxat");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var HELMET_ATTRIBUTE = "data-preact-helmet";

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props[property]) {
            return props[property];
        }
    }
    return null;
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, "title");
    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

    return innermostTitle || innermostDefaultTitle || "";
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        return typeof props[tagName] !== "undefined";
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var updateTitle = function updateTitle(title, attributes) {
    document.title = title || document.title;
    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var htmlTag = document.getElementsByTagName(tagName)[0];
    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";
        htmlTag.setAttribute(attribute, value);

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        htmlTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
    } else {
        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector("head");
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === "innerHTML") {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === "cssText") {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes) {
    var attributeString = generateHtmlAttributesAsString(attributes);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeString + ">" + encodeSpecialCharacters(title) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + ">" + encodeSpecialCharacters(title) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === "innerHTML" || attribute === "cssText");
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute]) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = [_HelmetConstants.TAG_NAMES.NOSCRIPT, _HelmetConstants.TAG_NAMES.SCRIPT, _HelmetConstants.TAG_NAMES.STYLE].indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeHtml + (isSelfClosing ? ">" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var generateTitleAsPreactComponent = function generateTitleAsPreactComponent(type, title, attributes) {
    // assigning into an array to define toString function on it
    var initProps = _defineProperty({
        key: title
    }, HELMET_ATTRIBUTE, true);
    var props = Object.keys(attributes).reduce(function (obj, key) {
        obj[key] = attributes[key];
        return obj;
    }, initProps);

    return [(0, _preact.h)(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsPreactComponent = function generateTagsAsPreactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var mappedTag = _defineProperty({
            key: i
        }, HELMET_ATTRIBUTE, true);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = attribute;

            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return (0, _preact.h)(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsPreactComponent(type, tags.title, tags.titleAttributes);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes);
                }
            };
        case _HelmetConstants.TAG_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return tags;
                },
                toString: function toString() {
                    return generateHtmlAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsPreactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var htmlAttributes = _ref.htmlAttributes,
        title = _ref.title,
        titleAttributes = _ref.titleAttributes,
        baseTag = _ref.baseTag,
        metaTags = _ref.metaTags,
        linkTags = _ref.linkTags,
        scriptTags = _ref.scriptTags,
        noscriptTags = _ref.noscriptTags,
        styleTags = _ref.styleTags;
    return {
        htmlAttributes: getMethodsForTag(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }),
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };
};

/**
 * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
 * @param {String} title: "Title"
 * @param {String} defaultTitle: "Default Title"
 * @param {String} titleTemplate: "MySite.com - %s"
 * @param {Object} titleAttributes: {"itemprop": "name"}
 * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
 * @param {Array} meta: [{"name": "description", "content": "Test description"}]
 * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
 * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
 * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
 * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
 * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
 */
var Helmet = function Helmet(WrappedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(HelmetWrapper, _Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, (HelmetWrapper.__proto__ || Object.getPrototypeOf(HelmetWrapper)).apply(this, arguments));
        }

        _createClass(HelmetWrapper, [{
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                var props = _extends({}, nextProps);
                if (!props.children || !props.children.length) {
                    delete props.children;
                }
                return !(0, _deepEqual2.default)(this.props, props);
            }
        }, {
            key: "render",
            value: function render() {
                return (0, _preact.h)(WrappedComponent, this.props);
            }
        }], [{
            key: "canUseDOM",

            // WrappedComponent.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.
            set: function set(canUseDOM) {
                WrappedComponent.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_preact.Component), _class.peek = WrappedComponent.peek, _class.rewind = function () {
        var mappedState = WrappedComponent.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                htmlAttributes: {},
                title: "",
                titleAttributes: {},
                baseTag: [],
                metaTags: [],
                linkTags: [],
                scriptTags: [],
                noscriptTags: [],
                styleTags: []
            });
        }

        return mappedState;
    }, _temp;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.TAG_NAMES.HTML, propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        onChangeClientState: getOnChangeClientState(propsList)
    };
};

var handleClientStateChange = function handleClientStateChange(newState) {
    var htmlAttributes = newState.htmlAttributes,
        title = newState.title,
        titleAttributes = newState.titleAttributes,
        baseTag = newState.baseTag,
        metaTags = newState.metaTags,
        linkTags = newState.linkTags,
        scriptTags = newState.scriptTags,
        noscriptTags = newState.noscriptTags,
        styleTags = newState.styleTags,
        onChangeClientState = newState.onChangeClientState;

    updateAttributes("html", htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;

        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    onChangeClientState(newState, addedTags, removedTags);
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _preactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

exports.default = Helmet(HelmetSideEffects);
module.exports = exports["default"];

/***/ }),

/***/ "FnKr":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "H6Qo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "IpTH":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "J4Nk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),

/***/ "J5U+":
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__("UJE0");

var superPropBase = __webpack_require__("/aYh");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/preact-router/dist/preact-router.es.js


var EMPTY$1 = {};

function preact_router_es_assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var preact_router_es_Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					preact_router_es_assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(preact_min["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact_min["Component"]);

var preact_router_es_Link = function Link(props) {
	return Object(preact_min["h"])('a', preact_router_es_assign({ onClick: handleLinkClick }, props));
};

var preact_router_es_Route = function Route(props) {
	return Object(preact_min["h"])(props.component, props);
};

preact_router_es_Router.subscribers = subscribers;
preact_router_es_Router.getCurrentUrl = getCurrentUrl;
preact_router_es_Router.route = route;
preact_router_es_Router.Router = preact_router_es_Router;
preact_router_es_Router.Route = preact_router_es_Route;
preact_router_es_Router.Link = preact_router_es_Link;

/* harmony default export */ var preact_router_es = (preact_router_es_Router);
//# sourceMappingURL=preact-router.es.js.map
// EXTERNAL MODULE: ../node_modules/axios/index.js
var axios = __webpack_require__("dZBD");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./utils/auth-service.js
// const ID_TOKEN_KEY = 'id_token';



var ACCESS_TOKEN_KEY = 'va',
    ID_TOKEN_KEY = 'la',
    BASE_URL = 'http://localhost:3000',
    BASE_URL_PRIVATE = BASE_URL + '/api/v1';
// production
// BASE_URL  'http://api.vote4art.eu';

function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setAccessToken(accessToken) {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}
function login(pramas) {
	var url = BASE_URL + '/login';

	axios_default.a.post(url, {
		username: pramas.username,
		password: pramas.password
	}).then(function (response) {
		localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
}
function signup(pramas) {
	var url = BASE_URL + '/signup';
	axios_default.a.post(url, {
		username: pramas.username,
		password: pramas.password,
		password_confirmation: pramas.password

	}).then(function (response) {

		localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
		localStorage.setItem(ID_TOKEN_KEY, response.data.jti);

		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
}
function auth_service_logout() {
	sendLogout();
	clearIdToken();
	clearAccessToken();
	window.location.href = '/';
}

function facebookLogin(data) {
	// // signedRequest
	// const url = `${BASE_URL}/auth/facebook/callback?code=${data.accessToken}`;
	// return axios.get(url, data).then(response => console.log(response.data)).catch( e => console.log(e));
}

function clearIdToken() {
	localStorage.removeItem(ID_TOKEN_KEY);
}

function sendLogout() {
	var url = BASE_URL + '/logout';
	return axios_default.a.delete(url, { headers: { Authorization: getAccessToken() } }).then(function (response) {
		return console.log(response.data);
	});
}

function clearAccessToken() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
}
// EXTERNAL MODULE: ../node_modules/preact-material-components/TopAppBar/index.js
var TopAppBar = __webpack_require__("fHKL");
var TopAppBar_default = /*#__PURE__*/__webpack_require__.n(TopAppBar);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Button/index.js
var Button = __webpack_require__("7/cg");
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TextField/index.js
var TextField = __webpack_require__("Cv2I");
var TextField_default = /*#__PURE__*/__webpack_require__.n(TextField);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TextField/style.css
var TextField_style = __webpack_require__("qKn3");
var TextField_style_default = /*#__PURE__*/__webpack_require__.n(TextField_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Button/style.css
var Button_style = __webpack_require__("aqQ4");
var Button_style_default = /*#__PURE__*/__webpack_require__.n(Button_style);

// EXTERNAL MODULE: ./components/auth/style.css
var auth_style = __webpack_require__("fF25");
var auth_style_default = /*#__PURE__*/__webpack_require__.n(auth_style);

// CONCATENATED MODULE: ./components/auth/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import FacebookLogin from 'react-facebook-login';






var auth_Auth = function (_Component) {
	_inherits(Auth, _Component);

	function Auth() {
		_classCallCheck(this, Auth);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.swith = function (e) {
			if (_this.tab === 'register') {
				_this.tab = 'login';
				_this.base.getElementsByClassName('tab')[1].classList.remove('disabled');
				_this.base.getElementsByClassName('tab')[0].classList.add('disabled');
			} else {
				_this.tab = 'register';
				_this.base.getElementsByClassName('tab')[0].classList.remove('disabled');
				_this.base.getElementsByClassName('tab')[1].classList.add('disabled');
			}
		};

		_this.responseFacebook = function (response) {

			facebookLogin(response);
		};

		_this.tab = 'login';
		_this.state = {
			username: '',
			password: ''
		};
		_this.handleInputChange = _this.handleInputChange.bind(_this);
		_this.loginSimple = _this.loginSimple.bind(_this);
		_this.registerSimple = _this.registerSimple.bind(_this);
		_this.swith = _this.swith.bind(_this);

		return _this;
	}

	Auth.prototype.loginSimple = function loginSimple() {
		login(this.state);
	};

	Auth.prototype.registerSimple = function registerSimple() {
		signup(this.state);
	};

	Auth.prototype.logout = function logout() {
		auth_service_logout();
	};

	Auth.prototype.isLogedIn = function isLogedIn() {
		// isLogedIn();
	};

	Auth.prototype.handleInputChange = function handleInputChange(event) {
		var _setState;

		var target = event.target;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		var name = target.name;
		this.setState((_setState = {}, _setState[name] = value, _setState));
	};

	Auth.prototype.render = function render(props) {
		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'tab disabled' },
				Object(preact_min["h"])(
					Button_default.a,
					{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.swith },
					'auth.login '
				),
				Object(preact_min["h"])(TextField_default.a, {
					type: 'text',
					name: 'username',
					onInput: this.handleInputChange,
					label: 'Slapyvardis'
				}),
				Object(preact_min["h"])(TextField_default.a, {
					type: 'password',
					name: 'password',
					onInput: this.handleInputChange,
					label: 'Slapta\u017Eodis'
				}),
				Object(preact_min["h"])(
					Button_default.a,
					{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.registerSimple },
					'auth.register  '
				),
				Object(preact_min["h"])(
					Button_default.a,
					{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.isLogedIn },
					'auth.facebook  '
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'tab' },
				Object(preact_min["h"])(
					Button_default.a,
					{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.swith },
					'auth.register '
				),
				Object(preact_min["h"])(TextField_default.a, {
					type: 'text',
					name: 'username',
					onInput: this.handleInputChange,
					label: 'Slapyvardis'
				}),
				Object(preact_min["h"])(TextField_default.a, {
					type: 'password',
					name: 'password',
					onInput: this.handleInputChange,
					label: 'Slapta\u017Eodis'
				}),
				Object(preact_min["h"])(
					Button_default.a,
					{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.isLogedIn },
					'auth.facebook  '
				),
				Object(preact_min["h"])(
					Button_default.a,
					{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.loginSimple },
					'auth.login'
				)
			)
		);
	};

	return Auth;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/preact-material-components/Dialog/index.js
var Dialog = __webpack_require__("JtzT");
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Switch/index.js
var Switch = __webpack_require__("wfAA");
var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Switch/style.css
var Switch_style = __webpack_require__("IpTH");
var Switch_style_default = /*#__PURE__*/__webpack_require__.n(Switch_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Dialog/style.css
var Dialog_style = __webpack_require__("sEh6");
var Dialog_style_default = /*#__PURE__*/__webpack_require__.n(Dialog_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Drawer/style.css
var Drawer_style = __webpack_require__("RYBc");
var Drawer_style_default = /*#__PURE__*/__webpack_require__.n(Drawer_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/List/style.css
var List_style = __webpack_require__("u+vq");
var List_style_default = /*#__PURE__*/__webpack_require__.n(List_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TopAppBar/style.css
var TopAppBar_style = __webpack_require__("FnKr");
var TopAppBar_style_default = /*#__PURE__*/__webpack_require__.n(TopAppBar_style);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TabBar/style.css
var TabBar_style = __webpack_require__("PIA1");
var TabBar_style_default = /*#__PURE__*/__webpack_require__.n(TabBar_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TabBar/index.js
var TabBar = __webpack_require__("Q5pt");
var TabBar_default = /*#__PURE__*/__webpack_require__.n(TabBar);

// CONCATENATED MODULE: ./components/header/index.js


function header__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function header__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

















var _ref = Object(preact_min["h"])(TopAppBar_default.a.Title, null);

var _ref2 = Object(preact_min["h"])(
	TopAppBar_default.a.Icon,
	null,
	'settings'
);

var _ref3 = Object(preact_min["h"])(
	Dialog_default.a.Header,
	null,
	'auth.title',
	Object(preact_min["h"])(
		Dialog_default.a.FooterButton,
		{ style: 'float: right;', cancel: true },
		'close'
	)
);

var _ref4 = Object(preact_min["h"])(
	Dialog_default.a.Body,
	null,
	Object(preact_min["h"])(auth_Auth, null)
);

var _ref5 = Object(preact_min["h"])(Dialog_default.a.Footer, null);

var header_Header = function (_Component) {
	header__inherits(Header, _Component);

	function Header() {
		var _temp, _this, _ret;

		header__classCallCheck(this, Header);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = header__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.openSettings = function () {
			return _this.dialog.MDComponent.show();
		}, _this.dialogRef = function (dialog) {
			return _this.dialog = dialog;
		}, _this.linkTo = function (path) {
			return function () {
				route(path);
				_this.closeDrawer();
			};
		}, _this.goHome = _this.linkTo('/'), _this.goToMyProfile = _this.linkTo('/profile'), _this.toggleDarkTheme = function () {
			_this.setState({
				darkThemeEnabled: !_this.state.darkThemeEnabled
			}, function () {
				if (_this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				} else {
					document.body.classList.remove('mdc-theme--dark');
				}
			});
		}, _temp), header__possibleConstructorReturn(_this, _ret);
	}

	Header.prototype.closeDrawer = function closeDrawer() {
		this.state = {
			darkThemeEnabled: false
		};
	};

	Header.prototype.render = function render(props) {
		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				TopAppBar_default.a,
				{ className: 'topappbar mdc-elevation--z3' },
				Object(preact_min["h"])(
					TopAppBar_default.a.Row,
					null,
					Object(preact_min["h"])(
						TopAppBar_default.a.Section,
						{ 'align-start': true },
						_ref
					),
					Object(preact_min["h"])(
						TopAppBar_default.a.Section,
						{ 'align-end': true, 'shrink-to-fit': true, onClick: this.openSettings },
						_ref2
					)
				)
			),
			Object(preact_min["h"])(
				Dialog_default.a,
				{ ref: this.dialogRef },
				_ref3,
				_ref4,
				_ref5
			)
		);
	};

	return Header;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/preact-material-components/Card/index.js
var Card = __webpack_require__("sJaT");
var Card_default = /*#__PURE__*/__webpack_require__.n(Card);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Card/style.css
var Card_style = __webpack_require__("UlEV");
var Card_style_default = /*#__PURE__*/__webpack_require__.n(Card_style);

// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var home__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Iki \u017Eaidimo prad\u017Eios liko:'
);

var home_Home = function (_Component) {
	home__inherits(Home, _Component);

	function Home() {
		home__classCallCheck(this, Home);

		var _this = home__possibleConstructorReturn(this, _Component.call(this));

		_this.countDownDate = new Date("May 19, 2019 15:37:25").getTime();
		_this.textTimer = [['sekundės', 'sekundė', 'sekundžių'], ['minutės', 'minutė', 'minučių'], ['valandos', 'valanda', 'valandų'], ['dienos', 'diena', 'dienų']];
		_this.countDowown();
		return _this;
	}

	Home.prototype.countDowown = function countDowown() {
		var _this2 = this;

		var x = setInterval(function () {

			// Get todays date and time
			var now = new Date().getTime();
			var distance = _this2.countDownDate - now;
			var days = ('0' + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
			var hours = ('0' + Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))).slice(-2);
			var minutes = ('0' + Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))).slice(-2);
			var seconds = ('0' + Math.floor(distance % (1000 * 60) / 1000)).slice(-2);

			// Display the result in the element with id="demo"
			document.getElementById('countDown').innerHTML = days + ' / ' + hours + ' / ' + minutes + ' / ' + seconds;

			document.getElementById('countText').innerHTML = _this2.textTimer[3][_this2.resT(days)] + ' ' + _this2.textTimer[2][_this2.resT(hours)] + ' ' + _this2.textTimer[1][_this2.resT(minutes)] + ' ' + _this2.textTimer[0][_this2.resT(seconds)];

			// If the count down is finished, write some text 
			if (distance < 0) {
				clearInterval(x);
				document.getElementById('countDown').innerHTML = '';
			}
		}, 1000);
	};

	Home.prototype.resT = function resT(e) {
		var n = Number(e[1]);
		if (Number(e) > 10 && Number(e) < 20) n = 0;
		switch (n) {
			case 0:
				return 2;
			case 1:
				return 1;
			default:
				return 0;
		}
	};

	Home.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.home + ' page' },
			Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])('img', { 'class': home_style_default.a.logo, src: '/assets/images/vote4art_logo.png' }),
				home__ref,
				Object(preact_min["h"])(
					Card_default.a,
					{ 'class': home_style_default.a.timmer__block },
					Object(preact_min["h"])('h1', { 'class': home_style_default.a.timmer, id: 'countDown' }),
					Object(preact_min["h"])(
						'h1',
						{ 'class': home_style_default.a.timmer__text, id: 'countText' },
						'  diena valanda minut\u0117 sekund\u0117'
					),
					Object(preact_min["h"])(
						'h1',
						{ 'class': home_style_default.a.timmer__text__mobile },
						'  d. val. min. sek.'
					)
				)
			)
		);
	};

	return Home;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/404/style.css
var _04_style = __webpack_require__("xxi1");
var _04_style_default = /*#__PURE__*/__webpack_require__.n(_04_style);

// CONCATENATED MODULE: ./routes/404/index.js


function _04__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _04__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _04__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var _04__ref = Object(preact_min["h"])(
	'h2',
	{ 'class': ' mdc-typography--title' },
	'404! Page not found.'
);

var _04_NotFound = function (_Component) {
	_04__inherits(NotFound, _Component);

	function NotFound() {
		_04__classCallCheck(this, NotFound);

		return _04__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	NotFound.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': _04_style_default.a.home + ' page' },
			Object(preact_min["h"])(
				Card_default.a,
				null,
				Object(preact_min["h"])(
					'div',
					{ 'class': _04_style_default.a.cardHeader },
					_04__ref
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': _04_style_default.a.cardBody },
					'Looks like the page you are trying to access, doesn\'t exist.'
				)
			)
		);
	};

	return NotFound;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/game/style.css
var game_style = __webpack_require__("R2VR");
var game_style_default = /*#__PURE__*/__webpack_require__.n(game_style);

// EXTERNAL MODULE: ../node_modules/panzoom/index.js
var panzoom = __webpack_require__("R27W");
var panzoom_default = /*#__PURE__*/__webpack_require__.n(panzoom);

// EXTERNAL MODULE: ../node_modules/preact-tap-event-plugin/dist/preact-tap-event-plugin.js
var preact_tap_event_plugin = __webpack_require__("Mgcd");
var preact_tap_event_plugin_default = /*#__PURE__*/__webpack_require__.n(preact_tap_event_plugin);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Slider/index.js
var Slider = __webpack_require__("6vkq");
var Slider_default = /*#__PURE__*/__webpack_require__.n(Slider);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Slider/style.css
var Slider_style = __webpack_require__("2TVm");
var Slider_style_default = /*#__PURE__*/__webpack_require__.n(Slider_style);

// EXTERNAL MODULE: ./components/board/colors/style.css
var colors_style = __webpack_require__("AZ2D");
var colors_style_default = /*#__PURE__*/__webpack_require__.n(colors_style);

// CONCATENATED MODULE: ./components/board/colors/index.js


function colors__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function colors__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function colors__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var colors_Colors = function (_Component) {
	colors__inherits(Colors, _Component);

	function Colors() {
		colors__classCallCheck(this, Colors);

		var _this = colors__possibleConstructorReturn(this, _Component.call(this));

		_this.colors = [];
		_this.setColor = _this.setColor.bind(_this);
		return _this;
	}

	Colors.prototype.getRandomRgb = function getRandomRgb() {
		var num = Math.round(0xffffff * Math.random());
		var r = num >> 16;
		var g = num >> 8 & 255;
		var b = num & 255;
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	};

	Colors.prototype.generateColors = function generateColors() {
		for (var i = 0; i < 24; i++) {
			this.colors.push(this.getRandomRgb());
		}
	};

	Colors.prototype.setColor = function setColor(e) {
		this.setState({ color: e.target.dataset.color });
		this.props.callbackFromBoard(this.state);
	};

	Colors.prototype.componentWillMount = function componentWillMount() {
		this.generateColors();
	};

	Colors.prototype.render = function render(props) {
		var _this2 = this;

		return Object(preact_min["h"])(
			'div',
			{ 'class': colors_style_default.a.palete },
			this.colors.map(function (e) {
				return Object(preact_min["h"])('div', {
					'class': colors_style_default.a.color + ' ' + (_this2.state.color === e ? colors_style_default.a.active : '') + ' ',
					onClick: _this2.setColor,
					'data-color': e,
					style: 'background: ' + e
				});
			})
		);
	};

	return Colors;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/board/style.css
var board_style = __webpack_require__("prn+");
var board_style_default = /*#__PURE__*/__webpack_require__.n(board_style);

// CONCATENATED MODULE: ./components/board/index.js


function board__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function board__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function board__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


// import { route } from 'preact-router';


preact_tap_event_plugin_default()();






var board__ref = Object(preact_min["h"])(Slider_default.a, { step: 25, value: 1, max: 250 });

var board_Board = function (_Component) {
	board__inherits(Board, _Component);

	// callback
	Board.prototype.setColor = function setColor(currentColor) {
		// if (!this.isEditable) return;
		console.log(currentColor);
		this.setState(currentColor);
	};

	// functions

	function Board() {
		board__classCallCheck(this, Board);

		var _this = board__possibleConstructorReturn(this, _Component.call(this));

		_this.saveCallback = function (reload) {
			if (!_this.isEditable) return;
		};

		_this.transform = function (e) {
			var position = e.getTransform();
			_this.scaledPixel = Math.floor(1000 * position.scale);
			_this.scale = position.scale;
			_this.scaledX = position.x;
			_this.scaledY = position.y;
			_this.setState({ transforming: true });
		};

		_this.getCord = _this.getCord.bind(_this);
		_this.setColor = _this.setColor.bind(_this);
		_this.putPixel = _this.putPixel.bind(_this);

		_this.scaledPixel = 1000;
		_this.scaledX = 499;
		_this.scaledY = 499;
		_this.pixelPoint = [0, 0];

		_this.windowCenter = {
			h: window.innerHeight / 2,
			w: window.innerWidth / 2
		};
		return _this;
	}

	Board.prototype.initZoom = function initZoom(elm) {
		var pan = panzoom_default()(elm, {
			maxZoom: 100,
			minZoom: 0.1
		});
		pan.zoomAbs(500, // initial x position
		500, // initial y position
		1 // initial zoom
		);
		pan.on('transform', this.transform);
		this.setState({ zoom: 'ok' });
		this.zoomController = pan;
	};
	// pervadinti i zoom


	Board.prototype.getCord = function getCord(e) {
		var viewportOffset = void 0,
		    x = void 0,
		    y = void 0;
		if (e.screenX === undefined) {
			viewportOffset = document.querySelector('#test').getBoundingClientRect();
			x = e.changedTouches[0].screenX / this.scale;
			y = e.changedTouches[0].screenY / this.scale;
		} else {
			viewportOffset = e.target.getBoundingClientRect();
			x = e.screenX / this.scale;
			y = e.screenY / this.scale;
		}

		this.pixelPoint = [Math.floor(x + ~viewportOffset.x / this.scale), Math.floor(y + ~viewportOffset.y / this.scale)];
		this.putPixel();
	};

	Board.prototype.putPixel = function putPixel() {
		console.log(this.state);
		if (!this.state.color) return;
		var svg = document.getElementById('voteForArt');
		var p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		p.setAttributeNS(null, 'width', 1);
		p.setAttributeNS(null, 'height', 1);

		p.setAttributeNS(null, 'x', this.pixelPoint[0]);
		p.setAttributeNS(null, 'y', this.pixelPoint[1]);

		p.setAttributeNS(null, 'fill', this.state.color);
		svg.appendChild(p);
		alert('padetas x:' + this.pixelPoint[0] + 'y:' + this.pixelPoint[1] + 'spalva:' + this.state.color);
		this.setState({ pixelPlaced: true });
	};

	// drawGrid(context) {
	// 	for (let x = 0.5; x < 10001; x += 10) {
	// 		context.moveTo(x, 0);
	// 		context.lineTo(x, 10000);
	// 	}

	// 	for (let y = 0.5; y < 10001; y += 10) {
	// 		context.moveTo(0, y);
	// 		context.lineTo(10000, y);
	// 	}

	// 	context.strokeStyle = '#ddd';
	// 	context.stroke();
	// }


	Board.prototype.componentWillMount = function componentWillMount() {
		this.pixelPoint = [0, 0];
		if (window.innerWidth) {
			this.WX = window.innerWidth;
			this.WY = window.innerHeight;
		} else {
			this.WX = document.body.clientWidth;
			this.WY = document.body.clientHeight;
		}
		this.WX = this.WX / 2;
		this.WY = this.WY / 2;
	};

	Board.prototype.componentDidMount = function componentDidMount() {
		this.setState({ activeBoard: this.base.querySelector('#voteForArt') });
		this.initZoom(this.state.activeBoard);
		// this.canvas = document.getElementById('voteForArt');
		// this.context = this.canvas.getContext('2d');
		// this.canvas.addEventListener('click', (evt) => {
		// 	let mousePos = this.getSquare(evt);
		// 	this.fillSquare(this.context, mousePos.x, mousePos.y);
		// }, false);
		// this.drawGrid(this.context);
		// this.context.fillStyle = "url('./assets/images/eye_output-fs8.png')";

	};

	Board.prototype.render = function render(props) {
		return Object(preact_min["h"])(
			'div',
			{ 'class': board_style_default.a.wrap__board },
			Object(preact_min["h"])(
				'div',
				{ 'class': board_style_default.a.board__controlls },
				board__ref
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': board_style_default.a.colors_controlls },
				Object(preact_min["h"])(colors_Colors, {
					callbackFromBoard: this.setColor
				})
			),
			Object(preact_min["h"])(
				'h1',
				{ style: 'background:white;position: fixed; top: 160px; z-index: 9999;' },
				'Pixel: x:',
				this.pixelPoint[0],
				'y:',
				this.pixelPoint[1]
			),
			Object(preact_min["h"])(
				'h1',
				{ style: 'background:white;position: fixed; top: 80px; z-index: 9999;' },
				'scale',
				this.scale
			),
			Object(preact_min["h"])(
				'div',
				{
					'class': board_style_default.a.pixel__center,
					style: 'top:' + this.WY + ' \n\t\t\t\t\t left:' + this.WX + ';transform:scale(' + this.scale + ')'
				},
				Object(preact_min["h"])('span', { 'class': board_style_default.a.pixel })
			),
			Object(preact_min["h"])(
				'div',
				{
					style: '\n\t\t\t\t\t\twidth:' + this.scaledPixel + 'px;\n\t\t\t\t\t\theight:' + this.scaledPixel + 'px;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\ttop: ' + this.scaledY + 'px;\n\t\t\t\t\t\tleft: ' + this.scaledX + 'px;\n\t\t\t\t\t'
				},
				Object(preact_min["h"])('img', {
					width: this.scaledPixel,
					height: this.scaledPixel,
					'class': 'pixelated',

					src: '/assets/images/eye_output-fs8.png'
				})
			),
			Object(preact_min["h"])(
				'svg',
				{ width: '1000', id: 'board', height: '1000' },
				Object(preact_min["h"])(
					'g',
					{ id: 'voteForArt' },
					Object(preact_min["h"])('rect', { id: 'test', width: '100%', onTouchTap: this.getCord, height: '1000', x: '0', y: '0', style: 'cursor: pointer; fill:rgba(0,0,0,0);' })
				)
			)
		);
	};

	return Board;
}(preact_min["Component"]);


// CONCATENATED MODULE: ../node_modules/preact-cli/lib/lib/webpack/dummy-loader.js!./routes/game/index.js


function game__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function game__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function game__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var game__ref = Object(preact_min["h"])(
	'main',
	null,
	Object(preact_min["h"])(board_Board, null)
);

var Game = function (_Component) {
	game__inherits(Game, _Component);

	function Game() {
		game__classCallCheck(this, Game);

		return game__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Game.prototype.render = function render() {
		return game__ref;
	};

	return Game;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/preact-helmet/lib/Helmet.js
var Helmet = __webpack_require__("FJnM");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









// import Profile from 'async!../routes/profile';



var app__ref = Object(preact_min["h"])(Helmet_default.a, {
	title: 'vote4art.eu'
	// base={{ target: '_blank', href: 'http://localhost:8080/' }}
});

var app__ref2 = Object(preact_min["h"])('link', { href: 'https://fonts.googleapis.com/css?family=Exo+2', rel: 'stylesheet' });

var app__ref3 = Object(preact_min["h"])(home_Home, { path: '/' });

var app__ref4 = Object(preact_min["h"])(Game, { path: '/game/:x?/:y?/:zoom?' });

var app__ref5 = Object(preact_min["h"])(_04_NotFound, { 'default': true });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.setState({
				currentUrl: e.url
			});
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		// document.body.classList.add('mdc-theme--main');

		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref,
			app__ref2,
			Object(preact_min["h"])(header_Header, { selectedRoute: this.state.currentUrl }),
			Object(preact_min["h"])(
				preact_router_es_Router,
				{ onChange: this.handleRoute },
				app__ref3,
				app__ref4,
				app__ref5
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "JtzT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Dialog = exports.DialogFooterButton = exports.DialogFooter = exports.DialogBody = exports.DialogHeader = void 0;

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _typeof2 = _interopRequireDefault(__webpack_require__("b9XL"));

var _dialog = __webpack_require__("5sRW");

var _bindDecorator = __webpack_require__("gKs0");

var _preact = __webpack_require__("KM04");

var _MaterialComponent5 = _interopRequireDefault(__webpack_require__("uc5p"));

var _Button2 = __webpack_require__("7/cg");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DialogHeader =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(DialogHeader, _MaterialComponent);

  function DialogHeader() {
    var _this;

    (0, _classCallCheck2.default)(this, DialogHeader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogHeader).apply(this, arguments));
    _this.componentName = 'dialog__header';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(DialogHeader, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("header", _extends({}, props), (0, _preact.h)("h2", {
        className: "mdc-dialog__header__title"
      }, props.children));
    }
  }]);
  return DialogHeader;
}(_MaterialComponent5.default);

exports.DialogHeader = DialogHeader;

__decorate([_bindDecorator.bind], DialogHeader.prototype, "materialDom", null);

var DialogBody =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(DialogBody, _MaterialComponent2);

  function DialogBody() {
    var _this2;

    (0, _classCallCheck2.default)(this, DialogBody);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogBody).apply(this, arguments));
    _this2.componentName = 'dialog__body';
    _this2.mdcProps = ['scrollable'];
    return _this2;
  }

  (0, _createClass2.default)(DialogBody, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("section", _extends({}, props), props.children);
    }
  }]);
  return DialogBody;
}(_MaterialComponent5.default);

exports.DialogBody = DialogBody;

__decorate([_bindDecorator.bind], DialogBody.prototype, "materialDom", null);

var DialogFooter =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(DialogFooter, _MaterialComponent3);

  function DialogFooter() {
    var _this3;

    (0, _classCallCheck2.default)(this, DialogFooter);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogFooter).apply(this, arguments));
    _this3.componentName = 'dialog__footer';
    _this3.mdcProps = [];
    return _this3;
  }

  (0, _createClass2.default)(DialogFooter, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("footer", _extends({}, props), props.children);
    }
  }]);
  return DialogFooter;
}(_MaterialComponent5.default);

exports.DialogFooter = DialogFooter;

__decorate([_bindDecorator.bind], DialogFooter.prototype, "materialDom", null);

var DialogFooterButton =
/*#__PURE__*/
function (_Button) {
  (0, _inherits2.default)(DialogFooterButton, _Button);

  function DialogFooterButton() {
    var _this4;

    (0, _classCallCheck2.default)(this, DialogFooterButton);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogFooterButton).apply(this, arguments));
    _this4.componentName = 'dialog__footer__button';
    _this4.mdcProps = ['cancel', 'accept'];
    return _this4;
  }

  (0, _createClass2.default)(DialogFooterButton, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("button", _extends({}, props, {
        className: "mdc-button",
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return DialogFooterButton;
}(_Button2.Button);

exports.DialogFooterButton = DialogFooterButton;

__decorate([_bindDecorator.bind], DialogFooterButton.prototype, "materialDom", null);

var Dialog =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(Dialog, _MaterialComponent4);

  function Dialog() {
    var _this5;

    (0, _classCallCheck2.default)(this, Dialog);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dialog).apply(this, arguments));
    _this5.componentName = 'dialog';
    _this5.mdcProps = [];
    return _this5;
  }

  (0, _createClass2.default)(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Dialog.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        this.MDComponent = new _dialog.MDCDialog(this.control);
        this.MDComponent.listen('MDCDialog:accept', this.onAccept);
        this.MDComponent.listen('MDCDialog:cancel', this.onCancel);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Dialog.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.unlisten('MDCDialog:accept', this.onAccept);
        this.MDComponent.unlisten('MDCDialog:cancel', this.onCancel);
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "onAccept",
    value: function onAccept(e) {
      if (this.props.onAccept) {
        this.props.onAccept(e);
      }
    }
  }, {
    key: "onCancel",
    value: function onCancel(e) {
      if (this.props.onCancel) {
        this.props.onCancel(e);
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("aside", _extends({
        role: 'alertdialog',
        ref: this.setControlRef
      }, props), (0, _preact.h)("div", {
        className: "mdc-dialog__surface"
      }, props.children), (0, _preact.h)("div", {
        className: "mdc-dialog__backdrop"
      }));
    }
  }]);
  return Dialog;
}(_MaterialComponent5.default);

exports.Dialog = Dialog;

__decorate([_bindDecorator.bind], Dialog.prototype, "onAccept", null);

__decorate([_bindDecorator.bind], Dialog.prototype, "onCancel", null);

var default_1 =
/*#__PURE__*/
function (_Dialog) {
  (0, _inherits2.default)(default_1, _Dialog);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(Dialog);

exports.default = default_1;
default_1.Header = DialogHeader;
default_1.Body = DialogBody;
default_1.Footer = DialogFooter;
default_1.FooterButton = DialogFooterButton;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "KRuG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");
var settle = __webpack_require__("aS8y");
var buildURL = __webpack_require__("H6Qo");
var parseHeaders = __webpack_require__("ZeD7");
var isURLSameOrigin = __webpack_require__("/w7L");
var createError = __webpack_require__("3bIi");
var btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__("mmkS");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || request.readyState !== 4 && !xDomain) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("dn2M");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),

/***/ "Kest":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__("6IAg");
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */

  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */

  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */

  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

/***/ }),

/***/ "M8l6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "MeGi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Icon = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _preact = __webpack_require__("KM04");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__("uc5p"));

var Icon =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Icon, _MaterialComponent);

  function Icon() {
    var _this;

    (0, _classCallCheck2.default)(this, Icon);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
    _this.componentName = 'icon';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(Icon, [{
    key: "materialDom",
    value: function materialDom(props) {
      var classes = ['material-icons']; // CardActionIcon sends className

      if (props.className) {
        classes.push(props.className);
      }

      return (0, _preact.h)("i", _extends({}, props, {
        className: classes.join(' ')
      }), props.children);
    }
  }]);
  return Icon;
}(_MaterialComponent2.default);

exports.Icon = Icon;
var _default = Icon;
exports.default = _default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Mgcd":
/***/ (function(module, exports, __webpack_require__) {

!function (global, factory) {
     true ? module.exports = factory(__webpack_require__("KM04")) : "function" == typeof define && define.amd ? define(["preact"], factory) : global.injectTapEventPlugin = factory(global.preact);
}(this, function (preact) {
    function proxy(attrs) {
        var map = {};
        for (var i in attrs) {
            attrs.hasOwnProperty(i) && (map[i.toLowerCase()] = i);
        }var start = attrs[map.ontouchstart],
            tap = attrs[map.ontouchtap],
            click = attrs[map.onclick];
        delete attrs[map.ontouchtap], attrs[map.onclick || "onClick"] = function (e) {
            if (click && click(e), !hasTouch) return tap(e);
        }, attrs[map.ontouchstart || "onTouchStart"] = function (e) {
            var down = coords(e);
            if (hasTouch = !0, addEventListener("touchend", function onEnd(e) {
                removeEventListener("touchend", onEnd);
                var up = coords(e),
                    dist = Math.sqrt(Math.pow(up.x - down.x, 2) + Math.pow(up.y - down.y, 2));
                dist < OPTS.threshold && tap(e);
            }), start) return start(e);
        };
    }
    function coords(e) {
        var t = e.changedTouches && e.changedTouches[0] || e.touches && e.touches[0] || e;
        return {
            x: t.pageX,
            y: t.pageY,
            target: t.target
        };
    }
    var OPTS = {
        threshold: 10
    },
        injected = void 0,
        hasTouch = void 0,
        index = function index(opts) {
        for (var i in opts) {
            opts.hasOwnProperty(i) && (OPTS[i] = opts[i]);
        }if (!injected) {
            injected = !0;
            var oldHook = preact.options.vnode;
            preact.options.vnode = function (vnode) {
                var attrs = vnode.attributes;
                if (attrs) for (var _i in attrs) {
                    if (attrs.hasOwnProperty(_i) && "ontouchtap" === _i.toLowerCase()) {
                        proxy(attrs);
                        break;
                    }
                }oldHook && oldHook(vnode);
            };
        }
    };
    return index;
});
//# sourceMappingURL=preact-tap-event-plugin.js.map

/***/ }),

/***/ "NFzA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Top App Bar
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Top App Bar into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTopAppBarAdapter = function () {
  function MDCTopAppBarAdapter() {
    _classCallCheck(this, MDCTopAppBarAdapter);
  }

  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  MDCTopAppBarAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  MDCTopAppBarAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns true if the root Element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  MDCTopAppBarAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Sets the specified inline style property on the root Element to the given value.
   * @param {string} property
   * @param {string} value
   */


  MDCTopAppBarAdapter.prototype.setStyle = function setStyle(property, value) {};

  /**
   * Gets the height of the top app bar.
   * @return {number}
   */


  MDCTopAppBarAdapter.prototype.getTopAppBarHeight = function getTopAppBarHeight() {};

  /**
   * Registers an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCTopAppBarAdapter.prototype.registerNavigationIconInteractionHandler = function registerNavigationIconInteractionHandler(type, handler) {};

  /**
   * Deregisters an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCTopAppBarAdapter.prototype.deregisterNavigationIconInteractionHandler = function deregisterNavigationIconInteractionHandler(type, handler) {};

  /**
   * Emits an event when the navigation icon is clicked.
   */


  MDCTopAppBarAdapter.prototype.notifyNavigationIconClicked = function notifyNavigationIconClicked() {};

  /** @param {function(!Event)} handler */


  MDCTopAppBarAdapter.prototype.registerScrollHandler = function registerScrollHandler(handler) {};

  /** @param {function(!Event)} handler */


  MDCTopAppBarAdapter.prototype.deregisterScrollHandler = function deregisterScrollHandler(handler) {};

  /** @param {function(!Event)} handler */


  MDCTopAppBarAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /** @param {function(!Event)} handler */


  MDCTopAppBarAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /** @return {number} */


  MDCTopAppBarAdapter.prototype.getViewportScrollY = function getViewportScrollY() {};

  /** @return {number} */


  MDCTopAppBarAdapter.prototype.getTotalActionItems = function getTotalActionItems() {};

  return MDCTopAppBarAdapter;
}();

/* harmony default export */ var top_app_bar_adapter = (MDCTopAppBarAdapter);
// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__("vkNc");

// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var cssClasses = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
};

/** @enum {number} */
var numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};

/** @enum {string} */
var strings = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};


// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var base_foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCTopAppBarAdapter>}
 */

var foundation_MDCTopAppBarBaseFoundation = function (_MDCFoundation) {
  _inherits(MDCTopAppBarBaseFoundation, _MDCFoundation);

  _createClass(MDCTopAppBarBaseFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return strings;
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }

    /** @return enum {number} */

  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }

    /**
     * {@see MDCTopAppBarAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTopAppBarAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTopAppBarAdapter} */{
          hasClass: function hasClass() /* className: string */{},
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          setStyle: function setStyle() /* property: string, value: string */{},
          getTopAppBarHeight: function getTopAppBarHeight() {},
          registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler() /* type: string, handler: EventListener */{},
          notifyNavigationIconClicked: function notifyNavigationIconClicked() {},
          registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
          deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getViewportScrollY: function getViewportScrollY() {
            return (/* number */0
            );
          },
          getTotalActionItems: function getTotalActionItems() {
            return (/* number */0
            );
          }
        }
      );
    }

    /**
     * @param {!MDCTopAppBarAdapter} adapter
     */

  }]);

  function MDCTopAppBarBaseFoundation( /** @type {!MDCTopAppBarAdapter} */adapter) {
    foundation__classCallCheck(this, MDCTopAppBarBaseFoundation);

    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCTopAppBarBaseFoundation.defaultAdapter, adapter)));

    _this.navClickHandler_ = function () {
      return _this.adapter_.notifyNavigationIconClicked();
    };

    _this.scrollHandler_ = function () {};
    return _this;
  }

  MDCTopAppBarBaseFoundation.prototype.init = function init() {
    this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_);
  };

  MDCTopAppBarBaseFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_);
  };

  MDCTopAppBarBaseFoundation.prototype.initScrollHandler = function initScrollHandler() {
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  };

  MDCTopAppBarBaseFoundation.prototype.destroyScrollHandler = function destroyScrollHandler() {
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  };

  return MDCTopAppBarBaseFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var top_app_bar_foundation = (foundation_MDCTopAppBarBaseFoundation);
// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/fixed/foundation.js
function fixed_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCTopAppBarFoundation<!MDCFixedTopAppBarFoundation>}
 * @final
 */

var foundation_MDCFixedTopAppBarFoundation = function (_MDCTopAppBarFoundati) {
  foundation__inherits(MDCFixedTopAppBarFoundation, _MDCTopAppBarFoundati);

  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  function MDCFixedTopAppBarFoundation(adapter) {
    fixed_foundation__classCallCheck(this, MDCFixedTopAppBarFoundation);

    /** State variable for the previous scroll iteration top app bar state */
    var _this = foundation__possibleConstructorReturn(this, _MDCTopAppBarFoundati.call(this, adapter));

    _this.wasScrolled_ = false;

    _this.scrollHandler_ = function () {
      return _this.fixedScrollHandler_();
    };
    return _this;
  }

  MDCFixedTopAppBarFoundation.prototype.init = function init() {
    _MDCTopAppBarFoundati.prototype.init.call(this);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  };

  MDCFixedTopAppBarFoundation.prototype.destroy = function destroy() {
    _MDCTopAppBarFoundati.prototype.destroy.call(this);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  };

  /**
   * Scroll handler for applying/removing the modifier class
   * on the fixed top app bar.
   */


  MDCFixedTopAppBarFoundation.prototype.fixedScrollHandler_ = function fixedScrollHandler_() {
    var currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter_.removeClass(cssClasses.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter_.addClass(cssClasses.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  };

  return MDCFixedTopAppBarFoundation;
}(top_app_bar_foundation);

/* harmony default export */ var fixed_foundation = (foundation_MDCFixedTopAppBarFoundation);
// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/short/foundation.js
function short_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function short_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function short_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCShortTopAppBarFoundation>}
 * @final
 */

var foundation_MDCShortTopAppBarFoundation = function (_MDCTopAppBarBaseFoun) {
  short_foundation__inherits(MDCShortTopAppBarFoundation, _MDCTopAppBarBaseFoun);

  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  function MDCShortTopAppBarFoundation(adapter) {
    short_foundation__classCallCheck(this, MDCShortTopAppBarFoundation);

    // State variable for the current top app bar state
    var _this = short_foundation__possibleConstructorReturn(this, _MDCTopAppBarBaseFoun.call(this, adapter));

    _this.isCollapsed = false;

    _this.scrollHandler_ = function () {
      return _this.shortAppBarScrollHandler_();
    };
    return _this;
  }

  MDCShortTopAppBarFoundation.prototype.init = function init() {
    _MDCTopAppBarBaseFoun.prototype.init.call(this);
    var isAlwaysCollapsed = this.adapter_.hasClass(cssClasses.SHORT_COLLAPSED_CLASS);

    if (this.adapter_.getTotalActionItems() > 0) {
      this.adapter_.addClass(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
    }

    if (!isAlwaysCollapsed) {
      this.adapter_.registerScrollHandler(this.scrollHandler_);
      this.shortAppBarScrollHandler_();
    }
  };

  MDCShortTopAppBarFoundation.prototype.destroy = function destroy() {
    _MDCTopAppBarBaseFoun.prototype.destroy.call(this);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  };

  /**
   * Scroll handler for applying/removing the collapsed modifier class
   * on the short top app bar.
   * @private
   */


  MDCShortTopAppBarFoundation.prototype.shortAppBarScrollHandler_ = function shortAppBarScrollHandler_() {
    var currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.isCollapsed) {
        this.adapter_.removeClass(cssClasses.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = false;
      }
    } else {
      if (!this.isCollapsed) {
        this.adapter_.addClass(cssClasses.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = true;
      }
    }
  };

  return MDCShortTopAppBarFoundation;
}(top_app_bar_foundation);

/* harmony default export */ var short_foundation = (foundation_MDCShortTopAppBarFoundation);
// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/standard/foundation.js
function standard_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function standard_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function standard_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





var INITIAL_VALUE = 0;
/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCTopAppBarFoundation>}
 * @final
 */

var foundation_MDCTopAppBarFoundation = function (_MDCTopAppBarBaseFoun) {
  standard_foundation__inherits(MDCTopAppBarFoundation, _MDCTopAppBarBaseFoun);

  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  function MDCTopAppBarFoundation(adapter) {
    standard_foundation__classCallCheck(this, MDCTopAppBarFoundation);

    /**
     * Used for diffs of current scroll position vs previous scroll position
     * @private {number}
     */
    var _this = standard_foundation__possibleConstructorReturn(this, _MDCTopAppBarBaseFoun.call(this, adapter));

    _this.lastScrollPosition_ = _this.adapter_.getViewportScrollY();

    /**
     * Used to verify when the top app bar is completely showing or completely hidden
     * @private {number}
     */
    _this.topAppBarHeight_ = _this.adapter_.getTopAppBarHeight();

    /**
     * wasDocked_ is used to indicate if the top app bar was docked in the previous
     * scroll handler iteration.
     * @private {boolean}
     */
    _this.wasDocked_ = true;

    /**
     * isDockedShowing_ is used to indicate if the top app bar is docked in the fully
     * shown position.
     * @private {boolean}
     */
    _this.isDockedShowing_ = true;

    /**
     * Variable for current scroll position of the top app bar
     * @private {number}
     */
    _this.currentAppBarOffsetTop_ = 0;

    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     * @private {boolean} */
    _this.isCurrentlyBeingResized_ = false;

    /**
     * The timeout that's used to throttle the resize events
     * @private {number}
     */
    _this.resizeThrottleId_ = INITIAL_VALUE;

    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
     * @private {number}
     */
    _this.resizeDebounceId_ = INITIAL_VALUE;

    _this.scrollHandler_ = function () {
      return _this.topAppBarScrollHandler_();
    };
    _this.resizeHandler_ = function () {
      return _this.topAppBarResizeHandler_();
    };
    return _this;
  }

  MDCTopAppBarFoundation.prototype.init = function init() {
    _MDCTopAppBarBaseFoun.prototype.init.call(this);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  };

  MDCTopAppBarFoundation.prototype.destroy = function destroy() {
    _MDCTopAppBarBaseFoun.prototype.destroy.call(this);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.setStyle('top', '');
  };

  /**
   * Function to determine if the DOM needs to update.
   * @return {boolean}
   * @private
   */


  MDCTopAppBarFoundation.prototype.checkForUpdate_ = function checkForUpdate_() {
    var offscreenBoundaryTop = -this.topAppBarHeight_;
    var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;

    // If it's partially showing, it can't be docked.
    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  };

  /**
   * Function to move the top app bar if needed.
   * @private
   */


  MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function moveTopAppBar_() {
    if (this.checkForUpdate_()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      var offset = this.currentAppBarOffsetTop_;
      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -numbers.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter_.setStyle('top', offset + 'px');
    }
  };

  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   * @private
   */


  MDCTopAppBarFoundation.prototype.topAppBarScrollHandler_ = function topAppBarScrollHandler_() {
    var currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
    var diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition;

    // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.
    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;

      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }

      this.moveTopAppBar_();
    }
  };

  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   * @private
   */


  MDCTopAppBarFoundation.prototype.topAppBarResizeHandler_ = function topAppBarResizeHandler_() {
    var _this2 = this;

    // Throttle resize events 10 p/s
    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(function () {
        _this2.resizeThrottleId_ = INITIAL_VALUE;
        _this2.throttledResizeHandler_();
      }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized_ = true;

    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }

    this.resizeDebounceId_ = setTimeout(function () {
      _this2.topAppBarScrollHandler_();
      _this2.isCurrentlyBeingResized_ = false;
      _this2.resizeDebounceId_ = INITIAL_VALUE;
    }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  };

  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   * @private
   */


  MDCTopAppBarFoundation.prototype.throttledResizeHandler_ = function throttledResizeHandler_() {
    var currentHeight = this.adapter_.getTopAppBarHeight();
    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false;

      // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.
      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }
    this.topAppBarScrollHandler_();
  };

  return MDCTopAppBarFoundation;
}(top_app_bar_foundation);

/* harmony default export */ var standard_foundation = (foundation_MDCTopAppBarFoundation);
// CONCATENATED MODULE: ../node_modules/@material/top-app-bar/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBar", function() { return top_app_bar_MDCTopAppBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTopAppBarBaseFoundation", function() { return top_app_bar_foundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTopAppBarFoundation", function() { return standard_foundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCFixedTopAppBarFoundation", function() { return fixed_foundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCShortTopAppBarFoundation", function() { return short_foundation; });
var top_app_bar__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function top_app_bar__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function top_app_bar__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function top_app_bar__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */










/**
 * @extends {MDCComponent<!MDCTopAppBarBaseFoundation>}
 * @final
 */

var top_app_bar_MDCTopAppBar = function (_MDCComponent) {
  top_app_bar__inherits(MDCTopAppBar, _MDCComponent);

  /**
   * @param {...?} args
   */
  function MDCTopAppBar() {
    top_app_bar__classCallCheck(this, MDCTopAppBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {?Element} */
    var _this = top_app_bar__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.navIcon_;
    /** @type {?Array<MDCRipple>} */
    _this.iconRipples_;
    /** @type {Object} */
    _this.scrollTarget_;
    return _this;
  }

  MDCTopAppBar.prototype.initialize = function initialize() {
    var rippleFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el) {
      return ripple["MDCRipple"].attachTo(el);
    };

    this.navIcon_ = this.root_.querySelector(strings.NAVIGATION_ICON_SELECTOR);

    // Get all icons in the toolbar and instantiate the ripples
    var icons = [].slice.call(this.root_.querySelectorAll(strings.ACTION_ITEM_SELECTOR));
    if (this.navIcon_) {
      icons.push(this.navIcon_);
    }

    this.iconRipples_ = icons.map(function (icon) {
      var ripple = rippleFactory(icon);
      ripple.unbounded = true;
      return ripple;
    });
  };

  MDCTopAppBar.prototype.destroy = function destroy() {
    this.iconRipples_.forEach(function (iconRipple) {
      return iconRipple.destroy();
    });
    _MDCComponent.prototype.destroy.call(this);
  };

  MDCTopAppBar.prototype.setScrollTarget = function setScrollTarget(target) {
    this.foundation_.destroyScrollHandler();
    this.scrollTarget_ = target;
    this.foundation_.initScrollHandler();
  };

  /**
   * @param {!Element} root
   * @return {!MDCTopAppBar}
   */


  MDCTopAppBar.attachTo = function attachTo(root) {
    return new MDCTopAppBar(root);
  };

  /**
   * @return {!MDCTopAppBarBaseFoundation}
   */


  MDCTopAppBar.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    /** @type {!MDCTopAppBarAdapter} */
    var adapter = /** @type {!MDCTopAppBarAdapter} */top_app_bar__extends({
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      setStyle: function setStyle(property, value) {
        return _this2.root_.style.setProperty(property, value);
      },
      getTopAppBarHeight: function getTopAppBarHeight() {
        return _this2.root_.clientHeight;
      },
      registerNavigationIconInteractionHandler: function registerNavigationIconInteractionHandler(evtType, handler) {
        if (_this2.navIcon_) {
          _this2.navIcon_.addEventListener(evtType, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: function deregisterNavigationIconInteractionHandler(evtType, handler) {
        if (_this2.navIcon_) {
          _this2.navIcon_.removeEventListener(evtType, handler);
        }
      },
      notifyNavigationIconClicked: function notifyNavigationIconClicked() {
        _this2.emit(strings.NAVIGATION_EVENT, {});
      },
      registerScrollHandler: function registerScrollHandler(handler) {
        return _this2.scrollTarget_.addEventListener('scroll', handler);
      },
      deregisterScrollHandler: function deregisterScrollHandler(handler) {
        return _this2.scrollTarget_.removeEventListener('scroll', handler);
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      getViewportScrollY: function getViewportScrollY() {
        return _this2.scrollTarget_[_this2.scrollTarget_ === window ? 'pageYOffset' : 'scrollTop'];
      },
      getTotalActionItems: function getTotalActionItems() {
        return _this2.root_.querySelectorAll(strings.ACTION_ITEM_SELECTOR).length;
      }
    });

    this.scrollTarget_ = window;

    /** @type {!MDCTopAppBarBaseFoundation} */
    var foundation = void 0;
    if (this.root_.classList.contains(cssClasses.SHORT_CLASS)) {
      foundation = new short_foundation(adapter);
    } else if (this.root_.classList.contains(cssClasses.FIXED_CLASS)) {
      foundation = new fixed_foundation(adapter);
    } else {
      foundation = new standard_foundation(adapter);
    }

    return foundation;
  };

  return MDCTopAppBar;
}(component["a" /* default */]);



/***/ }),

/***/ "OWwF":
/***/ (function(module, exports) {

var supportsArgumentsClass = function () {
  return Object.prototype.toString.call(arguments);
}() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object) {
  return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
};

/***/ }),

/***/ "OvAf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__("BXyq");
var utils = __webpack_require__("S1cf");
var InterceptorManager = __webpack_require__("rj2i");
var dispatchRequest = __webpack_require__("uz6X");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, { method: 'get' }, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

/***/ }),

/***/ "P8NW":
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "PIA1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Q5pt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TabBar = exports.Tab = exports.TabIcon = exports.TabLabel = void 0;

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _tabBar = __webpack_require__("0xIF");

var _preact = __webpack_require__("KM04");

var _MaterialComponent5 = _interopRequireDefault(__webpack_require__("uc5p"));

var TabLabel =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(TabLabel, _MaterialComponent);

  function TabLabel() {
    var _this;

    (0, _classCallCheck2.default)(this, TabLabel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabLabel).apply(this, arguments));
    _this.componentName = 'tab__text-label';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(TabLabel, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("span", _extends({}, props), props.children);
    }
  }]);
  return TabLabel;
}(_MaterialComponent5.default);

exports.TabLabel = TabLabel;

var TabIcon =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(TabIcon, _MaterialComponent2);

  function TabIcon() {
    var _this2;

    (0, _classCallCheck2.default)(this, TabIcon);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabIcon).apply(this, arguments));
    _this2.componentName = 'tab__icon';
    _this2.mdcProps = [];
    return _this2;
  }

  (0, _createClass2.default)(TabIcon, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("span", _extends({
        className: "material-icons"
      }, props), props.children);
    }
  }]);
  return TabIcon;
}(_MaterialComponent5.default);

exports.TabIcon = TabIcon;

var Tab =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(Tab, _MaterialComponent3);

  function Tab() {
    var _this3;

    (0, _classCallCheck2.default)(this, Tab);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tab).apply(this, arguments));
    _this3.componentName = 'tab';
    _this3.mdcProps = ['active'];
    _this3.mdcNotifyProps = ['active'];
    return _this3;
  }

  (0, _createClass2.default)(Tab, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("button", _extends({
        class: "mdc-tab",
        role: "tab",
        "aria-selected": "true"
      }, props), (0, _preact.h)("span", {
        class: "mdc-tab__content"
      }, props.children), (0, _preact.h)("span", {
        class: "mdc-tab-indicator ".concat(props.active ? 'mdc-tab-indicator--active' : '')
      }, (0, _preact.h)("span", {
        class: "mdc-tab-indicator__content mdc-tab-indicator__content--underline"
      })), (0, _preact.h)("span", {
        class: "mdc-tab__ripple"
      }));
    }
  }]);
  return Tab;
}(_MaterialComponent5.default);

exports.Tab = Tab;

var TabBar =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(TabBar, _MaterialComponent4);

  function TabBar() {
    var _this4;

    (0, _classCallCheck2.default)(this, TabBar);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabBar).apply(this, arguments));
    _this4.componentName = 'tab-bar';
    _this4.mdcProps = [];
    _this4.mdcNotifyProps = ['activeTabIndex'];
    return _this4;
  }

  (0, _createClass2.default)(TabBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TabBar.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        this.MDComponent = new _tabBar.MDCTabBar(this.control);
      }

      this.afterComponentDidMount();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TabBar.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", {
        class: "mdc-tab-bar",
        role: "tablist",
        ref: this.setControlRef
      }, (0, _preact.h)("div", {
        class: "mdc-tab-scroller"
      }, (0, _preact.h)("div", {
        class: "mdc-tab-scroller__scroll-area"
      }, (0, _preact.h)("div", {
        class: "mdc-tab-scroller__scroll-content"
      }, props.children))));
    }
  }]);
  return TabBar;
}(_MaterialComponent5.default);

exports.TabBar = TabBar;

var default_1 =
/*#__PURE__*/
function (_TabBar) {
  (0, _inherits2.default)(default_1, _TabBar);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(TabBar);

exports.default = default_1;
default_1.Tab = Tab;
default_1.TabLabel = TabLabel;
default_1.TabIcon = TabIcon;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "QTRl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(prop) {
  return "mdc-theme--".concat(prop, "-bg");
}
//# sourceMappingURL=generateThemeClass.js.map

/***/ }),

/***/ "Qxat":
/***/ (function(module, exports) {

exports.__esModule = true;
var TAG_NAMES = exports.TAG_NAMES = {
    HTML: "htmlAttributes",
    TITLE: "title",
    BASE: "base",
    META: "meta",
    LINK: "link",
    SCRIPT: "script",
    NOSCRIPT: "noscript",
    STYLE: "style"
};

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    NAME: "name",
    CHARSET: "charset",
    HTTPEQUIV: "http-equiv",
    REL: "rel",
    HREF: "href",
    PROPERTY: "property",
    SRC: "src",
    INNER_HTML: "innerHTML",
    CSS_TEXT: "cssText",
    ITEM_PROP: "itemprop"
};

var PREACT_TAG_MAP = exports.PREACT_TAG_MAP = {
    "charset": "charSet",
    "http-equiv": "httpEquiv",
    "itemprop": "itemProp",
    "class": "className"
};

/***/ }),

/***/ "R27W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals SVGElement */
/**
 * Allows to drag and zoom svg elements
 */

var wheel = __webpack_require__("kpeq");
var animate = __webpack_require__("iqt6");
var eventify = __webpack_require__("XrM9");
var kinetic = __webpack_require__("+YqL");
var preventTextSelection = __webpack_require__("5iVr")();
var Transform = __webpack_require__("SvAS");
var makeSvgController = __webpack_require__("6rxR");
var makeDomController = __webpack_require__("SGkT");

var defaultZoomSpeed = 0.065;
var defaultDoubleTapZoomSpeed = 1.75;
var doubleTapSpeedInMS = 300;

module.exports = createPanZoom;

/**
 * Creates a new instance of panzoom, so that an object can be panned and zoomed
 *
 * @param {DOMElement} domElement where panzoom should be attached.
 * @param {Object} options that configure behavior.
 */
function createPanZoom(domElement, options) {
  options = options || {};

  var panController = options.controller;

  if (!panController) {
    if (domElement instanceof SVGElement) {
      panController = makeSvgController(domElement, options);
    }

    if (domElement instanceof HTMLElement) {
      panController = makeDomController(domElement, options);
    }
  }

  if (!panController) {
    throw new Error('Cannot create panzoom for the current type of dom element');
  }
  var owner = panController.getOwner();
  // just to avoid GC pressure, every time we do intermediate transform
  // we return this object. For internal use only. Never give it back to the consumer of this library
  var storedCTMResult = { x: 0, y: 0 };

  var isDirty = false;
  var transform = new Transform();

  if (panController.initTransform) {
    panController.initTransform(transform);
  }

  var filterKey = typeof options.filterKey === 'function' ? options.filterKey : noop;
  // TODO: likely need to unite pinchSpeed with zoomSpeed
  var pinchSpeed = typeof options.pinchSpeed === 'number' ? options.pinchSpeed : 1;
  var bounds = options.bounds;
  var maxZoom = typeof options.maxZoom === 'number' ? options.maxZoom : Number.POSITIVE_INFINITY;
  var minZoom = typeof options.minZoom === 'number' ? options.minZoom : 0;

  var boundsPadding = typeof options.boundsPadding === 'number' ? options.boundsPadding : 0.05;
  var zoomDoubleClickSpeed = typeof options.zoomDoubleClickSpeed === 'number' ? options.zoomDoubleClickSpeed : defaultDoubleTapZoomSpeed;
  var beforeWheel = options.beforeWheel || noop;
  var speed = typeof options.zoomSpeed === 'number' ? options.zoomSpeed : defaultZoomSpeed;

  validateBounds(bounds);

  if (options.autocenter) {
    autocenter();
  }

  var frameAnimation;

  var lastTouchEndTime = 0;

  var touchInProgress = false;

  // We only need to fire panstart when actual move happens
  var panstartFired = false;

  // cache mouse coordinates here
  var mouseX;
  var mouseY;

  var pinchZoomLength;

  var smoothScroll;
  if ('smoothScroll' in options && !options.smoothScroll) {
    // If user explicitly asked us not to use smooth scrolling, we obey
    smoothScroll = rigidScroll();
  } else {
    // otherwise we use forward smoothScroll settings to kinetic API
    // which makes scroll smoothing.
    smoothScroll = kinetic(getPoint, scroll, options.smoothScroll);
  }

  var moveByAnimation;
  var zoomToAnimation;

  var multiTouch;
  var paused = false;

  listenForEvents();

  var api = {
    dispose: dispose,
    moveBy: internalMoveBy,
    moveTo: moveTo,
    centerOn: centerOn,
    zoomTo: publicZoomTo,
    zoomAbs: zoomAbs,
    smoothZoom: smoothZoom,
    getTransform: getTransformModel,
    showRectangle: showRectangle,

    pause: pause,
    resume: resume,
    isPaused: isPaused
  };

  eventify(api);

  return api;

  function pause() {
    releaseEvents();
    paused = true;
  }

  function resume() {
    if (paused) {
      listenForEvents();
      paused = false;
    }
  }

  function isPaused() {
    return paused;
  }

  function showRectangle(rect) {
    // TODO: this duplicates autocenter. I think autocenter should go.
    var clientRect = owner.getBoundingClientRect();
    var size = transformToScreen(clientRect.width, clientRect.height);

    var rectWidth = rect.right - rect.left;
    var rectHeight = rect.bottom - rect.top;
    if (!Number.isFinite(rectWidth) || !Number.isFinite(rectHeight)) {
      throw new Error('Invalid rectangle');
    }

    var dw = size.x / rectWidth;
    var dh = size.y / rectHeight;
    var scale = Math.min(dw, dh);
    transform.x = -(rect.left + rectWidth / 2) * scale + size.x / 2;
    transform.y = -(rect.top + rectHeight / 2) * scale + size.y / 2;
    transform.scale = scale;
  }

  function transformToScreen(x, y) {
    if (panController.getScreenCTM) {
      var parentCTM = panController.getScreenCTM();
      var parentScaleX = parentCTM.a;
      var parentScaleY = parentCTM.d;
      var parentOffsetX = parentCTM.e;
      var parentOffsetY = parentCTM.f;
      storedCTMResult.x = x * parentScaleX - parentOffsetX;
      storedCTMResult.y = y * parentScaleY - parentOffsetY;
    } else {
      storedCTMResult.x = x;
      storedCTMResult.y = y;
    }

    return storedCTMResult;
  }

  function autocenter() {
    var w; // width of the parent
    var h; // height of the parent
    var left = 0;
    var top = 0;
    var sceneBoundingBox = getBoundingBox();
    if (sceneBoundingBox) {
      // If we have bounding box - use it.
      left = sceneBoundingBox.left;
      top = sceneBoundingBox.top;
      w = sceneBoundingBox.right - sceneBoundingBox.left;
      h = sceneBoundingBox.bottom - sceneBoundingBox.top;
    } else {
      // otherwise just use whatever space we have
      var ownerRect = owner.getBoundingClientRect();
      w = ownerRect.width;
      h = ownerRect.height;
    }
    var bbox = panController.getBBox();
    if (bbox.width === 0 || bbox.height === 0) {
      // we probably do not have any elements in the SVG
      // just bail out;
      return;
    }
    var dh = h / bbox.height;
    var dw = w / bbox.width;
    var scale = Math.min(dw, dh);
    transform.x = -(bbox.left + bbox.width / 2) * scale + w / 2 + left;
    transform.y = -(bbox.top + bbox.height / 2) * scale + h / 2 + top;
    transform.scale = scale;
  }

  function getTransformModel() {
    // TODO: should this be read only?
    return transform;
  }

  function getPoint() {
    return {
      x: transform.x,
      y: transform.y
    };
  }

  function moveTo(x, y) {
    transform.x = x;
    transform.y = y;

    keepTransformInsideBounds();

    triggerEvent('pan');
    makeDirty();
  }

  function moveBy(dx, dy) {
    moveTo(transform.x + dx, transform.y + dy);
  }

  function keepTransformInsideBounds() {
    var boundingBox = getBoundingBox();
    if (!boundingBox) return;

    var adjusted = false;
    var clientRect = getClientRect();

    var diff = boundingBox.left - clientRect.right;
    if (diff > 0) {
      transform.x += diff;
      adjusted = true;
    }
    // check the other side:
    diff = boundingBox.right - clientRect.left;
    if (diff < 0) {
      transform.x += diff;
      adjusted = true;
    }

    // y axis:
    diff = boundingBox.top - clientRect.bottom;
    if (diff > 0) {
      // we adjust transform, so that it matches exactly our bounding box:
      // transform.y = boundingBox.top - (boundingBox.height + boundingBox.y) * transform.scale =>
      // transform.y = boundingBox.top - (clientRect.bottom - transform.y) =>
      // transform.y = diff + transform.y =>
      transform.y += diff;
      adjusted = true;
    }

    diff = boundingBox.bottom - clientRect.top;
    if (diff < 0) {
      transform.y += diff;
      adjusted = true;
    }
    return adjusted;
  }

  /**
   * Returns bounding box that should be used to restrict scene movement.
   */
  function getBoundingBox() {
    if (!bounds) return; // client does not want to restrict movement

    if (typeof bounds === 'boolean') {
      // for boolean type we use parent container bounds
      var ownerRect = owner.getBoundingClientRect();
      var sceneWidth = ownerRect.width;
      var sceneHeight = ownerRect.height;

      return {
        left: sceneWidth * boundsPadding,
        top: sceneHeight * boundsPadding,
        right: sceneWidth * (1 - boundsPadding),
        bottom: sceneHeight * (1 - boundsPadding)
      };
    }

    return bounds;
  }

  function getClientRect() {
    var bbox = panController.getBBox();
    var leftTop = client(bbox.left, bbox.top);

    return {
      left: leftTop.x,
      top: leftTop.y,
      right: bbox.width * transform.scale + leftTop.x,
      bottom: bbox.height * transform.scale + leftTop.y
    };
  }

  function client(x, y) {
    return {
      x: x * transform.scale + transform.x,
      y: y * transform.scale + transform.y
    };
  }

  function makeDirty() {
    isDirty = true;
    frameAnimation = window.requestAnimationFrame(frame);
  }

  function zoomByRatio(clientX, clientY, ratio) {
    if (isNaN(clientX) || isNaN(clientY) || isNaN(ratio)) {
      throw new Error('zoom requires valid numbers');
    }

    var newScale = transform.scale * ratio;

    if (newScale < minZoom) {
      if (transform.scale === minZoom) return;

      ratio = minZoom / transform.scale;
    }
    if (newScale > maxZoom) {
      if (transform.scale === maxZoom) return;

      ratio = maxZoom / transform.scale;
    }

    var size = transformToScreen(clientX, clientY);

    transform.x = size.x - ratio * (size.x - transform.x);
    transform.y = size.y - ratio * (size.y - transform.y);

    var transformAdjusted = keepTransformInsideBounds();
    if (!transformAdjusted) transform.scale *= ratio;

    triggerEvent('zoom');

    makeDirty();
  }

  function zoomAbs(clientX, clientY, zoomLevel) {
    var ratio = zoomLevel / transform.scale;
    zoomByRatio(clientX, clientY, ratio);
  }

  function centerOn(ui) {
    var parent = ui.ownerSVGElement;
    if (!parent) throw new Error('ui element is required to be within the scene');

    // TODO: should i use controller's screen CTM?
    var clientRect = ui.getBoundingClientRect();
    var cx = clientRect.left + clientRect.width / 2;
    var cy = clientRect.top + clientRect.height / 2;

    var container = parent.getBoundingClientRect();
    var dx = container.width / 2 - cx;
    var dy = container.height / 2 - cy;

    internalMoveBy(dx, dy, true);
  }

  function internalMoveBy(dx, dy, smooth) {
    if (!smooth) {
      return moveBy(dx, dy);
    }

    if (moveByAnimation) moveByAnimation.cancel();

    var from = { x: 0, y: 0 };
    var to = { x: dx, y: dy };
    var lastX = 0;
    var lastY = 0;

    moveByAnimation = animate(from, to, {
      step: function step(v) {
        moveBy(v.x - lastX, v.y - lastY);

        lastX = v.x;
        lastY = v.y;
      }
    });
  }

  function scroll(x, y) {
    cancelZoomAnimation();
    moveTo(x, y);
  }

  function dispose() {
    releaseEvents();
  }

  function listenForEvents() {
    owner.addEventListener('mousedown', onMouseDown);
    owner.addEventListener('dblclick', onDoubleClick);
    owner.addEventListener('touchstart', onTouch);
    owner.addEventListener('keydown', onKeyDown);

    // Need to listen on the owner container, so that we are not limited
    // by the size of the scrollable domElement
    wheel.addWheelListener(owner, onMouseWheel);

    makeDirty();
  }

  function releaseEvents() {
    wheel.removeWheelListener(owner, onMouseWheel);
    owner.removeEventListener('mousedown', onMouseDown);
    owner.removeEventListener('keydown', onKeyDown);
    owner.removeEventListener('dblclick', onDoubleClick);
    owner.removeEventListener('touchstart', onTouch);

    if (frameAnimation) {
      window.cancelAnimationFrame(frameAnimation);
      frameAnimation = 0;
    }

    smoothScroll.cancel();

    releaseDocumentMouse();
    releaseTouches();

    triggerPanEnd();
  }

  function frame() {
    if (isDirty) applyTransform();
  }

  function applyTransform() {
    isDirty = false;

    // TODO: Should I allow to cancel this?
    panController.applyTransform(transform);

    triggerEvent('transform');
    frameAnimation = 0;
  }

  function onKeyDown(e) {
    var x = 0,
        y = 0,
        z = 0;
    if (e.keyCode === 38) {
      y = 1; // up
    } else if (e.keyCode === 40) {
      y = -1; // down
    } else if (e.keyCode === 37) {
      x = 1; // left
    } else if (e.keyCode === 39) {
      x = -1; // right
    } else if (e.keyCode === 189 || e.keyCode === 109) {
      // DASH or SUBTRACT
      z = 1; // `-` -  zoom out
    } else if (e.keyCode === 187 || e.keyCode === 107) {
      // EQUAL SIGN or ADD
      z = -1; // `=` - zoom in (equal sign on US layout is under `+`)
    }

    if (filterKey(e, x, y, z)) {
      // They don't want us to handle the key: https://github.com/anvaka/panzoom/issues/45
      return;
    }

    if (x || y) {
      e.preventDefault();
      e.stopPropagation();

      var clientRect = owner.getBoundingClientRect();
      // movement speed should be the same in both X and Y direction:
      var offset = Math.min(clientRect.width, clientRect.height);
      var moveSpeedRatio = 0.05;
      var dx = offset * moveSpeedRatio * x;
      var dy = offset * moveSpeedRatio * y;

      // TODO: currently we do not animate this. It could be better to have animation
      internalMoveBy(dx, dy);
    }

    if (z) {
      var scaleMultiplier = getScaleMultiplier(z);
      var ownerRect = owner.getBoundingClientRect();
      publicZoomTo(ownerRect.width / 2, ownerRect.height / 2, scaleMultiplier);
    }
  }

  function onTouch(e) {
    // let the override the touch behavior
    beforeTouch(e);

    if (e.touches.length === 1) {
      return handleSingleFingerTouch(e, e.touches[0]);
    } else if (e.touches.length === 2) {
      // handleTouchMove() will care about pinch zoom.
      pinchZoomLength = getPinchZoomLength(e.touches[0], e.touches[1]);
      multiTouch = true;
      startTouchListenerIfNeeded();
    }
  }

  function beforeTouch(e) {
    if (options.onTouch && !options.onTouch(e)) {
      // if they return `false` from onTouch, we don't want to stop
      // events propagation. Fixes https://github.com/anvaka/panzoom/issues/12
      return;
    }

    e.stopPropagation();
    e.preventDefault();
  }

  function beforeDoubleClick(e) {
    if (options.onDoubleClick && !options.onDoubleClick(e)) {
      // if they return `false` from onTouch, we don't want to stop
      // events propagation. Fixes https://github.com/anvaka/panzoom/issues/46
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  }

  function handleSingleFingerTouch(e) {
    var touch = e.touches[0];
    var offset = getOffsetXY(touch);
    mouseX = offset.x;
    mouseY = offset.y;

    smoothScroll.cancel();
    startTouchListenerIfNeeded();
  }

  function startTouchListenerIfNeeded() {
    if (!touchInProgress) {
      touchInProgress = true;
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);
    }
  }

  function handleTouchMove(e) {
    if (e.touches.length === 1) {
      e.stopPropagation();
      var touch = e.touches[0];

      var offset = getOffsetXY(touch);

      var dx = offset.x - mouseX;
      var dy = offset.y - mouseY;

      if (dx !== 0 && dy !== 0) {
        triggerPanStart();
      }
      mouseX = offset.x;
      mouseY = offset.y;
      var point = transformToScreen(dx, dy);
      internalMoveBy(point.x, point.y);
    } else if (e.touches.length === 2) {
      // it's a zoom, let's find direction
      multiTouch = true;
      var t1 = e.touches[0];
      var t2 = e.touches[1];
      var currentPinchLength = getPinchZoomLength(t1, t2);

      // since the zoom speed is always based on distance from 1, we need to apply
      // pinch speed only on that distance from 1:
      var scaleMultiplier = 1 + (currentPinchLength / pinchZoomLength - 1) * pinchSpeed;

      mouseX = (t1.clientX + t2.clientX) / 2;
      mouseY = (t1.clientY + t2.clientY) / 2;

      publicZoomTo(mouseX, mouseY, scaleMultiplier);

      pinchZoomLength = currentPinchLength;
      e.stopPropagation();
      e.preventDefault();
    }
  }

  function handleTouchEnd(e) {
    if (e.touches.length > 0) {
      var offset = getOffsetXY(e.touches[0]);
      mouseX = offset.x;
      mouseY = offset.y;
    } else {
      var now = new Date();
      if (now - lastTouchEndTime < doubleTapSpeedInMS) {
        smoothZoom(mouseX, mouseY, zoomDoubleClickSpeed);
      }

      lastTouchEndTime = now;

      touchInProgress = false;
      triggerPanEnd();
      releaseTouches();
    }
  }

  function getPinchZoomLength(finger1, finger2) {
    var dx = finger1.clientX - finger2.clientX;
    var dy = finger1.clientY - finger2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function onDoubleClick(e) {
    beforeDoubleClick(e);
    var offset = getOffsetXY(e);
    smoothZoom(offset.x, offset.y, zoomDoubleClickSpeed);
  }

  function onMouseDown(e) {
    if (touchInProgress) {
      // modern browsers will fire mousedown for touch events too
      // we do not want this: touch is handled separately.
      e.stopPropagation();
      return false;
    }
    // for IE, left click == 1
    // for Firefox, left click == 0
    var isLeftButton = e.button === 1 && window.event !== null || e.button === 0;
    if (!isLeftButton) return;

    smoothScroll.cancel();

    var offset = getOffsetXY(e);
    var point = transformToScreen(offset.x, offset.y);
    mouseX = point.x;
    mouseY = point.y;

    // We need to listen on document itself, since mouse can go outside of the
    // window, and we will loose it
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    preventTextSelection.capture(e.target || e.srcElement);

    return false;
  }

  function onMouseMove(e) {
    // no need to worry about mouse events when touch is happening
    if (touchInProgress) return;

    triggerPanStart();

    var offset = getOffsetXY(e);
    var point = transformToScreen(offset.x, offset.y);
    var dx = point.x - mouseX;
    var dy = point.y - mouseY;

    mouseX = point.x;
    mouseY = point.y;

    internalMoveBy(dx, dy);
  }

  function onMouseUp() {
    preventTextSelection.release();
    triggerPanEnd();
    releaseDocumentMouse();
  }

  function releaseDocumentMouse() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    panstartFired = false;
  }

  function releaseTouches() {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchcancel', handleTouchEnd);
    panstartFired = false;
    multiTouch = false;
  }

  function onMouseWheel(e) {
    // if client does not want to handle this event - just ignore the call
    if (beforeWheel(e)) return;

    smoothScroll.cancel();

    var scaleMultiplier = getScaleMultiplier(e.deltaY);

    if (scaleMultiplier !== 1) {
      var offset = getOffsetXY(e);
      publicZoomTo(offset.x, offset.y, scaleMultiplier);
      e.preventDefault();
    }
  }

  function getOffsetXY(e) {
    var offsetX, offsetY;
    // I tried using e.offsetX, but that gives wrong results for svg, when user clicks on a path.
    var ownerRect = owner.getBoundingClientRect();
    offsetX = e.clientX - ownerRect.left;
    offsetY = e.clientY - ownerRect.top;

    return { x: offsetX, y: offsetY };
  }

  function smoothZoom(clientX, clientY, scaleMultiplier) {
    var fromValue = transform.scale;
    var from = { scale: fromValue };
    var to = { scale: scaleMultiplier * fromValue };

    smoothScroll.cancel();
    cancelZoomAnimation();

    zoomToAnimation = animate(from, to, {
      step: function step(v) {
        zoomAbs(clientX, clientY, v.scale);
      }
    });
  }

  function publicZoomTo(clientX, clientY, scaleMultiplier) {
    smoothScroll.cancel();
    cancelZoomAnimation();
    return zoomByRatio(clientX, clientY, scaleMultiplier);
  }

  function cancelZoomAnimation() {
    if (zoomToAnimation) {
      zoomToAnimation.cancel();
      zoomToAnimation = null;
    }
  }

  function getScaleMultiplier(delta) {
    var scaleMultiplier = 1;
    if (delta > 0) {
      // zoom out
      scaleMultiplier = 1 - speed;
    } else if (delta < 0) {
      // zoom in
      scaleMultiplier = 1 + speed;
    }

    return scaleMultiplier;
  }

  function triggerPanStart() {
    if (!panstartFired) {
      triggerEvent('panstart');
      panstartFired = true;
      smoothScroll.start();
    }
  }

  function triggerPanEnd() {
    if (panstartFired) {
      // we should never run smooth scrolling if it was multiTouch (pinch zoom animation):
      if (!multiTouch) smoothScroll.stop();
      triggerEvent('panend');
    }
  }

  function triggerEvent(name) {
    api.fire(name, api);
  }
}

function noop() {}

function validateBounds(bounds) {
  var boundsType = typeof bounds;
  if (boundsType === 'undefined' || boundsType === 'boolean') return; // this is okay
  // otherwise need to be more thorough:
  var validBounds = isNumber(bounds.left) && isNumber(bounds.top) && isNumber(bounds.bottom) && isNumber(bounds.right);

  if (!validBounds) throw new Error('Bounds object is not valid. It can be: ' + 'undefined, boolean (true|false) or an object {left, top, right, bottom}');
}

function isNumber(x) {
  return Number.isFinite(x);
}

// IE 11 does not support isNaN:
function isNaN(value) {
  if (Number.isNaN) {
    return Number.isNaN(value);
  }

  return value !== value;
}

function rigidScroll() {
  return {
    start: noop,
    stop: noop,
    cancel: noop
  };
}

function autoRun() {
  if (typeof document === 'undefined') return;

  var scripts = document.getElementsByTagName('script');
  if (!scripts) return;
  var panzoomScript;

  Array.from(scripts).forEach(function (x) {
    if (x.src && x.src.match(/\bpanzoom(\.min)?\.js/)) {
      panzoomScript = x;
    }
  });

  if (!panzoomScript) return;

  var query = panzoomScript.getAttribute('query');
  if (!query) return;

  var globalName = panzoomScript.getAttribute('name') || 'pz';
  var started = Date.now();

  tryAttach();

  function tryAttach() {
    var el = document.querySelector(query);
    if (!el) {
      var now = Date.now();
      var elapsed = now - started;
      if (elapsed < 2000) {
        // Let's wait a bit
        setTimeout(tryAttach, 100);
        return;
      }
      // If we don't attach within 2 seconds to the target element, consider it a failure
      console.error('Cannot find the panzoom element', globalName);
      return;
    }
    var options = collectOptions(panzoomScript);
    console.log(options);
    window[globalName] = createPanZoom(el, options);
  }

  function collectOptions(script) {
    var attrs = script.attributes;
    var options = {};
    for (var i = 0; i < attrs.length; ++i) {
      var attr = attrs[i];
      var nameValue = getPanzoomAttributeNameValue(attr);
      if (nameValue) {
        options[nameValue.name] = nameValue.value;
      }
    }

    return options;
  }

  function getPanzoomAttributeNameValue(attr) {
    if (!attr.name) return;
    var isPanZoomAttribute = attr.name[0] === 'p' && attr.name[1] === 'z' && attr.name[2] === '-';

    if (!isPanZoomAttribute) return;

    var name = attr.name.substr(3);
    var value = JSON.parse(attr.value);
    return { name: name, value: value };
  }
}

autoRun();

/***/ }),

/***/ "R2VR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__dlNvN","cardHeader":"cardHeader__1JVOI","cardBody":"cardBody__Xob63"};

/***/ }),

/***/ "RYBc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "S1cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("ED/T");
var isBuffer = __webpack_require__("q/Zl");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ "SGkT":
/***/ (function(module, exports) {

module.exports = makeDomController;

function makeDomController(domElement, options) {
  var elementValid = domElement instanceof HTMLElement;
  if (!elementValid) {
    throw new Error('svg element is required for svg.panzoom to work');
  }

  var owner = domElement.parentElement;
  if (!owner) {
    throw new Error('Do not apply panzoom to the detached DOM element. ');
  }

  domElement.scrollTop = 0;

  if (!options.disableKeyboardInteraction) {
    owner.setAttribute('tabindex', 0);
  }

  var api = {
    getBBox: getBBox,
    getOwner: getOwner,
    applyTransform: applyTransform
  };

  return api;

  function getOwner() {
    return owner;
  }

  function getBBox() {
    // TODO: We should probably cache this?
    return {
      left: 0,
      top: 0,
      width: domElement.clientWidth,
      height: domElement.clientHeight
    };
  }

  function applyTransform(transform) {
    // TODO: Should we cache this?
    domElement.style.transformOrigin = '0 0 0';
    domElement.style.transform = 'matrix(' + transform.scale + ', 0, 0, ' + transform.scale + ', ' + transform.x + ', ' + transform.y + ')';
  }
}

/***/ }),

/***/ "SpGf":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "SvAS":
/***/ (function(module, exports) {

module.exports = Transform;

function Transform() {
  this.x = 0;
  this.y = 0;
  this.scale = 1;
}

/***/ }),

/***/ "TO+D":
/***/ (function(module, exports) {

module.exports = function (el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable(elementDocument);

  var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

  var candidates = el.querySelectorAll(candidateSelectors.join(','));

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (candidateSelectors.some(function (candidateSelector) {
      return matches.call(el, candidateSelector);
    })) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndexAttr, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10);
    candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

    if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(function (a, b) {
    return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
  }).map(function (a) {
    return a.node;
  });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
};

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;

    var computedStyle = elementDocument.defaultView.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  };
}

/***/ }),

/***/ "UJE0":
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "UlEV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "V3+0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "VcCu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__("vkNc");

// EXTERNAL MODULE: ../node_modules/@material/ripple/util.js
var util = __webpack_require__("joOv");

// CONCATENATED MODULE: ../node_modules/@material/textfield/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var strings = {
  ARIA_CONTROLS: 'aria-controls',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-floating-label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple'
};

/** @enum {string} */
var cssClasses = {
  ROOT: 'mdc-text-field',
  DISABLED: 'mdc-text-field--disabled',
  DENSE: 'mdc-text-field--dense',
  FOCUSED: 'mdc-text-field--focused',
  INVALID: 'mdc-text-field--invalid',
  TEXTAREA: 'mdc-text-field--textarea',
  OUTLINED: 'mdc-text-field--outlined'
};

/** @enum {number} */
var numbers = {
  LABEL_SCALE: 0.75,
  DENSE_LABEL_SCALE: 0.923
};

// whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// under section: `Validation-related attributes`
var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];

// Label should always float for these types as they show some UI even if value is empty.
var ALWAYS_FLOAT_TYPES = ['color', 'date', 'datetime-local', 'month', 'range', 'time', 'week'];


// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var base_foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Helper Text.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the TextField helper text into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldHelperTextAdapter = function () {
  function MDCTextFieldHelperTextAdapter() {
    _classCallCheck(this, MDCTextFieldHelperTextAdapter);
  }

  /**
   * Adds a class to the helper text element.
   * @param {string} className
   */
  MDCTextFieldHelperTextAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the helper text element.
   * @param {string} className
   */


  MDCTextFieldHelperTextAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns whether or not the helper text element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  MDCTextFieldHelperTextAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Sets an attribute with a given value on the helper text element.
   * @param {string} attr
   * @param {string} value
   */


  MDCTextFieldHelperTextAdapter.prototype.setAttr = function setAttr(attr, value) {};

  /**
   * Removes an attribute from the helper text element.
   * @param {string} attr
   */


  MDCTextFieldHelperTextAdapter.prototype.removeAttr = function removeAttr(attr) {};

  /**
   * Sets the text content for the helper text element.
   * @param {string} content
   */


  MDCTextFieldHelperTextAdapter.prototype.setContent = function setContent(content) {};

  return MDCTextFieldHelperTextAdapter;
}();

/* harmony default export */ var helper_text_adapter = (MDCTextFieldHelperTextAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var constants_strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role'
};

/** @enum {string} */
var constants_cssClasses = {
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
 * @final
 */

var foundation_MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
  _inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);

  _createClass(MDCTextFieldHelperTextFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return constants_cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return constants_strings;
    }

    /**
     * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldHelperTextAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldHelperTextAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          setAttr: function setAttr() {},
          removeAttr: function removeAttr() {},
          setContent: function setContent() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldHelperTextAdapter} adapter
     */

  }]);

  function MDCTextFieldHelperTextFoundation(adapter) {
    foundation__classCallCheck(this, MDCTextFieldHelperTextFoundation);

    return _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
  }

  /**
   * Sets the content of the helper text field.
   * @param {string} content
   */


  MDCTextFieldHelperTextFoundation.prototype.setContent = function setContent(content) {
    this.adapter_.setContent(content);
  };

  /** @param {boolean} isPersistent Sets the persistency of the helper text. */


  MDCTextFieldHelperTextFoundation.prototype.setPersistent = function setPersistent(isPersistent) {
    if (isPersistent) {
      this.adapter_.addClass(constants_cssClasses.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter_.removeClass(constants_cssClasses.HELPER_TEXT_PERSISTENT);
    }
  };

  /**
   * @param {boolean} isValidation True to make the helper text act as an
   *   error validation message.
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidation = function setValidation(isValidation) {
    if (isValidation) {
      this.adapter_.addClass(constants_cssClasses.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter_.removeClass(constants_cssClasses.HELPER_TEXT_VALIDATION_MSG);
    }
  };

  /** Makes the helper text visible to the screen reader. */


  MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function showToScreenReader() {
    this.adapter_.removeAttr(constants_strings.ARIA_HIDDEN);
  };

  /**
   * Sets the validity of the helper text based on the input validity.
   * @param {boolean} inputIsValid
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidity = function setValidity(inputIsValid) {
    var helperTextIsPersistent = this.adapter_.hasClass(constants_cssClasses.HELPER_TEXT_PERSISTENT);
    var helperTextIsValidationMsg = this.adapter_.hasClass(constants_cssClasses.HELPER_TEXT_VALIDATION_MSG);
    var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(constants_strings.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(constants_strings.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  };

  /**
   * Hides the help text from screen readers.
   * @private
   */


  MDCTextFieldHelperTextFoundation.prototype.hide_ = function hide_() {
    this.adapter_.setAttr(constants_strings.ARIA_HIDDEN, 'true');
  };

  return MDCTextFieldHelperTextFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var helper_text_foundation = (foundation_MDCTextFieldHelperTextFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/adapter.js
function adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Icon.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the text field icon into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldIconAdapter = function () {
  function MDCTextFieldIconAdapter() {
    adapter__classCallCheck(this, MDCTextFieldIconAdapter);
  }

  /**
   * Gets the value of an attribute on the icon element.
   * @param {string} attr
   * @return {string}
   */
  MDCTextFieldIconAdapter.prototype.getAttr = function getAttr(attr) {};

  /**
   * Sets an attribute on the icon element.
   * @param {string} attr
   * @param {string} value
   */


  MDCTextFieldIconAdapter.prototype.setAttr = function setAttr(attr, value) {};

  /**
   * Removes an attribute from the icon element.
   * @param {string} attr
   */


  MDCTextFieldIconAdapter.prototype.removeAttr = function removeAttr(attr) {};

  /**
   * Sets the text content of the icon element.
   * @param {string} content
   */


  MDCTextFieldIconAdapter.prototype.setContent = function setContent(content) {};

  /**
   * Registers an event listener on the icon element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldIconAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the icon element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldIconAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
   */


  MDCTextFieldIconAdapter.prototype.notifyIconAction = function notifyIconAction() {};

  return MDCTextFieldIconAdapter;
}();

/* harmony default export */ var icon_adapter = (MDCTextFieldIconAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var icon_constants_strings = {
  ICON_EVENT: 'MDCTextField:icon',
  ICON_ROLE: 'button'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/foundation.js
var foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function icon_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
 * @final
 */

var foundation_MDCTextFieldIconFoundation = function (_MDCFoundation) {
  foundation__inherits(MDCTextFieldIconFoundation, _MDCFoundation);

  foundation__createClass(MDCTextFieldIconFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return icon_constants_strings;
    }

    /**
     * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldIconAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldIconAdapter} */{
          getAttr: function getAttr() {},
          setAttr: function setAttr() {},
          removeAttr: function removeAttr() {},
          setContent: function setContent() {},
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {},
          notifyIconAction: function notifyIconAction() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldIconAdapter} adapter
     */

  }]);

  function MDCTextFieldIconFoundation(adapter) {
    icon_foundation__classCallCheck(this, MDCTextFieldIconFoundation);

    /** @private {string?} */
    var _this = foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, foundation__extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

    _this.savedTabIndex_ = null;

    /** @private {function(!Event): undefined} */
    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };
    return _this;
  }

  MDCTextFieldIconFoundation.prototype.init = function init() {
    var _this2 = this;

    this.savedTabIndex_ = this.adapter_.getAttr('tabindex');

    ['click', 'keydown'].forEach(function (evtType) {
      _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
    });
  };

  MDCTextFieldIconFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    ['click', 'keydown'].forEach(function (evtType) {
      _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
    });
  };

  /** @param {boolean} disabled */


  MDCTextFieldIconFoundation.prototype.setDisabled = function setDisabled(disabled) {
    if (!this.savedTabIndex_) {
      return;
    }

    if (disabled) {
      this.adapter_.setAttr('tabindex', '-1');
      this.adapter_.removeAttr('role');
    } else {
      this.adapter_.setAttr('tabindex', this.savedTabIndex_);
      this.adapter_.setAttr('role', icon_constants_strings.ICON_ROLE);
    }
  };

  /** @param {string} label */


  MDCTextFieldIconFoundation.prototype.setAriaLabel = function setAriaLabel(label) {
    this.adapter_.setAttr('aria-label', label);
  };

  /** @param {string} content */


  MDCTextFieldIconFoundation.prototype.setContent = function setContent(content) {
    this.adapter_.setContent(content);
  };

  /**
   * Handles an interaction event
   * @param {!Event} evt
   */


  MDCTextFieldIconFoundation.prototype.handleInteraction = function handleInteraction(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyIconAction();
    }
  };

  return MDCTextFieldIconFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var icon_foundation = (foundation_MDCTextFieldIconFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/adapter.js
function textfield_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint-disable no-unused-vars */



/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * @typedef {{
 *   value: string,
 *   disabled: boolean,
 *   badInput: boolean,
 *   validity: {
 *     badInput: boolean,
 *     valid: boolean,
 *   },
 * }}
 */
var NativeInputType = void 0;

/**
 * @typedef {{
 *   helperText: (!MDCTextFieldHelperTextFoundation|undefined),
 *   icon: (!MDCTextFieldIconFoundation|undefined),
 * }}
 */
var FoundationMapType = void 0;

/**
 * Adapter for MDC Text Field.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

var MDCTextFieldAdapter = function () {
  function MDCTextFieldAdapter() {
    textfield_adapter__classCallCheck(this, MDCTextFieldAdapter);
  }

  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  MDCTextFieldAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  MDCTextFieldAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns true if the root element contains the given class name.
   * @param {string} className
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Registers an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.registerTextFieldInteractionHandler = function registerTextFieldInteractionHandler(type, handler) {};

  /**
   * Deregisters an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.deregisterTextFieldInteractionHandler = function deregisterTextFieldInteractionHandler(type, handler) {};

  /**
   * Registers an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.registerInputInteractionHandler = function registerInputInteractionHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.deregisterInputInteractionHandler = function deregisterInputInteractionHandler(evtType, handler) {};

  /**
   * Registers a validation attribute change listener on the input element.
   * Handler accepts list of attribute names.
   * @param {function(!Array<string>): undefined} handler
   * @return {!MutationObserver}
   */


  MDCTextFieldAdapter.prototype.registerValidationAttributeChangeHandler = function registerValidationAttributeChangeHandler(handler) {};

  /**
   * Disconnects a validation attribute observer on the input element.
   * @param {!MutationObserver} observer
   */


  MDCTextFieldAdapter.prototype.deregisterValidationAttributeChangeHandler = function deregisterValidationAttributeChangeHandler(observer) {};

  /**
   * Returns an object representing the native text input element, with a
   * similar API shape. The object returned should include the value, disabled
   * and badInput properties, as well as the checkValidity() function. We never
   * alter the value within our code, however we do update the disabled
   * property, so if you choose to duck-type the return value for this method
   * in your implementation it's important to keep this in mind. Also note that
   * this method can return null, which the foundation will handle gracefully.
   * @return {?Element|?NativeInputType}
   */


  MDCTextFieldAdapter.prototype.getNativeInput = function getNativeInput() {};

  /**
   * Returns true if the textfield is focused.
   * We achieve this via `document.activeElement === this.root_`.
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.isFocused = function isFocused() {};

  /**
   * Returns true if the direction of the root element is set to RTL.
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.isRtl = function isRtl() {};

  /**
   * Activates the line ripple.
   */


  MDCTextFieldAdapter.prototype.activateLineRipple = function activateLineRipple() {};

  /**
   * Deactivates the line ripple.
   */


  MDCTextFieldAdapter.prototype.deactivateLineRipple = function deactivateLineRipple() {};

  /**
   * Sets the transform origin of the line ripple.
   * @param {number} normalizedX
   */


  MDCTextFieldAdapter.prototype.setLineRippleTransformOrigin = function setLineRippleTransformOrigin(normalizedX) {};

  /**
   * Only implement if label exists.
   * Shakes label if shouldShake is true.
   * @param {boolean} shouldShake
   */


  MDCTextFieldAdapter.prototype.shakeLabel = function shakeLabel(shouldShake) {};

  /**
   * Only implement if label exists.
   * Floats the label above the input element if shouldFloat is true.
   * @param {boolean} shouldFloat
   */


  MDCTextFieldAdapter.prototype.floatLabel = function floatLabel(shouldFloat) {};

  /**
   * Returns true if label element exists, false if it doesn't.
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.hasLabel = function hasLabel() {};

  /**
   * Only implement if label exists.
   * Returns width of label in pixels.
   * @return {number}
   */


  MDCTextFieldAdapter.prototype.getLabelWidth = function getLabelWidth() {};

  /**
   * Returns true if outline element exists, false if it doesn't.
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.hasOutline = function hasOutline() {};

  /**
   * Only implement if outline element exists.
   * Updates SVG Path and outline element based on the
   * label element width and RTL context.
   * @param {number} labelWidth
   * @param {boolean=} isRtl
   */


  MDCTextFieldAdapter.prototype.notchOutline = function notchOutline(labelWidth, isRtl) {};

  /**
   * Only implement if outline element exists.
   * Closes notch in outline element.
   */


  MDCTextFieldAdapter.prototype.closeOutline = function closeOutline() {};

  return MDCTextFieldAdapter;
}();


// CONCATENATED MODULE: ../node_modules/@material/textfield/foundation.js
var textfield_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var textfield_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function textfield_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function textfield_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function textfield_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */



/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */

var foundation_MDCTextFieldFoundation = function (_MDCFoundation) {
  textfield_foundation__inherits(MDCTextFieldFoundation, _MDCFoundation);

  textfield_foundation__createClass(MDCTextFieldFoundation, [{
    key: 'shouldShake',


    /** @return {boolean} */
    get: function get() {
      return !this.isValid() && !this.isFocused_ && !!this.getValue();
    }

    /**
     * @return {boolean}
     * @private
     */

  }, {
    key: 'shouldAlwaysFloat_',
    get: function get() {
      var type = this.getNativeInput_().type;
      return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
    }

    /** @return {boolean} */

  }, {
    key: 'shouldFloat',
    get: function get() {
      return this.shouldAlwaysFloat_ || this.isFocused_ || !!this.getValue() || this.isBadInput_();
    }

    /**
     * {@see MDCTextFieldAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldAdapter}
     */

  }], [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }

    /** @return enum {string} */

  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
          registerInputInteractionHandler: function registerInputInteractionHandler() {},
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
          registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {},
          deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {},
          getNativeInput: function getNativeInput() {},
          isFocused: function isFocused() {},
          isRtl: function isRtl() {},
          activateLineRipple: function activateLineRipple() {},
          deactivateLineRipple: function deactivateLineRipple() {},
          setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {},
          shakeLabel: function shakeLabel() {},
          floatLabel: function floatLabel() {},
          hasLabel: function hasLabel() {},
          getLabelWidth: function getLabelWidth() {},
          hasOutline: function hasOutline() {},
          notchOutline: function notchOutline() {},
          closeOutline: function closeOutline() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldAdapter} adapter
     * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
     */

  }]);

  function MDCTextFieldFoundation(adapter) {
    var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};

    textfield_foundation__classCallCheck(this, MDCTextFieldFoundation);

    /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
    var _this = textfield_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, textfield_foundation__extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

    _this.helperText_ = foundationMap.helperText;
    /** @type {!MDCTextFieldIconFoundation|undefined} */
    _this.icon_ = foundationMap.icon;

    /** @private {boolean} */
    _this.isFocused_ = false;
    /** @private {boolean} */
    _this.receivedUserInput_ = false;
    /** @private {boolean} */
    _this.useCustomValidityChecking_ = false;
    /** @private {boolean} */
    _this.isValid_ = true;

    /** @private {boolean} */
    _this.useNativeValidation_ = true;

    /** @private {function(): undefined} */
    _this.inputFocusHandler_ = function () {
      return _this.activateFocus();
    };
    /** @private {function(): undefined} */
    _this.inputBlurHandler_ = function () {
      return _this.deactivateFocus();
    };
    /** @private {function(): undefined} */
    _this.inputInputHandler_ = function () {
      return _this.autoCompleteFocus();
    };
    /** @private {function(!Event): undefined} */
    _this.setPointerXOffset_ = function (evt) {
      return _this.setTransformOrigin(evt);
    };
    /** @private {function(!Event): undefined} */
    _this.textFieldInteractionHandler_ = function () {
      return _this.handleTextFieldInteraction();
    };
    /** @private {function(!Array): undefined} */
    _this.validationAttributeChangeHandler_ = function (attributesList) {
      return _this.handleValidationAttributeChange(attributesList);
    };

    /** @private {!MutationObserver} */
    _this.validationObserver_;
    return _this;
  }

  MDCTextFieldFoundation.prototype.init = function init() {
    var _this2 = this;

    if (this.adapter_.isFocused()) {
      this.inputFocusHandler_();
    } else if (this.adapter_.hasLabel() && this.shouldFloat) {
      this.notchOutline(true);
      this.adapter_.floatLabel(true);
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach(function (evtType) {
      _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach(function (evtType) {
      _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
    });
    this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
  };

  MDCTextFieldFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach(function (evtType) {
      _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach(function (evtType) {
      _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
  };

  /**
   * Handles user interactions with the Text Field.
   */


  MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function handleTextFieldInteraction() {
    if (this.adapter_.getNativeInput().disabled) {
      return;
    }
    this.receivedUserInput_ = true;
  };

  /**
   * Handles validation attribute changes
   * @param {!Array<string>} attributesList
   */


  MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function handleValidationAttributeChange(attributesList) {
    var _this4 = this;

    attributesList.some(function (attributeName) {
      if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
        _this4.styleValidity_(true);
        return true;
      }
    });
  };

  /**
   * Opens/closes the notched outline.
   * @param {boolean} openNotch
   */


  MDCTextFieldFoundation.prototype.notchOutline = function notchOutline(openNotch) {
    if (!this.adapter_.hasOutline()) {
      return;
    }

    if (openNotch) {
      var isDense = this.adapter_.hasClass(cssClasses.DENSE);
      var labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
      var labelWidth = this.adapter_.getLabelWidth() * labelScale;
      var isRtl = this.adapter_.isRtl();
      this.adapter_.notchOutline(labelWidth, isRtl);
    } else {
      this.adapter_.closeOutline();
    }
  };

  /**
   * Activates the text field focus state.
   */


  MDCTextFieldFoundation.prototype.activateFocus = function activateFocus() {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter_.activateLineRipple();
    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }
    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  };

  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location.
   * @param {!Event} evt
   */


  MDCTextFieldFoundation.prototype.setTransformOrigin = function setTransformOrigin(evt) {
    var targetClientRect = evt.target.getBoundingClientRect();
    var evtCoords = { x: evt.clientX, y: evt.clientY };
    var normalizedX = evtCoords.x - targetClientRect.left;
    this.adapter_.setLineRippleTransformOrigin(normalizedX);
  };

  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programatically).
   */


  MDCTextFieldFoundation.prototype.autoCompleteFocus = function autoCompleteFocus() {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  };

  /**
   * Deactivates the Text Field's focus state.
   */


  MDCTextFieldFoundation.prototype.deactivateFocus = function deactivateFocus() {
    this.isFocused_ = false;
    this.adapter_.deactivateLineRipple();
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);
    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }
    if (!this.shouldFloat) {
      this.receivedUserInput_ = false;
    }
  };

  /**
   * @return {string} The value of the input Element.
   */


  MDCTextFieldFoundation.prototype.getValue = function getValue() {
    return this.getNativeInput_().value;
  };

  /**
   * @param {string} value The value to set on the input Element.
   */


  MDCTextFieldFoundation.prototype.setValue = function setValue(value) {
    this.getNativeInput_().value = value;
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }
  };

  /**
   * @return {boolean} If a custom validity is set, returns that value.
   *     Otherwise, returns the result of native validity checks.
   */


  MDCTextFieldFoundation.prototype.isValid = function isValid() {
    return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
  };

  /**
   * @param {boolean} isValid Sets the validity state of the Text Field.
   */


  MDCTextFieldFoundation.prototype.setValid = function setValid(isValid) {
    this.isValid_ = isValid;
    this.styleValidity_(isValid);

    var shouldShake = !isValid && !this.isFocused_;
    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(shouldShake);
    }
  };

  /**
   * Enables or disables the use of native validation. Use this for custom validation.
   * @param {boolean} useNativeValidation Set this to false to ignore native input validation.
   */


  MDCTextFieldFoundation.prototype.setUseNativeValidation = function setUseNativeValidation(useNativeValidation) {
    this.useNativeValidation_ = useNativeValidation;
  };

  /**
   * @return {boolean} True if the Text Field is disabled.
   */


  MDCTextFieldFoundation.prototype.isDisabled = function isDisabled() {
    return this.getNativeInput_().disabled;
  };

  /**
   * @param {boolean} disabled Sets the text-field disabled or enabled.
   */


  MDCTextFieldFoundation.prototype.setDisabled = function setDisabled(disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  };

  /**
   * @param {string} content Sets the content of the helper text.
   */


  MDCTextFieldFoundation.prototype.setHelperTextContent = function setHelperTextContent(content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };

  /**
   * Sets the aria label of the icon.
   * @param {string} label
   */


  MDCTextFieldFoundation.prototype.setIconAriaLabel = function setIconAriaLabel(label) {
    if (this.icon_) {
      this.icon_.setAriaLabel(label);
    }
  };

  /**
   * Sets the text content of the icon.
   * @param {string} content
   */


  MDCTextFieldFoundation.prototype.setIconContent = function setIconContent(content) {
    if (this.icon_) {
      this.icon_.setContent(content);
    }
  };

  /**
   * @return {boolean} True if the Text Field input fails in converting the
   *     user-supplied value.
   * @private
   */


  MDCTextFieldFoundation.prototype.isBadInput_ = function isBadInput_() {
    return this.getNativeInput_().validity.badInput;
  };

  /**
   * @return {boolean} The result of native validity checking
   *     (ValidityState.valid).
   */


  MDCTextFieldFoundation.prototype.isNativeInputValid_ = function isNativeInputValid_() {
    return this.getNativeInput_().validity.valid;
  };

  /**
   * Styles the component based on the validity state.
   * @param {boolean} isValid
   * @private
   */


  MDCTextFieldFoundation.prototype.styleValidity_ = function styleValidity_(isValid) {
    var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }
    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
    }
  };

  /**
   * Styles the component based on the focused state.
   * @param {boolean} isFocused
   * @private
   */


  MDCTextFieldFoundation.prototype.styleFocused_ = function styleFocused_(isFocused) {
    var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

    if (isFocused) {
      this.adapter_.addClass(FOCUSED);
    } else {
      this.adapter_.removeClass(FOCUSED);
    }
  };

  /**
   * Styles the component based on the disabled state.
   * @param {boolean} isDisabled
   * @private
   */


  MDCTextFieldFoundation.prototype.styleDisabled_ = function styleDisabled_(isDisabled) {
    var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
        DISABLED = _MDCTextFieldFoundati.DISABLED,
        INVALID = _MDCTextFieldFoundati.INVALID;

    if (isDisabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
    if (this.icon_) {
      this.icon_.setDisabled(isDisabled);
    }
  };

  /**
   * @return {!Element|!NativeInputType} The native text input from the
   * host environment, or a dummy if none exists.
   * @private
   */


  MDCTextFieldFoundation.prototype.getNativeInput_ = function getNativeInput_() {
    return this.adapter_.getNativeInput() ||
    /** @type {!NativeInputType} */{
      value: '',
      disabled: false,
      validity: {
        badInput: false,
        valid: true
      }
    };
  };

  return MDCTextFieldFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var textfield_foundation = (foundation_MDCTextFieldFoundation);
// CONCATENATED MODULE: ../node_modules/@material/line-ripple/adapter.js
function line_ripple_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC TextField Line Ripple.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the line ripple into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCLineRippleAdapter = function () {
  function MDCLineRippleAdapter() {
    line_ripple_adapter__classCallCheck(this, MDCLineRippleAdapter);
  }

  /**
   * Adds a class to the line ripple element.
   * @param {string} className
   */
  MDCLineRippleAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the line ripple element.
   * @param {string} className
   */


  MDCLineRippleAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * @param {string} className
   * @return {boolean}
   */


  MDCLineRippleAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Sets the style property with propertyName to value on the root element.
   * @param {string} propertyName
   * @param {string} value
   */


  MDCLineRippleAdapter.prototype.setStyle = function setStyle(propertyName, value) {};

  /**
   * Registers an event listener on the line ripple element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCLineRippleAdapter.prototype.registerEventHandler = function registerEventHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the line ripple element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCLineRippleAdapter.prototype.deregisterEventHandler = function deregisterEventHandler(evtType, handler) {};

  return MDCLineRippleAdapter;
}();

/* harmony default export */ var line_ripple_adapter = (MDCLineRippleAdapter);
// CONCATENATED MODULE: ../node_modules/@material/line-ripple/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var line_ripple_constants_cssClasses = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};


// CONCATENATED MODULE: ../node_modules/@material/line-ripple/foundation.js
var line_ripple_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var line_ripple_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function line_ripple_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function line_ripple_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function line_ripple_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCLineRippleAdapter>}
 * @final
 */

var foundation_MDCLineRippleFoundation = function (_MDCFoundation) {
  line_ripple_foundation__inherits(MDCLineRippleFoundation, _MDCFoundation);

  line_ripple_foundation__createClass(MDCLineRippleFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return line_ripple_constants_cssClasses;
    }

    /**
     * {@see MDCLineRippleAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCLineRippleAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCLineRippleAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          setStyle: function setStyle() {},
          registerEventHandler: function registerEventHandler() {},
          deregisterEventHandler: function deregisterEventHandler() {}
        }
      );
    }

    /**
     * @param {!MDCLineRippleAdapter=} adapter
     */

  }]);

  function MDCLineRippleFoundation(adapter) {
    line_ripple_foundation__classCallCheck(this, MDCLineRippleFoundation);

    /** @private {function(!Event): undefined} */
    var _this = line_ripple_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, line_ripple_foundation__extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };
    return _this;
  }

  MDCLineRippleFoundation.prototype.init = function init() {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  /**
   * Activates the line ripple
   */


  MDCLineRippleFoundation.prototype.activate = function activate() {
    this.adapter_.removeClass(line_ripple_constants_cssClasses.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(line_ripple_constants_cssClasses.LINE_RIPPLE_ACTIVE);
  };

  /**
   * Sets the center of the ripple animation to the given X coordinate.
   * @param {number} xCoordinate
   */


  MDCLineRippleFoundation.prototype.setRippleCenter = function setRippleCenter(xCoordinate) {
    this.adapter_.setStyle('transform-origin', xCoordinate + 'px center');
  };

  /**
   * Deactivates the line ripple
   */


  MDCLineRippleFoundation.prototype.deactivate = function deactivate() {
    this.adapter_.addClass(line_ripple_constants_cssClasses.LINE_RIPPLE_DEACTIVATING);
  };

  /**
   * Handles a transition end event
   * @param {!Event} evt
   */


  MDCLineRippleFoundation.prototype.handleTransitionEnd = function handleTransitionEnd(evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    var isDeactivating = this.adapter_.hasClass(line_ripple_constants_cssClasses.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(line_ripple_constants_cssClasses.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(line_ripple_constants_cssClasses.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };

  return MDCLineRippleFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var line_ripple_foundation = (foundation_MDCLineRippleFoundation);
// CONCATENATED MODULE: ../node_modules/@material/line-ripple/index.js
var line_ripple__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function line_ripple__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function line_ripple__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function line_ripple__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






/**
 * @extends {MDCComponent<!MDCLineRippleFoundation>}
 * @final
 */

var line_ripple_MDCLineRipple = function (_MDCComponent) {
  line_ripple__inherits(MDCLineRipple, _MDCComponent);

  function MDCLineRipple() {
    line_ripple__classCallCheck(this, MDCLineRipple);

    return line_ripple__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCLineRipple}
   */
  MDCLineRipple.attachTo = function attachTo(root) {
    return new MDCLineRipple(root);
  };

  /**
   * Activates the line ripple
   */


  MDCLineRipple.prototype.activate = function activate() {
    this.foundation_.activate();
  };

  /**
   * Deactivates the line ripple
   */


  MDCLineRipple.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  /**
   * Sets the transform origin given a user's click location. The `rippleCenter` is the
   * x-coordinate of the middle of the ripple.
   * @param {number} xCoordinate
   */


  MDCLineRipple.prototype.setRippleCenter = function setRippleCenter(xCoordinate) {
    this.foundation_.setRippleCenter(xCoordinate);
  };

  /**
   * @return {!MDCLineRippleFoundation}
   */


  MDCLineRipple.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new line_ripple_foundation( /** @type {!MDCLineRippleAdapter} */line_ripple__extends({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      setStyle: function setStyle(propertyName, value) {
        return _this2.root_.style[propertyName] = value;
      },
      registerEventHandler: function registerEventHandler(evtType, handler) {
        return _this2.root_.addEventListener(evtType, handler);
      },
      deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
        return _this2.root_.removeEventListener(evtType, handler);
      }
    }));
  };

  return MDCLineRipple;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/index.js
var helper_text__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var helper_text__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function helper_text__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function helper_text__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function helper_text__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






/**
 * @extends {MDCComponent<!MDCTextFieldHelperTextFoundation>}
 * @final
 */

var helper_text_MDCTextFieldHelperText = function (_MDCComponent) {
  helper_text__inherits(MDCTextFieldHelperText, _MDCComponent);

  function MDCTextFieldHelperText() {
    helper_text__classCallCheck(this, MDCTextFieldHelperText);

    return helper_text__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldHelperText}
   */
  MDCTextFieldHelperText.attachTo = function attachTo(root) {
    return new MDCTextFieldHelperText(root);
  };

  /**
   * @return {!MDCTextFieldHelperTextFoundation}
   */


  /**
   * @return {!MDCTextFieldHelperTextFoundation}
   */
  MDCTextFieldHelperText.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new helper_text_foundation( /** @type {!MDCTextFieldHelperTextAdapter} */helper_text__extends({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      setAttr: function setAttr(attr, value) {
        return _this2.root_.setAttribute(attr, value);
      },
      removeAttr: function removeAttr(attr) {
        return _this2.root_.removeAttribute(attr);
      },
      setContent: function setContent(content) {
        _this2.root_.textContent = content;
      }
    }));
  };

  helper_text__createClass(MDCTextFieldHelperText, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldHelperText;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/index.js
var icon__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var icon__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function icon__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icon__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function icon__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






/**
 * @extends {MDCComponent<!MDCTextFieldIconFoundation>}
 * @final
 */

var icon_MDCTextFieldIcon = function (_MDCComponent) {
  icon__inherits(MDCTextFieldIcon, _MDCComponent);

  function MDCTextFieldIcon() {
    icon__classCallCheck(this, MDCTextFieldIcon);

    return icon__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldIcon}
   */
  MDCTextFieldIcon.attachTo = function attachTo(root) {
    return new MDCTextFieldIcon(root);
  };

  /**
   * @return {!MDCTextFieldIconFoundation}
   */


  /**
   * @return {!MDCTextFieldIconFoundation}
   */
  MDCTextFieldIcon.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new icon_foundation( /** @type {!MDCTextFieldIconAdapter} */icon__extends({
      getAttr: function getAttr(attr) {
        return _this2.root_.getAttribute(attr);
      },
      setAttr: function setAttr(attr, value) {
        return _this2.root_.setAttribute(attr, value);
      },
      removeAttr: function removeAttr(attr) {
        return _this2.root_.removeAttribute(attr);
      },
      setContent: function setContent(content) {
        _this2.root_.textContent = content;
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this2.root_.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this2.root_.removeEventListener(evtType, handler);
      },
      notifyIconAction: function notifyIconAction() {
        return _this2.emit(icon_foundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */);
      }
    }));
  };

  icon__createClass(MDCTextFieldIcon, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldIcon;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/floating-label/adapter.js
function floating_label_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Floating Label.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the floating label into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCFloatingLabelAdapter = function () {
  function MDCFloatingLabelAdapter() {
    floating_label_adapter__classCallCheck(this, MDCFloatingLabelAdapter);
  }

  /**
   * Adds a class to the label element.
   * @param {string} className
   */
  MDCFloatingLabelAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the label element.
   * @param {string} className
   */


  MDCFloatingLabelAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns the width of the label element.
   * @return {number}
   */


  MDCFloatingLabelAdapter.prototype.getWidth = function getWidth() {};

  /**
   * Registers an event listener on the root element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCFloatingLabelAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the root element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCFloatingLabelAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  return MDCFloatingLabelAdapter;
}();

/* harmony default export */ var floating_label_adapter = (MDCFloatingLabelAdapter);
// CONCATENATED MODULE: ../node_modules/@material/floating-label/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var floating_label_constants_cssClasses = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake'
};


// CONCATENATED MODULE: ../node_modules/@material/floating-label/foundation.js
var floating_label_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var floating_label_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function floating_label_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function floating_label_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function floating_label_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
 * @final
 */

var foundation_MDCFloatingLabelFoundation = function (_MDCFoundation) {
  floating_label_foundation__inherits(MDCFloatingLabelFoundation, _MDCFoundation);

  floating_label_foundation__createClass(MDCFloatingLabelFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return floating_label_constants_cssClasses;
    }

    /**
     * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCFloatingLabelAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCFloatingLabelAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          getWidth: function getWidth() {},
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {}
        }
      );
    }

    /**
     * @param {!MDCFloatingLabelAdapter} adapter
     */

  }]);

  function MDCFloatingLabelFoundation(adapter) {
    floating_label_foundation__classCallCheck(this, MDCFloatingLabelFoundation);

    /** @private {function(!Event): undefined} */
    var _this = floating_label_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, floating_label_foundation__extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };
    return _this;
  }

  MDCFloatingLabelFoundation.prototype.init = function init() {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  /**
   * Returns the width of the label element.
   * @return {number}
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function getWidth() {
    return this.adapter_.getWidth();
  };

  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} shouldShake adds shake class if true,
   * otherwise removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function shake(shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  /**
   * Styles the label to float or dock.
   * @param {boolean} shouldFloat adds float class if true, otherwise remove
   * float and shake class to dock label.
   */


  MDCFloatingLabelFoundation.prototype.float = function float(shouldFloat) {
    var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  /**
   * Handles an interaction event on the root element.
   */


  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function handleShakeAnimationEnd_() {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    this.adapter_.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var floating_label_foundation = (foundation_MDCFloatingLabelFoundation);
// CONCATENATED MODULE: ../node_modules/@material/floating-label/index.js
function floating_label__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function floating_label__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function floating_label__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCComponent<!MDCFloatingLabelFoundation>}
 * @final
 */

var floating_label_MDCFloatingLabel = function (_MDCComponent) {
  floating_label__inherits(MDCFloatingLabel, _MDCComponent);

  function MDCFloatingLabel() {
    floating_label__classCallCheck(this, MDCFloatingLabel);

    return floating_label__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCFloatingLabel}
   */
  MDCFloatingLabel.attachTo = function attachTo(root) {
    return new MDCFloatingLabel(root);
  };

  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} shouldShake styles the label to shake by adding shake class
   * if true, otherwise will stop shaking by removing shake class.
   */


  MDCFloatingLabel.prototype.shake = function shake(shouldShake) {
    this.foundation_.shake(shouldShake);
  };

  /**
   * Styles label to float/dock.
   * @param {boolean} shouldFloat styles the label to float by adding float class
   * if true, otherwise docks the label by removing the float class.
   */


  MDCFloatingLabel.prototype.float = function float(shouldFloat) {
    this.foundation_.float(shouldFloat);
  };

  /**
   * @return {number}
   */


  MDCFloatingLabel.prototype.getWidth = function getWidth() {
    return this.foundation_.getWidth();
  };

  /**
   * @return {!MDCFloatingLabelFoundation}
   */


  MDCFloatingLabel.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new floating_label_foundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      getWidth: function getWidth() {
        return _this2.root_.offsetWidth;
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this2.root_.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this2.root_.removeEventListener(evtType, handler);
      }
    });
  };

  return MDCFloatingLabel;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/notched-outline/adapter.js
function notched_outline_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Notched Outline.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Notched Outline into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCNotchedOutlineAdapter = function () {
  function MDCNotchedOutlineAdapter() {
    notched_outline_adapter__classCallCheck(this, MDCNotchedOutlineAdapter);
  }

  /**
   * Returns the width of the root element.
   * @return {number}
   */
  MDCNotchedOutlineAdapter.prototype.getWidth = function getWidth() {};

  /**
   * Returns the height of the root element.
   * @return {number}
   */


  MDCNotchedOutlineAdapter.prototype.getHeight = function getHeight() {};

  /**
   * Adds a class to the root element.
   * @param {string} className
   */


  MDCNotchedOutlineAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the root element.
   * @param {string} className
   */


  MDCNotchedOutlineAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Sets the "d" attribute of the outline element's SVG path.
   * @param {string} value
   */


  MDCNotchedOutlineAdapter.prototype.setOutlinePathAttr = function setOutlinePathAttr(value) {};

  /**
   * Returns the idle outline element's computed style value of the given css property `propertyName`.
   * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
   * @param {string} propertyName
   * @return {string}
   */


  MDCNotchedOutlineAdapter.prototype.getIdleOutlineStyleValue = function getIdleOutlineStyleValue(propertyName) {};

  return MDCNotchedOutlineAdapter;
}();

/* harmony default export */ var notched_outline_adapter = (MDCNotchedOutlineAdapter);
// CONCATENATED MODULE: ../node_modules/@material/notched-outline/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var notched_outline_constants_strings = {
  PATH_SELECTOR: '.mdc-notched-outline__path',
  IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
};

/** @enum {string} */
var notched_outline_constants_cssClasses = {
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched'
};


// CONCATENATED MODULE: ../node_modules/@material/notched-outline/foundation.js
var notched_outline_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var notched_outline_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function notched_outline_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notched_outline_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function notched_outline_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
 * @final
 */

var foundation_MDCNotchedOutlineFoundation = function (_MDCFoundation) {
  notched_outline_foundation__inherits(MDCNotchedOutlineFoundation, _MDCFoundation);

  notched_outline_foundation__createClass(MDCNotchedOutlineFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return notched_outline_constants_strings;
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get() {
      return notched_outline_constants_cssClasses;
    }

    /**
     * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCNotchedOutlineAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCNotchedOutlineAdapter} */{
          getWidth: function getWidth() {},
          getHeight: function getHeight() {},
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          setOutlinePathAttr: function setOutlinePathAttr() {},
          getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
        }
      );
    }

    /**
     * @param {!MDCNotchedOutlineAdapter} adapter
     */

  }]);

  function MDCNotchedOutlineFoundation(adapter) {
    notched_outline_foundation__classCallCheck(this, MDCNotchedOutlineFoundation);

    return notched_outline_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, notched_outline_foundation__extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
  }

  /**
   * Adds the outline notched selector and updates the notch width
   * calculated based off of notchWidth and isRtl.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   */


  MDCNotchedOutlineFoundation.prototype.notch = function notch(notchWidth) {
    var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    this.adapter_.addClass(OUTLINE_NOTCHED);
    this.updateSvgPath_(notchWidth, isRtl);
  };

  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  MDCNotchedOutlineFoundation.prototype.closeNotch = function closeNotch() {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    this.adapter_.removeClass(OUTLINE_NOTCHED);
  };

  /**
   * Updates the SVG path of the focus outline element based on the notchWidth
   * and the RTL context.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   * @private
   */


  MDCNotchedOutlineFoundation.prototype.updateSvgPath_ = function updateSvgPath_(notchWidth, isRtl) {
    // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
    var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
    var radius = parseFloat(radiusStyleValue);
    var width = this.adapter_.getWidth();
    var height = this.adapter_.getHeight();
    var cornerWidth = radius + 1.2;
    var leadingStrokeLength = Math.abs(12 - cornerWidth);

    // If the notchWidth is 0, the the notched outline doesn't need to add padding.
    var paddedNotchWidth = 0;
    if (notchWidth > 0) {
      paddedNotchWidth = notchWidth + 8;
    }

    // The right, bottom, and left sides of the outline follow the same SVG path.
    var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

    var path = void 0;
    if (!isRtl) {
      path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
    } else {
      path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
    }

    this.adapter_.setOutlinePathAttr(path);
  };

  return MDCNotchedOutlineFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var notched_outline_foundation = (foundation_MDCNotchedOutlineFoundation);
// CONCATENATED MODULE: ../node_modules/@material/notched-outline/index.js
function notched_outline__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notched_outline__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function notched_outline__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */







/**
 * @extends {MDCComponent<!MDCNotchedOutlineFoundation>}
 * @final
 */

var notched_outline_MDCNotchedOutline = function (_MDCComponent) {
  notched_outline__inherits(MDCNotchedOutline, _MDCComponent);

  function MDCNotchedOutline() {
    notched_outline__classCallCheck(this, MDCNotchedOutline);

    return notched_outline__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCNotchedOutline}
   */
  MDCNotchedOutline.attachTo = function attachTo(root) {
    return new MDCNotchedOutline(root);
  };

  /**
    * Updates outline selectors and SVG path to open notch.
    * @param {number} notchWidth The notch width in the outline.
    * @param {boolean=} isRtl Determines if outline is rtl. If rtl is true, notch
    * will be right justified in outline path, otherwise left justified.
    */


  MDCNotchedOutline.prototype.notch = function notch(notchWidth, isRtl) {
    this.foundation_.notch(notchWidth, isRtl);
  };

  /**
   * Updates the outline selectors to close notch and return it to idle state.
   */


  MDCNotchedOutline.prototype.closeNotch = function closeNotch() {
    this.foundation_.closeNotch();
  };

  /**
   * @return {!MDCNotchedOutlineFoundation}
   */


  MDCNotchedOutline.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new notched_outline_foundation({
      getWidth: function getWidth() {
        return _this2.root_.offsetWidth;
      },
      getHeight: function getHeight() {
        return _this2.root_.offsetHeight;
      },
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      setOutlinePathAttr: function setOutlinePathAttr(value) {
        var path = _this2.root_.querySelector(notched_outline_constants_strings.PATH_SELECTOR);
        path.setAttribute('d', value);
      },
      getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
        var idleOutlineElement = _this2.root_.parentNode.querySelector(notched_outline_constants_strings.IDLE_OUTLINE_SELECTOR);
        return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
      }
    });
  };

  return MDCNotchedOutline;
}(component["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/textfield/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTextField", function() { return textfield_MDCTextField; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTextFieldFoundation", function() { return textfield_foundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTextFieldHelperText", function() { return helper_text_MDCTextFieldHelperText; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTextFieldHelperTextFoundation", function() { return helper_text_foundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTextFieldIcon", function() { return icon_MDCTextFieldIcon; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTextFieldIconFoundation", function() { return icon_foundation; });
var textfield__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var textfield__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function textfield__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function textfield__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function textfield__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */





/* eslint-disable no-unused-vars */





/* eslint-enable no-unused-vars */

/**
 * @extends {MDCComponent<!MDCTextFieldFoundation>}
 * @final
 */

var textfield_MDCTextField = function (_MDCComponent) {
  textfield__inherits(MDCTextField, _MDCComponent);

  /**
   * @param {...?} args
   */
  function MDCTextField() {
    textfield__classCallCheck(this, MDCTextField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {?Element} */
    var _this = textfield__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.input_;
    /** @type {?MDCRipple} */
    _this.ripple;
    /** @private {?MDCLineRipple} */
    _this.lineRipple_;
    /** @private {?MDCTextFieldHelperText} */
    _this.helperText_;
    /** @private {?MDCTextFieldIcon} */
    _this.icon_;
    /** @private {?MDCFloatingLabel} */
    _this.label_;
    /** @private {?MDCNotchedOutline} */
    _this.outline_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextField}
   */


  MDCTextField.attachTo = function attachTo(root) {
    return new MDCTextField(root);
  };

  /**
   * @param {(function(!Element): !MDCRipple)=} rippleFactory A function which
   * creates a new MDCRipple.
   * @param {(function(!Element): !MDCLineRipple)=} lineRippleFactory A function which
   * creates a new MDCLineRipple.
   * @param {(function(!Element): !MDCTextFieldHelperText)=} helperTextFactory A function which
   * creates a new MDCTextFieldHelperText.
   * @param {(function(!Element): !MDCTextFieldIcon)=} iconFactory A function which
   * creates a new MDCTextFieldIcon.
   * @param {(function(!Element): !MDCFloatingLabel)=} labelFactory A function which
   * creates a new MDCFloatingLabel.
   * @param {(function(!Element): !MDCNotchedOutline)=} outlineFactory A function which
   * creates a new MDCNotchedOutline.
   */


  MDCTextField.prototype.initialize = function initialize() {
    var rippleFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el, foundation) {
      return new ripple["MDCRipple"](el, foundation);
    };
    var lineRippleFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
      return new line_ripple_MDCLineRipple(el);
    };
    var helperTextFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (el) {
      return new helper_text_MDCTextFieldHelperText(el);
    };
    var iconFactory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (el) {
      return new icon_MDCTextFieldIcon(el);
    };

    var _this2 = this;

    var labelFactory = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (el) {
      return new floating_label_MDCFloatingLabel(el);
    };
    var outlineFactory = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function (el) {
      return new notched_outline_MDCNotchedOutline(el);
    };

    this.input_ = this.root_.querySelector(strings.INPUT_SELECTOR);
    var labelElement = this.root_.querySelector(strings.LABEL_SELECTOR);
    if (labelElement) {
      this.label_ = labelFactory(labelElement);
    }
    var lineRippleElement = this.root_.querySelector(strings.LINE_RIPPLE_SELECTOR);
    if (lineRippleElement) {
      this.lineRipple_ = lineRippleFactory(lineRippleElement);
    }
    var outlineElement = this.root_.querySelector(strings.OUTLINE_SELECTOR);
    if (outlineElement) {
      this.outline_ = outlineFactory(outlineElement);
    }
    if (this.input_.hasAttribute(strings.ARIA_CONTROLS)) {
      var helperTextElement = document.getElementById(this.input_.getAttribute(strings.ARIA_CONTROLS));
      if (helperTextElement) {
        this.helperText_ = helperTextFactory(helperTextElement);
      }
    }
    var iconElement = this.root_.querySelector(strings.ICON_SELECTOR);
    if (iconElement) {
      this.icon_ = iconFactory(iconElement);
    }

    this.ripple = null;
    if (!this.root_.classList.contains(cssClasses.TEXTAREA) && !this.root_.classList.contains(cssClasses.OUTLINED)) {
      var MATCHES = Object(util["getMatchesProperty"])(HTMLElement.prototype);
      var adapter = textfield__extends(ripple["MDCRipple"].createAdapter( /** @type {!RippleCapableSurface} */this), {
        isSurfaceActive: function isSurfaceActive() {
          return _this2.input_[MATCHES](':active');
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.input_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.input_.removeEventListener(type, handler);
        }
      });
      var foundation = new ripple["MDCRippleFoundation"](adapter);
      this.ripple = rippleFactory(this.root_, foundation);
    }
  };

  MDCTextField.prototype.destroy = function destroy() {
    if (this.ripple) {
      this.ripple.destroy();
    }
    if (this.lineRipple_) {
      this.lineRipple_.destroy();
    }
    if (this.helperText_) {
      this.helperText_.destroy();
    }
    if (this.icon_) {
      this.icon_.destroy();
    }
    if (this.label_) {
      this.label_.destroy();
    }
    if (this.outline_) {
      this.outline_.destroy();
    }
    _MDCComponent.prototype.destroy.call(this);
  };

  /**
   * Initiliazes the Text Field's internal state based on the environment's
   * state.
   */


  MDCTextField.prototype.initialSyncWithDom = function initialSyncWithDom() {
    this.disabled = this.input_.disabled;
  };

  /**
   * @return {string} The value of the input.
   */


  /**
   * Recomputes the outline SVG path for the outline element.
   */
  MDCTextField.prototype.layout = function layout() {
    var openNotch = this.foundation_.shouldFloat;
    this.foundation_.notchOutline(openNotch);
  };

  /**
   * @return {!MDCTextFieldFoundation}
   */


  MDCTextField.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this3 = this;

    return new textfield_foundation(
    /** @type {!MDCTextFieldAdapter} */textfield__extends({
      addClass: function addClass(className) {
        return _this3.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this3.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this3.root_.classList.contains(className);
      },
      registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
        return _this3.root_.addEventListener(evtType, handler);
      },
      deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
        return _this3.root_.removeEventListener(evtType, handler);
      },
      registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
        var getAttributesList = function getAttributesList(mutationsList) {
          return mutationsList.map(function (mutation) {
            return mutation.attributeName;
          });
        };
        var observer = new MutationObserver(function (mutationsList) {
          return handler(getAttributesList(mutationsList));
        });
        var targetNode = _this3.root_.querySelector(strings.INPUT_SELECTOR);
        var config = { attributes: true };
        observer.observe(targetNode, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
        return observer.disconnect();
      },
      isFocused: function isFocused() {
        return document.activeElement === _this3.root_.querySelector(strings.INPUT_SELECTOR);
      },
      isRtl: function isRtl() {
        return window.getComputedStyle(_this3.root_).getPropertyValue('direction') === 'rtl';
      }
    }, this.getInputAdapterMethods_(), this.getLabelAdapterMethods_(), this.getLineRippleAdapterMethods_(), this.getOutlineAdapterMethods_()), this.getFoundationMap_());
  };

  /**
   * @return {!{
   *   shakeLabel: function(boolean): undefined,
   *   floatLabel: function(boolean): undefined,
   *   hasLabel: function(): boolean,
   *   getLabelWidth: function(): number,
   * }}
   */


  MDCTextField.prototype.getLabelAdapterMethods_ = function getLabelAdapterMethods_() {
    var _this4 = this;

    return {
      shakeLabel: function shakeLabel(shouldShake) {
        return _this4.label_.shake(shouldShake);
      },
      floatLabel: function floatLabel(shouldFloat) {
        return _this4.label_.float(shouldFloat);
      },
      hasLabel: function hasLabel() {
        return !!_this4.label_;
      },
      getLabelWidth: function getLabelWidth() {
        return _this4.label_.getWidth();
      }
    };
  };

  /**
   * @return {!{
   *   activateLineRipple: function(): undefined,
   *   deactivateLineRipple: function(): undefined,
   *   setLineRippleTransformOrigin: function(number): undefined,
   * }}
   */


  MDCTextField.prototype.getLineRippleAdapterMethods_ = function getLineRippleAdapterMethods_() {
    var _this5 = this;

    return {
      activateLineRipple: function activateLineRipple() {
        if (_this5.lineRipple_) {
          _this5.lineRipple_.activate();
        }
      },
      deactivateLineRipple: function deactivateLineRipple() {
        if (_this5.lineRipple_) {
          _this5.lineRipple_.deactivate();
        }
      },
      setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
        if (_this5.lineRipple_) {
          _this5.lineRipple_.setRippleCenter(normalizedX);
        }
      }
    };
  };

  /**
   * @return {!{
   *   notchOutline: function(number, boolean): undefined,
   *   hasOutline: function(): boolean,
   * }}
   */


  MDCTextField.prototype.getOutlineAdapterMethods_ = function getOutlineAdapterMethods_() {
    var _this6 = this;

    return {
      notchOutline: function notchOutline(labelWidth, isRtl) {
        return _this6.outline_.notch(labelWidth, isRtl);
      },
      closeOutline: function closeOutline() {
        return _this6.outline_.closeNotch();
      },
      hasOutline: function hasOutline() {
        return !!_this6.outline_;
      }
    };
  };

  /**
   * @return {!{
   *   registerInputInteractionHandler: function(string, function()): undefined,
   *   deregisterInputInteractionHandler: function(string, function()): undefined,
   *   getNativeInput: function(): ?Element,
   * }}
   */


  MDCTextField.prototype.getInputAdapterMethods_ = function getInputAdapterMethods_() {
    var _this7 = this;

    return {
      registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
        return _this7.input_.addEventListener(evtType, handler);
      },
      deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
        return _this7.input_.removeEventListener(evtType, handler);
      },
      getNativeInput: function getNativeInput() {
        return _this7.input_;
      }
    };
  };

  /**
   * Returns a map of all subcomponents to subfoundations.
   * @return {!FoundationMapType}
   */


  MDCTextField.prototype.getFoundationMap_ = function getFoundationMap_() {
    return {
      helperText: this.helperText_ ? this.helperText_.foundation : undefined,
      icon: this.icon_ ? this.icon_.foundation : undefined
    };
  };

  textfield__createClass(MDCTextField, [{
    key: 'value',
    get: function get() {
      return this.foundation_.getValue();
    }

    /**
     * @param {string} value The value to set on the input.
     */
    ,
    set: function set(value) {
      this.foundation_.setValue(value);
    }

    /**
     * @return {boolean} True if the Text Field is disabled.
     */

  }, {
    key: 'disabled',
    get: function get() {
      return this.foundation_.isDisabled();
    }

    /**
     * @param {boolean} disabled Sets the Text Field disabled or enabled.
     */
    ,
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    }

    /**
     * @return {boolean} valid True if the Text Field is valid.
     */

  }, {
    key: 'valid',
    get: function get() {
      return this.foundation_.isValid();
    }

    /**
     * @param {boolean} valid Sets the Text Field valid or invalid.
     */
    ,
    set: function set(valid) {
      this.foundation_.setValid(valid);
    }

    /**
     * @return {boolean} True if the Text Field is required.
     */

  }, {
    key: 'required',
    get: function get() {
      return this.input_.required;
    }

    /**
     * @param {boolean} required Sets the Text Field to required.
     */
    ,
    set: function set(required) {
      this.input_.required = required;
    }

    /**
     * @return {string} The input element's validation pattern.
     */

  }, {
    key: 'pattern',
    get: function get() {
      return this.input_.pattern;
    }

    /**
     * @param {string} pattern Sets the input element's validation pattern.
     */
    ,
    set: function set(pattern) {
      this.input_.pattern = pattern;
    }

    /**
     * @return {number} The input element's minLength.
     */

  }, {
    key: 'minLength',
    get: function get() {
      return this.input_.minLength;
    }

    /**
     * @param {number} minLength Sets the input element's minLength.
     */
    ,
    set: function set(minLength) {
      this.input_.minLength = minLength;
    }

    /**
     * @return {number} The input element's maxLength.
     */

  }, {
    key: 'maxLength',
    get: function get() {
      return this.input_.maxLength;
    }

    /**
     * @param {number} maxLength Sets the input element's maxLength.
     */
    ,
    set: function set(maxLength) {
      // Chrome throws exception if maxLength is set < 0
      if (maxLength < 0) {
        this.input_.removeAttribute('maxLength');
      } else {
        this.input_.maxLength = maxLength;
      }
    }

    /**
     * @return {string} The input element's min.
     */

  }, {
    key: 'min',
    get: function get() {
      return this.input_.min;
    }

    /**
     * @param {string} min Sets the input element's min.
     */
    ,
    set: function set(min) {
      this.input_.min = min;
    }

    /**
     * @return {string} The input element's max.
     */

  }, {
    key: 'max',
    get: function get() {
      return this.input_.max;
    }

    /**
     * @param {string} max Sets the input element's max.
     */
    ,
    set: function set(max) {
      this.input_.max = max;
    }

    /**
     * @return {string} The input element's step.
     */

  }, {
    key: 'step',
    get: function get() {
      return this.input_.step;
    }

    /**
     * @param {string} step Sets the input element's step.
     */
    ,
    set: function set(step) {
      this.input_.step = step;
    }

    /**
     * Sets the helper text element content.
     * @param {string} content
     */

  }, {
    key: 'helperTextContent',
    set: function set(content) {
      this.foundation_.setHelperTextContent(content);
    }

    /**
     * Sets the aria label of the icon.
     * @param {string} label
     */

  }, {
    key: 'iconAriaLabel',
    set: function set(label) {
      this.foundation_.setIconAriaLabel(label);
    }

    /**
     * Sets the text content of the icon.
     * @param {string} content
     */

  }, {
    key: 'iconContent',
    set: function set(content) {
      this.foundation_.setIconContent(content);
    }

    /**
     * Enables or disables the use of native validation. Use this for custom validation.
     * @param {boolean} useNativeValidation Set this to false to ignore native input validation.
     */

  }, {
    key: 'useNativeValidation',
    set: function set(useNativeValidation) {
      this.foundation_.setUseNativeValidation(useNativeValidation);
    }
  }]);

  return MDCTextField;
}(component["a" /* default */]);



/***/ }),

/***/ "Vy1O":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "X8jb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "XgVs":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "XrM9":
/***/ (function(module, exports) {

module.exports = function (subject) {
  validateSubject(subject);

  var eventsStorage = createEventsStorage(subject);
  subject.on = eventsStorage.on;
  subject.off = eventsStorage.off;
  subject.fire = eventsStorage.fire;
  return subject;
};

function createEventsStorage(subject) {
  // Store all event listeners to this hash. Key is event name, value is array
  // of callback records.
  //
  // A callback record consists of callback function and its optional context:
  // { 'eventName' => [{callback: function, ctx: object}] }
  var registeredEvents = Object.create(null);

  return {
    on: function on(eventName, callback, ctx) {
      if (typeof callback !== 'function') {
        throw new Error('callback is expected to be a function');
      }
      var handlers = registeredEvents[eventName];
      if (!handlers) {
        handlers = registeredEvents[eventName] = [];
      }
      handlers.push({ callback: callback, ctx: ctx });

      return subject;
    },

    off: function off(eventName, callback) {
      var wantToRemoveAll = typeof eventName === 'undefined';
      if (wantToRemoveAll) {
        // Killing old events storage should be enough in this case:
        registeredEvents = Object.create(null);
        return subject;
      }

      if (registeredEvents[eventName]) {
        var deleteAllCallbacksForEvent = typeof callback !== 'function';
        if (deleteAllCallbacksForEvent) {
          delete registeredEvents[eventName];
        } else {
          var callbacks = registeredEvents[eventName];
          for (var i = 0; i < callbacks.length; ++i) {
            if (callbacks[i].callback === callback) {
              callbacks.splice(i, 1);
            }
          }
        }
      }

      return subject;
    },

    fire: function fire(eventName) {
      var callbacks = registeredEvents[eventName];
      if (!callbacks) {
        return subject;
      }

      var fireArguments;
      if (arguments.length > 1) {
        fireArguments = Array.prototype.splice.call(arguments, 1);
      }
      for (var i = 0; i < callbacks.length; ++i) {
        var callbackInfo = callbacks[i];
        callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
      }

      return subject;
    }
  };
}

function validateSubject(subject) {
  if (!subject) {
    throw new Error('Eventify cannot use falsy object as events subject');
  }
  var reservedWords = ['on', 'fire', 'off'];
  for (var i = 0; i < reservedWords.length; ++i) {
    if (subject.hasOwnProperty(reservedWords[i])) {
      throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
    }
  }
}

/***/ }),

/***/ "YdsM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd","logo":"logo__1yT4h","timmer__block":"timmer__block__3Lkyx","timmer":"timmer__19wV6","timmer__text":"timmer__text__APxVL","timmer__text__mobile":"timmer__text__mobile__17drt","cardHeader":"cardHeader__2Vd1U","cardBody":"cardBody__fYYFu"};

/***/ }),

/***/ "ZeD7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),

/***/ "a2Uu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "aS8y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("3bIi");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "aqQ4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "b9XL":
/***/ (function(module, exports) {

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "bRJm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");
var settle = __webpack_require__("aS8y");
var buildURL = __webpack_require__("H6Qo");
var http = __webpack_require__("gHkb");
var https = __webpack_require__("XgVs");
var httpFollow = __webpack_require__("3JCP").http;
var httpsFollow = __webpack_require__("3JCP").https;
var url = __webpack_require__("Vy1O");
var zlib = __webpack_require__("epkN");
var pkg = __webpack_require__("kHha");
var createError = __webpack_require__("3bIi");
var enhanceError = __webpack_require__("YdsM");

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;
    var timer;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = new Buffer(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = new Buffer(data, 'utf-8');
      } else {
        return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttps = protocol === 'https:';
    var agent = isHttps ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method,
      headers: headers,
      agent: agent,
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        proxy = {
          host: parsedProxyUrl.hostname,
          port: parsedProxyUrl.port
        };

        if (parsedProxyUrl.auth) {
          var proxyUrlAuth = parsedProxyUrl.auth.split(':');
          proxy.auth = {
            username: proxyUrlAuth[0],
            password: proxyUrlAuth[1]
          };
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttps ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttps ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
          // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString('utf8');
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};

/***/ }),

/***/ "d4H2":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("AkAO");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "dZBD":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nUiQ");

/***/ }),

/***/ "dn2M":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "epkN":
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),

/***/ "fF25":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "fHKL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TopAppBar = exports.TopAppBarTitle = exports.TopAppBarIcon = exports.TopAppBarSection = exports.TopAppBarRow = void 0;

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _typeof2 = _interopRequireDefault(__webpack_require__("b9XL"));

var _topAppBar = __webpack_require__("NFzA");

var _bindDecorator = __webpack_require__("gKs0");

var _preact = __webpack_require__("KM04");

var _MaterialComponent6 = _interopRequireDefault(__webpack_require__("uc5p"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TopAppBarRow =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(TopAppBarRow, _MaterialComponent);

  function TopAppBarRow() {
    var _this;

    (0, _classCallCheck2.default)(this, TopAppBarRow);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarRow).apply(this, arguments));
    _this.componentName = 'top-app-bar__row';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(TopAppBarRow, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", _extends({}, props), this.props.children);
    }
  }]);
  return TopAppBarRow;
}(_MaterialComponent6.default);

exports.TopAppBarRow = TopAppBarRow;

var TopAppBarSection =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(TopAppBarSection, _MaterialComponent2);

  function TopAppBarSection() {
    var _this2;

    (0, _classCallCheck2.default)(this, TopAppBarSection);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarSection).apply(this, arguments));
    _this2.componentName = 'top-app-bar__section';
    _this2.mdcProps = ['align-start', 'align-end'];
    return _this2;
  }

  (0, _createClass2.default)(TopAppBarSection, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("section", _extends({}, props), props.children);
    }
  }]);
  return TopAppBarSection;
}(_MaterialComponent6.default);

exports.TopAppBarSection = TopAppBarSection;

var TopAppBarIcon =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(TopAppBarIcon, _MaterialComponent3);

  function TopAppBarIcon() {
    var _this3;

    (0, _classCallCheck2.default)(this, TopAppBarIcon);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarIcon).apply(this, arguments));
    _this3.componentName = 'top-app-bar__icon';
    _this3.mdcProps = [];
    return _this3;
  }

  (0, _createClass2.default)(TopAppBarIcon, [{
    key: "materialDom",
    value: function materialDom(props) {
      var className = props.navigation ? 'material-icons mdc-top-app-bar__navigation-icon' : 'material-icons';
      return (0, _preact.h)("a", _extends({
        className: className
      }, props), props.children);
    }
  }]);
  return TopAppBarIcon;
}(_MaterialComponent6.default);

exports.TopAppBarIcon = TopAppBarIcon;

var TopAppBarTitle =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(TopAppBarTitle, _MaterialComponent4);

  function TopAppBarTitle() {
    var _this4;

    (0, _classCallCheck2.default)(this, TopAppBarTitle);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarTitle).apply(this, arguments));
    _this4.componentName = 'top-app-bar__title';
    _this4.mdcProps = [];
    return _this4;
  }

  (0, _createClass2.default)(TopAppBarTitle, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("span", _extends({}, props), props.children);
    }
  }]);
  return TopAppBarTitle;
}(_MaterialComponent6.default);

exports.TopAppBarTitle = TopAppBarTitle;

var TopAppBar =
/*#__PURE__*/
function (_MaterialComponent5) {
  (0, _inherits2.default)(TopAppBar, _MaterialComponent5);

  function TopAppBar() {
    var _this5;

    (0, _classCallCheck2.default)(this, TopAppBar);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBar).apply(this, arguments));
    _this5.componentName = 'top-app-bar';
    _this5.mdcProps = ['short', 'short-collapsed', 'fixed', 'prominent'];
    return _this5;
  }

  (0, _createClass2.default)(TopAppBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TopAppBar.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        var comp = new _topAppBar.MDCTopAppBar(this.control);
        comp.listen('MDCTopAppBar:nav', this.onNav);
        this.MDComponent = comp;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TopAppBar.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.unlisten('MDCTopAppBar:nav', this.onNav);
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "onNav",
    value: function onNav(e) {
      if (this.props.onNav) {
        this.props.onNav(e);
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("header", _extends({
        ref: this.setControlRef
      }, props), props.children);
    }
  }]);
  return TopAppBar;
}(_MaterialComponent6.default);

exports.TopAppBar = TopAppBar;

__decorate([_bindDecorator.bind], TopAppBar.prototype, "onNav", null);

var default_1 =
/*#__PURE__*/
function (_TopAppBar) {
  (0, _inherits2.default)(default_1, _TopAppBar);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(TopAppBar);

exports.default = default_1;
default_1.Section = TopAppBarSection;
default_1.Icon = TopAppBarIcon;
default_1.Title = TopAppBarTitle;
default_1.Row = TopAppBarRow;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "gHkb":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "gKs0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var constants;
(function (constants) {
    constants.typeOfFunction = 'function';
    constants.boolTrue = true;
})(constants || (constants = {}));
function bind(target, propertyKey, descriptor) {
    if (!descriptor || typeof descriptor.value !== constants.typeOfFunction) {
        throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
    }
    return {
        configurable: constants.boolTrue,
        get: function get() {
            var bound = descriptor.value.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: constants.boolTrue,
                writable: constants.boolTrue
            });
            return bound;
        }
    };
}
exports.bind = bind;
exports.default = bind;

/***/ }),

/***/ "iqt6":
/***/ (function(module, exports, __webpack_require__) {

var BezierEasing = __webpack_require__("kHgp");

// Predefined set of animations. Similar to CSS easing functions
var animations = {
  ease: BezierEasing(0.25, 0.1, 0.25, 1),
  easeIn: BezierEasing(0.42, 0, 1, 1),
  easeOut: BezierEasing(0, 0, 0.58, 1),
  easeInOut: BezierEasing(0.42, 0, 0.58, 1),
  linear: BezierEasing(0, 0, 1, 1)
};

module.exports = animate;
module.exports.makeAggregateRaf = makeAggregateRaf;
module.exports.sharedScheduler = makeAggregateRaf();

function animate(source, target, options) {
  var start = Object.create(null);
  var diff = Object.create(null);
  options = options || {};
  // We let clients specify their own easing function
  var easing = typeof options.easing === 'function' ? options.easing : animations[options.easing];

  // if nothing is specified, default to ease (similar to CSS animations)
  if (!easing) {
    if (options.easing) {
      console.warn('Unknown easing function in amator: ' + options.easing);
    }
    easing = animations.ease;
  }

  var step = typeof options.step === 'function' ? options.step : noop;
  var done = typeof options.done === 'function' ? options.done : noop;

  var scheduler = getScheduler(options.scheduler);

  var keys = Object.keys(target);
  keys.forEach(function (key) {
    start[key] = source[key];
    diff[key] = target[key] - source[key];
  });

  var durationInMs = typeof options.duration === 'number' ? options.duration : 400;
  var durationInFrames = Math.max(1, durationInMs * 0.06); // 0.06 because 60 frames pers 1,000 ms
  var previousAnimationId;
  var frame = 0;

  previousAnimationId = scheduler.next(loop);

  return {
    cancel: cancel
  };

  function cancel() {
    scheduler.cancel(previousAnimationId);
    previousAnimationId = 0;
  }

  function loop() {
    var t = easing(frame / durationInFrames);
    frame += 1;
    setValues(t);
    if (frame <= durationInFrames) {
      previousAnimationId = scheduler.next(loop);
      step(source);
    } else {
      previousAnimationId = 0;
      setTimeout(function () {
        done(source);
      }, 0);
    }
  }

  function setValues(t) {
    keys.forEach(function (key) {
      source[key] = diff[key] * t + start[key];
    });
  }
}

function noop() {}

function getScheduler(scheduler) {
  if (!scheduler) {
    var canRaf = typeof window !== 'undefined' && window.requestAnimationFrame;
    return canRaf ? rafScheduler() : timeoutScheduler();
  }
  if (typeof scheduler.next !== 'function') throw new Error('Scheduler is supposed to have next(cb) function');
  if (typeof scheduler.cancel !== 'function') throw new Error('Scheduler is supposed to have cancel(handle) function');

  return scheduler;
}

function rafScheduler() {
  return {
    next: window.requestAnimationFrame.bind(window),
    cancel: window.cancelAnimationFrame.bind(window)
  };
}

function timeoutScheduler() {
  return {
    next: function next(cb) {
      return setTimeout(cb, 1000 / 60);
    },
    cancel: function cancel(id) {
      return clearTimeout(id);
    }
  };
}

function makeAggregateRaf() {
  var frontBuffer = new Set();
  var backBuffer = new Set();
  var frameToken = 0;

  return {
    next: next,
    cancel: next,
    clearAll: clearAll
  };

  function clearAll() {
    frontBuffer.clear();
    backBuffer.clear();
    cancelAnimationFrame(frameToken);
    frameToken = 0;
  }

  function next(callback) {
    backBuffer.add(callback);
    renderNextFrame();
  }

  function renderNextFrame() {
    if (!frameToken) frameToken = requestAnimationFrame(renderFrame);
  }

  function renderFrame() {
    frameToken = 0;

    var t = backBuffer;
    backBuffer = frontBuffer;
    frontBuffer = t;

    frontBuffer.forEach(function (callback) {
      callback();
    });
    frontBuffer.clear();
  }

  function cancel(callback) {
    backBuffer.delete(callback);
  }
}

/***/ }),

/***/ "jcLW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }return _typeof(obj);
}

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__("Kest")(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),

/***/ "joOv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsCssVariables", function() { return supportsCssVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPassive", function() { return applyPassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchesProperty", function() { return getMatchesProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizedEventCoords", function() { return getNormalizedEventCoords; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
var supportsCssVariables_ = void 0;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var supportsCssVariables = supportsCssVariables_;
  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }
  return supportsCssVariables;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}



/***/ }),

/***/ "kHgp":
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A(aA1, aA2) {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}
function B(aA1, aA2) {
  return 3.0 * aA2 - 6.0 * aA1;
}
function C(aA1) {
  return 3.0 * aA1;
}

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope(aT, aA1, aA2) {
  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
}

function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX,
      currentT,
      i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0.0) {
      return aGuessT;
    }
    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}

function LinearEasing(x) {
  return x;
}

module.exports = function bezier(mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX(aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing(x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};

/***/ }),

/***/ "kHha":
/***/ (function(module, exports) {

module.exports = {"_from":"axios","_id":"axios@0.18.0","_inBundle":false,"_integrity":"sha1-MtU+SFHv3AoRmTts0AB4nXDAUQI=","_location":"/axios","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"axios","name":"axios","escapedName":"axios","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.18.0.tgz","_shasum":"32d53e4851efdc0a11993b6cd000789d70c05102","_spec":"axios","_where":"/home/lettell/Code/hjobs/fevote4art","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.3.0","is-buffer":"^1.1.5"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.5.7","coveralls":"^2.11.9","es6-promise":"^4.0.5","grunt":"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","sinon":"^1.17.4","typescript":"^2.0.3","url-search-params":"^0.6.1","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","version":"0.18.0"}

/***/ }),

/***/ "koiw":
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__("mbYX");
var isArguments = __webpack_require__("OWwF");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

/***/ }),

/***/ "kpeq":
/***/ (function(module, exports) {

/**
 * This module unifies handling of mouse whee event across different browsers
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fwheel
 * for more details
 *
 * Usage:
 *  var addWheelListener = require('wheel').addWheelListener;
 *  var removeWheelListener = require('wheel').removeWheelListener;
 *  addWheelListener(domElement, function (e) {
 *    // mouse wheel event
 *  });
 *  removeWheelListener(domElement, function);
 */
// by default we shortcut to 'addEventListener':

module.exports = addWheelListener;

// But also expose "advanced" api with unsubscribe:
module.exports.addWheelListener = addWheelListener;
module.exports.removeWheelListener = removeWheelListener;

var prefix = "",
    _addEventListener,
    _removeEventListener,
    support;

detectEventModel(typeof window !== 'undefined' && window, typeof document !== 'undefined' && document);

function addWheelListener(elem, callback, useCapture) {
  _addWheelListener(elem, support, callback, useCapture);

  // handle MozMousePixelScroll in older Firefox
  if (support == "DOMMouseScroll") {
    _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
  }
}

function removeWheelListener(elem, callback, useCapture) {
  _removeWheelListener(elem, support, callback, useCapture);

  // handle MozMousePixelScroll in older Firefox
  if (support == "DOMMouseScroll") {
    _removeWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
  }
}

// TODO: in theory this anonymous function may result in incorrect
// unsubscription in some browsers. But in practice, I don't think we should
// worry too much about it (those browsers are on the way out)
function _addWheelListener(elem, eventName, callback, useCapture) {
  elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
    !originalEvent && (originalEvent = window.event);

    // create a normalized event object
    var event = {
      // keep a ref to the original event object
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: "wheel",
      deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
      deltaX: 0,
      deltaY: 0,
      deltaZ: 0,
      clientX: originalEvent.clientX,
      clientY: originalEvent.clientY,
      preventDefault: function preventDefault() {
        originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
      },
      stopPropagation: function stopPropagation() {
        if (originalEvent.stopPropagation) originalEvent.stopPropagation();
      },
      stopImmediatePropagation: function stopImmediatePropagation() {
        if (originalEvent.stopImmediatePropagation) originalEvent.stopImmediatePropagation();
      }
    };

    // calculate deltaY (and deltaX) according to the event
    if (support == "mousewheel") {
      event.deltaY = -1 / 40 * originalEvent.wheelDelta;
      // Webkit also support wheelDeltaX
      originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
    } else {
      event.deltaY = originalEvent.detail;
    }

    // it's time to fire the callback
    return callback(event);
  }, useCapture || false);
}

function _removeWheelListener(elem, eventName, callback, useCapture) {
  elem[_removeEventListener](prefix + eventName, callback, useCapture || false);
}

function detectEventModel(window, document) {
  if (window && window.addEventListener) {
    _addEventListener = "addEventListener";
    _removeEventListener = "removeEventListener";
  } else {
    _addEventListener = "attachEvent";
    _removeEventListener = "detachEvent";
    prefix = "on";
  }

  if (document) {
    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
  } else {
    support = "wheel";
  }
}

/***/ }),

/***/ "mI+K":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),

/***/ "mbYX":
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}

/***/ }),

/***/ "mmkS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error();
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
  // initialize result and counter
  var block, charCode, idx = 0, map = chars;
  // if the next str index does not exist:
  //   change the mapping table to "="
  //   check if d has no fractional digits
  str.charAt(idx | 0) || (map = '=', idx % 1);
  // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

/***/ }),

/***/ "nQ/l":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__("vkNc");

// CONCATENATED MODULE: ../node_modules/@material/selection-control/index.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @typedef {{
 *   checked: boolean,
 *   indeterminate: boolean,
 *   disabled: boolean,
 *   value: ?string
 * }}
 */
var MDCSelectionControlState = void 0;

/**
 * @record
 */

var MDCSelectionControl = function () {
  function MDCSelectionControl() {
    _classCallCheck(this, MDCSelectionControl);
  }

  _createClass(MDCSelectionControl, [{
    key: 'ripple',

    /** @return {?MDCRipple} */
    get: function get() {}
  }]);

  return MDCSelectionControl;
}();


// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var base_foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/switch/adapter.js
function adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Switch. Provides an interface for managing
 * - classes
 * - dom
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCSwitchAdapter = function () {
  function MDCSwitchAdapter() {
    adapter__classCallCheck(this, MDCSwitchAdapter);
  }

  /** @param {string} className */
  MDCSwitchAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCSwitchAdapter.prototype.removeClass = function removeClass(className) {};

  /** @param {boolean} checked */


  MDCSwitchAdapter.prototype.setNativeControlChecked = function setNativeControlChecked(checked) {};

  /** @param {boolean} disabled */


  MDCSwitchAdapter.prototype.setNativeControlDisabled = function setNativeControlDisabled(disabled) {};

  return MDCSwitchAdapter;
}();

/* harmony default export */ var switch_adapter = (MDCSwitchAdapter);
// CONCATENATED MODULE: ../node_modules/@material/switch/constants.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
var cssClasses = {
  CHECKED: 'mdc-switch--checked',
  DISABLED: 'mdc-switch--disabled'
};

/** @enum {string} */
var strings = {
  NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',
  RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay'
};


// CONCATENATED MODULE: ../node_modules/@material/switch/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/* eslint-enable no-unused-vars */


/**
 * @extends {MDCFoundation<!MDCSwitchAdapter>}
 */

var foundation_MDCSwitchFoundation = function (_MDCFoundation) {
  _inherits(MDCSwitchFoundation, _MDCFoundation);

  foundation__createClass(MDCSwitchFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return strings;
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }

    /** @return {!MDCSwitchAdapter} */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCSwitchAdapter} */{
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          setNativeControlChecked: function setNativeControlChecked() /* checked: boolean */{},
          setNativeControlDisabled: function setNativeControlDisabled() /* disabled: boolean */{}
        }
      );
    }
  }]);

  function MDCSwitchFoundation(adapter) {
    foundation__classCallCheck(this, MDCSwitchFoundation);

    return _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCSwitchFoundation.defaultAdapter, adapter)));
  }

  /** @param {boolean} checked */


  MDCSwitchFoundation.prototype.setChecked = function setChecked(checked) {
    this.adapter_.setNativeControlChecked(checked);
    this.updateCheckedStyling_(checked);
  };

  /** @param {boolean} disabled */


  MDCSwitchFoundation.prototype.setDisabled = function setDisabled(disabled) {
    this.adapter_.setNativeControlDisabled(disabled);
    if (disabled) {
      this.adapter_.addClass(cssClasses.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses.DISABLED);
    }
  };

  /**
   * Handles the change event for the switch native control.
   * @param {!Event} evt
   */


  MDCSwitchFoundation.prototype.handleChange = function handleChange(evt) {
    this.updateCheckedStyling_(evt.target.checked);
  };

  /**
   * Updates the styling of the switch based on its checked state.
   * @param {boolean} checked
   * @private
   */


  MDCSwitchFoundation.prototype.updateCheckedStyling_ = function updateCheckedStyling_(checked) {
    if (checked) {
      this.adapter_.addClass(cssClasses.CHECKED);
    } else {
      this.adapter_.removeClass(cssClasses.CHECKED);
    }
  };

  return MDCSwitchFoundation;
}(base_foundation["a" /* default */]);

/* harmony default export */ var switch_foundation = (foundation_MDCSwitchFoundation);
// EXTERNAL MODULE: ../node_modules/@material/ripple/util.js
var util = __webpack_require__("joOv");

// CONCATENATED MODULE: ../node_modules/@material/switch/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCSwitch", function() { return switch_MDCSwitch; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCSwitchFoundation", function() { return switch_foundation; });
var switch__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var switch__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function switch__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function switch__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function switch__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */




/**
 * @extends MDCComponent<!MDCSwitchFoundation>
 * @implements {MDCSelectionControl}
 */

var switch_MDCSwitch = function (_MDCComponent) {
  switch__inherits(MDCSwitch, _MDCComponent);

  MDCSwitch.attachTo = function attachTo(root) {
    return new MDCSwitch(root);
  };

  function MDCSwitch() {
    switch__classCallCheck(this, MDCSwitch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {!MDCRipple} */
    var _this = switch__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.ripple_ = _this.initRipple_();

    /** @private {!Function} */
    _this.changeHandler_;
    return _this;
  }

  MDCSwitch.prototype.destroy = function destroy() {
    _MDCComponent.prototype.destroy.call(this);
    this.ripple_.destroy();
    this.nativeControl_.removeEventListener('change', this.changeHandler_);
  };

  MDCSwitch.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.changeHandler_ = this.foundation_.handleChange.bind(this.foundation_);
    this.nativeControl_.addEventListener('change', this.changeHandler_);

    // Sometimes the checked state of the input element is saved in the history.
    // The switch styling should match the checked state of the input element.
    // Do an initial sync between the native control and the foundation.
    this.checked = this.checked;
  };

  /**
   * Returns the state of the native control element, or null if the native control element is not present.
   * @return {?MDCSelectionControlState}
   * @private
   */


  /**
   * @return {!MDCRipple}
   * @private
   */
  MDCSwitch.prototype.initRipple_ = function initRipple_() {
    var _this2 = this;

    var RIPPLE_SURFACE_SELECTOR = switch_foundation.strings.RIPPLE_SURFACE_SELECTOR;

    var rippleSurface = /** @type {!Element} */this.root_.querySelector(RIPPLE_SURFACE_SELECTOR);

    var MATCHES = Object(util["getMatchesProperty"])(HTMLElement.prototype);
    var adapter = switch__extends(ripple["MDCRipple"].createAdapter(this), {
      isUnbounded: function isUnbounded() {
        return true;
      },
      isSurfaceActive: function isSurfaceActive() {
        return _this2.nativeControl_[MATCHES](':active');
      },
      addClass: function addClass(className) {
        return rippleSurface.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return rippleSurface.classList.remove(className);
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        return _this2.nativeControl_.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        return _this2.nativeControl_.removeEventListener(type, handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return rippleSurface.style.setProperty(varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return rippleSurface.getBoundingClientRect();
      }
    });
    var foundation = new ripple["MDCRippleFoundation"](adapter);
    return new ripple["MDCRipple"](this.root_, foundation);
  };

  /** @return {!MDCSwitchFoundation} */


  MDCSwitch.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this3 = this;

    return new switch_foundation({
      addClass: function addClass(className) {
        return _this3.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this3.root_.classList.remove(className);
      },
      setNativeControlChecked: function setNativeControlChecked(checked) {
        return _this3.nativeControl_.checked = checked;
      },
      setNativeControlDisabled: function setNativeControlDisabled(disabled) {
        return _this3.nativeControl_.disabled = disabled;
      }
    });
  };

  /** @return {!MDCRipple} */


  switch__createClass(MDCSwitch, [{
    key: 'nativeControl_',
    get: function get() {
      var NATIVE_CONTROL_SELECTOR = switch_foundation.strings.NATIVE_CONTROL_SELECTOR;

      var el = /** @type {?MDCSelectionControlState} */this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
      return el;
    }
  }, {
    key: 'ripple',
    get: function get() {
      return this.ripple_;
    }

    /** @return {boolean} */

  }, {
    key: 'checked',
    get: function get() {
      return this.nativeControl_.checked;
    }

    /** @param {boolean} checked */
    ,
    set: function set(checked) {
      this.foundation_.setChecked(checked);
    }

    /** @return {boolean} */

  }, {
    key: 'disabled',
    get: function get() {
      return this.nativeControl_.disabled;
    }

    /** @param {boolean} disabled */
    ,
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    }
  }]);

  return MDCSwitch;
}(component["a" /* default */]);



/***/ }),

/***/ "nUiQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");
var bind = __webpack_require__("ED/T");
var Axios = __webpack_require__("OvAf");
var defaults = __webpack_require__("BXyq");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("mI+K");
axios.CancelToken = __webpack_require__("tsWd");
axios.isCancel = __webpack_require__("V3+0");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("X8jb");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),

/***/ "prn+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"wrap__board":"wrap__board__3d7FD","board__scale":"board__scale__2TJlE","pixel":"pixel__2bIXC","pixel__center":"pixel__center__lBBDE","colors_controlls":"colors_controlls__3f0kp"};

/***/ }),

/***/ "q/Zl":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),

/***/ "qKn3":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rj2i":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sEh6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sJaT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = exports.CardMediaContent = exports.CardActionIcon = exports.CardActionButtons = exports.CardActionIcons = exports.CardActionButton = exports.CardMedia = exports.CardActions = void 0;

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _preact = __webpack_require__("KM04");

var _MaterialComponent6 = _interopRequireDefault(__webpack_require__("uc5p"));

var _Button2 = _interopRequireDefault(__webpack_require__("7/cg"));

var _Icon2 = _interopRequireDefault(__webpack_require__("MeGi"));

var CardActions =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(CardActions, _MaterialComponent);

  function CardActions() {
    var _this;

    (0, _classCallCheck2.default)(this, CardActions);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActions).apply(this, arguments));
    _this.componentName = 'card__actions';
    _this.mdcProps = ['full-bleed'];
    return _this;
  }

  (0, _createClass2.default)(CardActions, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", _extends({}, props), this.props.children);
    }
  }]);
  return CardActions;
}(_MaterialComponent6.default);

exports.CardActions = CardActions;

var CardMedia =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(CardMedia, _MaterialComponent2);

  function CardMedia() {
    var _this2;

    (0, _classCallCheck2.default)(this, CardMedia);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardMedia).apply(this, arguments));
    _this2.componentName = 'card__media';
    _this2.mdcProps = ['square', '16-9'];
    return _this2;
  }

  (0, _createClass2.default)(CardMedia, [{
    key: "materialDom",
    value: function materialDom(props) {
      if (props.sixteenByNine) {
        props.className = 'mdc-card__media--16-9';
      }

      return (0, _preact.h)("div", _extends({}, props), this.props.children);
    }
  }]);
  return CardMedia;
}(_MaterialComponent6.default);

exports.CardMedia = CardMedia;

var CardActionButton =
/*#__PURE__*/
function (_Button) {
  (0, _inherits2.default)(CardActionButton, _Button);

  function CardActionButton() {
    var _this3;

    (0, _classCallCheck2.default)(this, CardActionButton);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionButton).apply(this, arguments));
    _this3.componentName = 'card__action';
    _this3.mdcProps = [];
    return _this3;
  }

  (0, _createClass2.default)(CardActionButton, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("button", _extends({
        className: "mdc-button mdc-card__action--button"
      }, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return CardActionButton;
}(_Button2.default);

exports.CardActionButton = CardActionButton;

var CardActionIcons =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(CardActionIcons, _MaterialComponent3);

  function CardActionIcons() {
    var _this4;

    (0, _classCallCheck2.default)(this, CardActionIcons);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionIcons).apply(this, arguments));
    _this4.componentName = 'card__action-icons';
    _this4.mdcProps = [];
    return _this4;
  }

  (0, _createClass2.default)(CardActionIcons, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", _extends({}, props), this.props.children);
    }
  }]);
  return CardActionIcons;
}(_MaterialComponent6.default);

exports.CardActionIcons = CardActionIcons;

var CardActionButtons =
/*#__PURE__*/
function (_CardActionIcons) {
  (0, _inherits2.default)(CardActionButtons, _CardActionIcons);

  function CardActionButtons() {
    var _this5;

    (0, _classCallCheck2.default)(this, CardActionButtons);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionButtons).apply(this, arguments));
    _this5.componentName = 'card__action-buttons';
    return _this5;
  }

  return CardActionButtons;
}(CardActionIcons);

exports.CardActionButtons = CardActionButtons;

var CardActionIcon =
/*#__PURE__*/
function (_Icon) {
  (0, _inherits2.default)(CardActionIcon, _Icon);

  function CardActionIcon() {
    var _this6;

    (0, _classCallCheck2.default)(this, CardActionIcon);
    _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardActionIcon).apply(this, arguments));
    _this6.componentName = 'card__action';
    _this6.mdcProps = [];
    return _this6;
  }

  (0, _createClass2.default)(CardActionIcon, [{
    key: "materialDom",
    value: function materialDom(props) {
      if (props.className) {
        props.className += ' mdc-card__action--icon';
      } else {
        props.className = 'mdc-card__action--icon';
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(CardActionIcon.prototype), "materialDom", this).call(this, props);
    }
  }]);
  return CardActionIcon;
}(_Icon2.default);

exports.CardActionIcon = CardActionIcon;

var CardMediaContent =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(CardMediaContent, _MaterialComponent4);

  function CardMediaContent() {
    var _this7;

    (0, _classCallCheck2.default)(this, CardMediaContent);
    _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardMediaContent).apply(this, arguments));
    _this7.componentName = 'card__media-content';
    _this7.mdcProps = [];
    return _this7;
  }

  (0, _createClass2.default)(CardMediaContent, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", _extends({}, props), this.props.children);
    }
  }]);
  return CardMediaContent;
}(_MaterialComponent6.default);

exports.CardMediaContent = CardMediaContent;

var Card =
/*#__PURE__*/
function (_MaterialComponent5) {
  (0, _inherits2.default)(Card, _MaterialComponent5);

  function Card() {
    var _this8;

    (0, _classCallCheck2.default)(this, Card);
    _this8 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Card).apply(this, arguments));
    _this8.componentName = 'card';
    _this8.mdcProps = ['outlined'];
    return _this8;
  }

  (0, _createClass2.default)(Card, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", _extends({}, props), this.props.children);
    }
  }]);
  return Card;
}(_MaterialComponent6.default);

exports.Card = Card;

var default_1 =
/*#__PURE__*/
function (_Card) {
  (0, _inherits2.default)(default_1, _Card);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(Card);

exports.default = default_1;
default_1.Actions = CardActions;
default_1.ActionButton = CardActionButton;
default_1.ActionIcons = CardActionIcons;
default_1.ActionIcon = CardActionIcon;
default_1.Media = CardMedia;
default_1.CardMediaContent = CardMediaContent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "tsWd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("mI+K");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "u+vq":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"logo":"logo__35n-0"};

/***/ }),

/***/ "uJAj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  MDCFoundation.prototype.init = function init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/* harmony default export */ __webpack_exports__["a"] = (MDCFoundation);

/***/ }),

/***/ "uc5p":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MaterialComponent = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _typeof2 = _interopRequireDefault(__webpack_require__("b9XL"));

var _ripple = __webpack_require__("vkNc");

var _bindDecorator = __webpack_require__("gKs0");

var _preact = __webpack_require__("KM04");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var doNotRemoveProps = ['disabled'];
/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

var MaterialComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MaterialComponent, _Component);

  function MaterialComponent() {
    (0, _classCallCheck2.default)(this, MaterialComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MaterialComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(MaterialComponent, [{
    key: "render",
    value: function render(props) {
      if (!this.classText) {
        this.classText = this.buildClassName(props);
      } // Fetch a VNode


      var componentProps = props;
      var userDefinedClasses = componentProps.className || componentProps.class || ''; // We delete class props and add them later in the final
      // step so every component does not need to handle user specified classes.

      if (componentProps.class) {
        delete componentProps.class;
      }

      if (componentProps.className) {
        delete componentProps.className;
      }

      var element = this.materialDom(componentProps);
      element.attributes = element.attributes || {};
      element.attributes.className = "".concat(userDefinedClasses, " ").concat(this.getClassName(element)).split(' ').filter(function (value, index, self) {
        return self.indexOf(value) === index && value !== '';
      }) // Unique + exclude empty class names
      .join(' '); // Clean this shit of proxy attributes

      this.mdcProps.forEach(function (prop) {
        // TODO: Fix this better
        if (prop in doNotRemoveProps) {
          return;
        }

        delete element.attributes[prop];
      });
      return element;
    }
    /** Attach the ripple effect */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.ripple && this.control) {
        this.ripple = new _ripple.MDCRipple(this.control);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.MDComponent && this.mdcNotifyProps) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.mdcNotifyProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            if (this.props[prop] !== nextProps[prop]) {
              this.MDComponent[prop] = nextProps[prop];
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.mdcProps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _prop = _step2.value;

          if (this.props[_prop] !== nextProps[_prop]) {
            this.classText = this.buildClassName(nextProps);
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.ripple) {
        this.ripple.destroy();
      }
    }
  }, {
    key: "afterComponentDidMount",
    value: function afterComponentDidMount() {
      if (this.MDComponent && this.mdcNotifyProps) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.mdcNotifyProps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var prop = _step3.value;
            this.MDComponent[prop] = this.props[prop];
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } // Shared setter for the root element ref

  }, {
    key: "setControlRef",
    value: function setControlRef(control) {
      this.control = control;
    }
    /** Build the className based on component names and mdc props */

  }, {
    key: "buildClassName",
    value: function buildClassName(props) {
      // Class name based on component name
      var classText = 'mdc-' + this.componentName; // Loop over mdcProps to turn them into classNames

      for (var propKey in props) {
        if (props.hasOwnProperty(propKey)) {
          var prop = props[propKey];

          if (typeof prop === 'boolean' && prop) {
            if (this.mdcProps.indexOf(propKey) !== -1) {
              classText += " mdc-".concat(this.componentName, "--").concat(propKey);
            }
          }
        }
      }

      return classText;
    }
    /** Returns the class name for element */

  }, {
    key: "getClassName",
    value: function getClassName(element) {
      if (!element) {
        return '';
      }

      var attrs = element.attributes = element.attributes || {};
      var classText = this.classText;

      if (attrs.class) {
        classText += ' ' + attrs.class;
      }

      if (attrs.className && attrs.className !== attrs.class) {
        classText += ' ' + attrs.className;
      }

      return classText;
    }
  }]);
  return MaterialComponent;
}(_preact.Component);

exports.MaterialComponent = MaterialComponent;

__decorate([_bindDecorator.bind], MaterialComponent.prototype, "setControlRef", null);

var _default = MaterialComponent;
exports.default = _default;
//# sourceMappingURL=MaterialComponent.js.map

/***/ }),

/***/ "uz6X":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");
var transformData = __webpack_require__("woEt");
var isCancel = __webpack_require__("V3+0");
var defaults = __webpack_require__("BXyq");
var isAbsoluteURL = __webpack_require__("7/2Y");
var combineURLs = __webpack_require__("a2Uu");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "vkNc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// CONCATENATED MODULE: ../node_modules/@material/ripple/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    _classCallCheck(this, MDCRippleAdapter);
  }

  /** @return {boolean} */
  MDCRippleAdapter.prototype.browserSupportsCssVars = function browserSupportsCssVars() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isUnbounded = function isUnbounded() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceActive = function isSurfaceActive() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceDisabled = function isSurfaceDisabled() {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.removeClass = function removeClass(className) {};

  /** @param {!EventTarget} target */


  MDCRippleAdapter.prototype.containsEventTarget = function containsEventTarget(target) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerDocumentInteractionHandler = function registerDocumentInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterDocumentInteractionHandler = function deregisterDocumentInteractionHandler(evtType, handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  MDCRippleAdapter.prototype.updateCssVariable = function updateCssVariable(varName, value) {};

  /** @return {!ClientRect} */


  MDCRippleAdapter.prototype.computeBoundingRect = function computeBoundingRect() {};

  /** @return {{x: number, y: number}} */


  MDCRippleAdapter.prototype.getWindowPageOffset = function getWindowPageOffset() {};

  return MDCRippleAdapter;
}();

/* harmony default export */ var adapter = (MDCRippleAdapter);
// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/ripple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
};


// EXTERNAL MODULE: ../node_modules/@material/ripple/util.js
var util = __webpack_require__("joOv");

// CONCATENATED MODULE: ../node_modules/@material/ripple/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






/**
 * @typedef {{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
var ActivationStateType = void 0;

/**
 * @typedef {{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
var ListenerInfoType = void 0;

/**
 * @typedef {{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
var ListenersType = void 0;

/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }}
 */
var PointType = void 0;

// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
var activatedTargets = [];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var foundation_MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  _createClass(MDCRippleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    foundation__classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    /** @private {function(!Event)} */
    _this.deactivateHandler_ = function (e) {
      return _this.deactivate_(e);
    };

    /** @private {function(?Event=)} */
    _this.focusHandler_ = function () {
      return _this.handleFocus();
    };

    /** @private {function(?Event=)} */
    _this.blurHandler_ = function () {
      return _this.handleBlur();
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    _this.previousActivationEvent_ = null;
    return _this;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  MDCRippleFoundation.prototype.supportsPressRipple_ = function supportsPressRipple_() {
    return this.adapter_.browserSupportsCssVars();
  };

  /**
   * @return {!ActivationStateType}
   */


  MDCRippleFoundation.prototype.defaultActivationState_ = function defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false
    };
  };

  /** @override */


  MDCRippleFoundation.prototype.init = function init() {
    var _this2 = this;

    var supportsPressRipple = this.supportsPressRipple_();

    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$.ROOT,
          UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

      requestAnimationFrame(function () {
        _this2.adapter_.addClass(ROOT);
        if (_this2.adapter_.isUnbounded()) {
          _this2.adapter_.addClass(UNBOUNDED);
          // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
          _this2.layoutInternal_();
        }
      });
    }
  };

  /** @override */


  MDCRippleFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$2.ROOT,
          UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

      requestAnimationFrame(function () {
        _this3.adapter_.removeClass(ROOT);
        _this3.adapter_.removeClass(UNBOUNDED);
        _this3.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };

  /**
   * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
   * @private
   */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function registerRootHandlers_(supportsPressRipple) {
    var _this4 = this;

    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
      });
      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  };

  /**
   * @param {!Event} e
   * @private
   */


  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function registerDeactivationHandlers_(e) {
    var _this5 = this;

    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
      });
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function deregisterRootHandlers_() {
    var _this6 = this;

    ACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function deregisterDeactivationHandlers_() {
    var _this7 = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.removeCssVars_ = function removeCssVars_() {
    var _this8 = this;

    var strings = MDCRippleFoundation.strings;

    Object.keys(strings).forEach(function (k) {
      if (k.indexOf('VAR_') === 0) {
        _this8.adapter_.updateCssVariable(strings[k], null);
      }
    });
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.activate_ = function activate_(e) {
    var _this9 = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

    var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this9.adapter_.containsEventTarget(target);
    });
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push( /** @type {!EventTarget} */e.target);
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          _this9.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this9.activationState_ = _this9.defaultActivationState_();
      }
    });
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.checkElementMadeActive_ = function checkElementMadeActive_(e) {
    return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function activate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.activate_(event);
  };

  /** @private */


  MDCRippleFoundation.prototype.animateActivation_ = function animateActivation_() {
    var _this10 = this;

    var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
    var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
        FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


    this.layoutInternal_();

    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
          startPoint = _getFgTranslationCoor.startPoint,
          endPoint = _getFgTranslationCoor.endPoint;

      translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
      translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this10.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function getFgTranslationCoordinates_() {
    var _activationState_ = this.activationState_,
        activationEvent = _activationState_.activationEvent,
        wasActivatedByPointer = _activationState_.wasActivatedByPointer;


    var startPoint = void 0;
    if (wasActivatedByPointer) {
      startPoint = Object(util["getNormalizedEventCoords"])(
      /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };

    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };

    return { startPoint: startPoint, endPoint: endPoint };
  };

  /** @private */


  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function runDeactivationUXLogicIfReady_() {
    var _this11 = this;

    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _activationState_2 = this.activationState_,
        hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
        isActivated = _activationState_2.isActivated;

    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this11.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function rmBoundedActivationClasses_() {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function resetActivationState_() {
    var _this12 = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(function () {
      return _this12.previousActivationEvent_ = null;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.deactivate_ = function deactivate_(e) {
    var _this13 = this;

    var activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    var state = /** @type {!ActivationStateType} */_extends({}, activationState);

    if (activationState.isProgrammatic) {
      var evtObject = null;
      requestAnimationFrame(function () {
        return _this13.animateDeactivation_(evtObject, state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this13.activationState_.hasDeactivationUXRun = true;
        _this13.animateDeactivation_(e, state);
        _this13.resetActivationState_();
      });
    }
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.deactivate = function deactivate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.deactivate_(event);
  };

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  MDCRippleFoundation.prototype.animateDeactivation_ = function animateDeactivation_(e, _ref) {
    var wasActivatedByPointer = _ref.wasActivatedByPointer,
        wasElementMadeActive = _ref.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layout = function layout() {
    var _this14 = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function () {
      _this14.layoutInternal_();
      _this14.layoutFrame_ = 0;
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.layoutInternal_ = function layoutInternal_() {
    var _this15 = this;

    this.frame_ = this.adapter_.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width);

    // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.
    var getBoundedRadius = function getBoundedRadius() {
      var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;

    this.updateLayoutCssVars_();
  };

  /** @private */


  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function updateLayoutCssVars_() {
    var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
        VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
        VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
        VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };

      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
    }
  };

  /** @param {boolean} unbounded */


  MDCRippleFoundation.prototype.setUnbounded = function setUnbounded(unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function handleFocus() {
    var _this16 = this;

    requestAnimationFrame(function () {
      return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function handleBlur() {
    var _this17 = this;

    requestAnimationFrame(function () {
      return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  return MDCRippleFoundation;
}(foundation["a" /* default */]);

/* harmony default export */ var ripple_foundation = (foundation_MDCRippleFoundation);
// CONCATENATED MODULE: ../node_modules/@material/ripple/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCRipple", function() { return ripple_MDCRipple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RippleCapableSurface", function() { return RippleCapableSurface; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCRippleFoundation", function() { return ripple_foundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "util", function() { return util; });
var ripple__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function ripple__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ripple__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ripple__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

var ripple_MDCRipple = function (_MDCComponent) {
  ripple__inherits(MDCRipple, _MDCComponent);

  /** @param {...?} args */
  function MDCRipple() {
    ripple__classCallCheck(this, MDCRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {boolean} */
    var _this = ripple__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.disabled = false;

    /** @private {boolean} */
    _this.unbounded_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  MDCRipple.attachTo = function attachTo(root) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isUnbounded = _ref.isUnbounded,
        isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

    var ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */isUnbounded;
    }
    return ripple;
  };

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  MDCRipple.createAdapter = function createAdapter(instance) {
    var MATCHES = util["getMatchesProperty"](HTMLElement.prototype);

    return {
      browserSupportsCssVars: function browserSupportsCssVars() {
        return util["supportsCssVariables"](window);
      },
      isUnbounded: function isUnbounded() {
        return instance.unbounded;
      },
      isSurfaceActive: function isSurfaceActive() {
        return instance.root_[MATCHES](':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return instance.disabled;
      },
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      containsEventTarget: function containsEventTarget(target) {
        return instance.root_.contains(target);
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, util["applyPassive"]());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, util["applyPassive"]());
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, util["applyPassive"]());
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, util["applyPassive"]());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      }
    };
  };

  /** @return {boolean} */


  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */
  MDCRipple.prototype.setUnbounded_ = function setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  };

  MDCRipple.prototype.activate = function activate() {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function layout() {
    this.foundation_.layout();
  };

  /**
   * @return {!MDCRippleFoundation}
   * @override
   */


  MDCRipple.prototype.getDefaultFoundation = function getDefaultFoundation() {
    return new ripple_foundation(MDCRipple.createAdapter(this));
  };

  /** @override */


  MDCRipple.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  };

  ripple__createClass(MDCRipple, [{
    key: 'unbounded',
    get: function get() {
      return this.unbounded_;
    }

    /** @param {boolean} unbounded */
    ,
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    }
  }]);

  return MDCRipple;
}(component["a" /* default */]);

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


var RippleCapableSurface = function RippleCapableSurface() {
  ripple__classCallCheck(this, RippleCapableSurface);
};

/** @protected {!Element} */


RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;



/***/ }),

/***/ "wfAA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Switch = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _switch = __webpack_require__("nQ/l");

var _preact = __webpack_require__("KM04");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__("uc5p"));

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

var Switch =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Switch, _MaterialComponent);

  function Switch() {
    var _this;

    (0, _classCallCheck2.default)(this, Switch);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Switch).apply(this, arguments));
    _this.componentName = 'switch';
    _this.mdcProps = ['disabled', 'checked'];
    _this.mdcNotifyProps = ['disabled', 'checked'];
    return _this;
  }

  (0, _createClass2.default)(Switch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Switch.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        this.MDComponent = new _switch.MDCSwitch(this.control);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Switch.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(allprops) {
      var className = allprops.className,
          props = __rest(allprops, ["className"]);

      return (0, _preact.h)("div", {
        className: className,
        ref: this.setControlRef
      }, (0, _preact.h)("div", {
        class: "mdc-switch__track"
      }), (0, _preact.h)("div", {
        class: "mdc-switch__thumb-underlay"
      }, (0, _preact.h)("div", {
        class: "mdc-switch__thumb"
      }, (0, _preact.h)("input", _extends({
        type: "checkbox",
        id: "basic-switch",
        class: "mdc-switch__native-control",
        role: "switch"
      }, props)))));
    }
  }]);
  return Switch;
}(_MaterialComponent2.default);

exports.Switch = Switch;
var _default = Switch;
exports.default = _default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "woEt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("S1cf");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),

/***/ "xToX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__("KM04");

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /** @jsx h */

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        // preact-compat normally does this
        var children = nextProps.children,
            props = _objectWithoutProperties(nextProps, ['children']);

        if (children && children.length) props.children = children;
        return shallowDiffers(props, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return (0, _preact.h)(WrappedComponent, this.props);
      };

      return SideEffect;
    }(_preact.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

    return SideEffect;
  };

  // Pulled from react-compat
  function shallowDiffers(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }return false;
  }
};

/***/ }),

/***/ "xxi1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1xTu8","cardHeader":"cardHeader__1tF-7","cardBody":"cardBody__3Yk1i"};

/***/ }),

/***/ "ySUw":
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__("TO+D");

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;

  var container = typeof element === 'string' ? document.querySelector(element) : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
  config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
      onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    // Ensure that the focused element doesn't capture the event that caused the focus trap activation
    setTimeout(function () {
      tryFocus(firstFocusNode());
    }, 0);
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);

    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement) return;

  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

module.exports = focusTrap;

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map
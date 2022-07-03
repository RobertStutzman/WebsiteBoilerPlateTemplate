"use strict";
self["webpackHotUpdatewebsiteboilerplate"]("main",{

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */

var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;
/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout); // @ts-ignore

    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}
/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */


function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src =
      /** @type {HTMLScriptElement} */
      document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }
  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */


  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace(".js", ".css")];
    }

    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }

    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}
/**
 * @param {TODO} el
 * @param {string} [url]
 */


function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split("?")[0];
  }

  if (!isUrlRequest(
  /** @type {string} */
  url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}
/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */


function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}
/**
 * @param {string} [src]
 * @returns {boolean}
 */


function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}
/**
 * @param {string} url
 * @returns {boolean}
 */


function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }

  return true;
}
/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */


module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */

function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;

      case ".":
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  },
  /** @type {string[]} */
  []).join("/");
}
/**
 * @param {string} urlString
 * @returns {string}
 */


module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./styles/styles.scss":
/*!****************************!*\
  !*** ./styles/styles.scss ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1656878385515
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":"","locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e7e36a6f7050ee0f8c1c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jNmQ2MmJmZDk4M2VhZDhmY2EwNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFhO0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFDQSxJQUFJQSxZQUFZLEdBQUdDLG1CQUFPLENBQUMseUZBQUQsQ0FBMUI7O0FBRUEsSUFBSUMsYUFBYSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQXBCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLE9BQU9DLFFBQVAsS0FBb0IsV0FBckM7QUFDQSxJQUFJQyxPQUFPLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkYsT0FBOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNHLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQXNCQyxJQUF0QixFQUE0QjtFQUMxQixJQUFJQyxPQUFPLEdBQUcsQ0FBZDtFQUNBLE9BQU8sWUFBWTtJQUNqQjtJQUNBLElBQUlDLElBQUksR0FBRyxJQUFYLENBRmlCLENBRUE7O0lBRWpCLElBQUlDLElBQUksR0FBR0MsU0FBWDs7SUFFQSxJQUFJQyxZQUFZLEdBQUcsU0FBU0EsWUFBVCxHQUF3QjtNQUN6QyxPQUFPTixFQUFFLENBQUNPLEtBQUgsQ0FBU0osSUFBVCxFQUFlQyxJQUFmLENBQVA7SUFDRCxDQUZEOztJQUlBSSxZQUFZLENBQUNOLE9BQUQsQ0FBWixDQVZpQixDQVVNOztJQUV2QkEsT0FBTyxHQUFHTyxVQUFVLENBQUNILFlBQUQsRUFBZUwsSUFBZixDQUFwQjtFQUNELENBYkQ7QUFjRDs7QUFFRCxTQUFTUyxJQUFULEdBQWdCLENBQUU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVNDLG1CQUFULENBQTZCQyxRQUE3QixFQUF1QztFQUNyQyxJQUFJQyxHQUFHLEdBQUd0QixhQUFhLENBQUNxQixRQUFELENBQXZCOztFQUVBLElBQUksQ0FBQ0MsR0FBTCxFQUFVO0lBQ1IsSUFBSWxCLFFBQVEsQ0FBQ21CLGFBQWIsRUFBNEI7TUFDMUJELEdBQUc7TUFDSDtNQUNBbEIsUUFBUSxDQUFDbUIsYUFBVCxDQUF1QkQsR0FGdkI7SUFHRCxDQUpELE1BSU87TUFDTCxJQUFJRSxPQUFPLEdBQUdwQixRQUFRLENBQUNxQixvQkFBVCxDQUE4QixRQUE5QixDQUFkO01BQ0EsSUFBSUMsYUFBYSxHQUFHRixPQUFPLENBQUNBLE9BQU8sQ0FBQ0csTUFBUixHQUFpQixDQUFsQixDQUEzQjs7TUFFQSxJQUFJRCxhQUFKLEVBQW1CO1FBQ2pCSixHQUFHLEdBQUdJLGFBQWEsQ0FBQ0osR0FBcEI7TUFDRDtJQUNGOztJQUVEdEIsYUFBYSxDQUFDcUIsUUFBRCxDQUFiLEdBQTBCQyxHQUExQjtFQUNEO0VBQ0Q7QUFDRjtBQUNBO0FBQ0E7OztFQUdFLE9BQU8sVUFBVU0sT0FBVixFQUFtQjtJQUN4QixJQUFJLENBQUNOLEdBQUwsRUFBVTtNQUNSLE9BQU8sSUFBUDtJQUNEOztJQUVELElBQUlPLFdBQVcsR0FBR1AsR0FBRyxDQUFDUSxLQUFKLENBQVUsZ0JBQVYsQ0FBbEI7SUFDQSxJQUFJQyxRQUFRLEdBQUdGLFdBQVcsSUFBSUEsV0FBVyxDQUFDLENBQUQsQ0FBekM7O0lBRUEsSUFBSSxDQUFDRSxRQUFMLEVBQWU7TUFDYixPQUFPLENBQUNULEdBQUcsQ0FBQ1UsT0FBSixDQUFZLEtBQVosRUFBbUIsTUFBbkIsQ0FBRCxDQUFQO0lBQ0Q7O0lBRUQsSUFBSSxDQUFDSixPQUFMLEVBQWM7TUFDWixPQUFPLENBQUNOLEdBQUcsQ0FBQ1UsT0FBSixDQUFZLEtBQVosRUFBbUIsTUFBbkIsQ0FBRCxDQUFQO0lBQ0Q7O0lBRUQsT0FBT0osT0FBTyxDQUFDRSxLQUFSLENBQWMsR0FBZCxFQUFtQkcsR0FBbkIsQ0FBdUIsVUFBVUMsT0FBVixFQUFtQjtNQUMvQyxJQUFJQyxHQUFHLEdBQUcsSUFBSUMsTUFBSixDQUFXLEdBQUdDLE1BQUgsQ0FBVU4sUUFBVixFQUFvQixRQUFwQixDQUFYLEVBQTBDLEdBQTFDLENBQVY7TUFDQSxPQUFPakMsWUFBWSxDQUFDd0IsR0FBRyxDQUFDVSxPQUFKLENBQVlHLEdBQVosRUFBaUIsR0FBR0UsTUFBSCxDQUFVSCxPQUFPLENBQUNGLE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0JELFFBQS9CLENBQVYsRUFBb0QsTUFBcEQsQ0FBakIsQ0FBRCxDQUFuQjtJQUNELENBSE0sQ0FBUDtFQUlELENBcEJEO0FBcUJEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVNPLFNBQVQsQ0FBbUJDLEVBQW5CLEVBQXVCQyxHQUF2QixFQUE0QjtFQUMxQixJQUFJLENBQUNBLEdBQUwsRUFBVTtJQUNSLElBQUksQ0FBQ0QsRUFBRSxDQUFDRSxJQUFSLEVBQWM7TUFDWjtJQUNELENBSE8sQ0FHTjs7O0lBR0ZELEdBQUcsR0FBR0QsRUFBRSxDQUFDRSxJQUFILENBQVFYLEtBQVIsQ0FBYyxHQUFkLEVBQW1CLENBQW5CLENBQU47RUFDRDs7RUFFRCxJQUFJLENBQUNZLFlBQVk7RUFDakI7RUFDQUYsR0FGaUIsQ0FBakIsRUFFTTtJQUNKO0VBQ0Q7O0VBRUQsSUFBSUQsRUFBRSxDQUFDSSxRQUFILEtBQWdCLEtBQXBCLEVBQTJCO0lBQ3pCO0lBQ0E7SUFDQTtFQUNEOztFQUVELElBQUksQ0FBQ0gsR0FBRCxJQUFRLEVBQUVBLEdBQUcsQ0FBQ0ksT0FBSixDQUFZLE1BQVosSUFBc0IsQ0FBQyxDQUF6QixDQUFaLEVBQXlDO0lBQ3ZDO0VBQ0QsQ0F4QnlCLENBd0J4Qjs7O0VBR0ZMLEVBQUUsQ0FBQ00sT0FBSCxHQUFhLElBQWI7RUFDQSxJQUFJQyxLQUFLLEdBQUdQLEVBQUUsQ0FBQ1EsU0FBSCxFQUFaO0VBQ0FELEtBQUssQ0FBQ0gsUUFBTixHQUFpQixLQUFqQjtFQUNBRyxLQUFLLENBQUNFLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFlBQVk7SUFDekMsSUFBSUYsS0FBSyxDQUFDSCxRQUFWLEVBQW9CO01BQ2xCO0lBQ0Q7O0lBRURHLEtBQUssQ0FBQ0gsUUFBTixHQUFpQixJQUFqQjtJQUNBSixFQUFFLENBQUNVLFVBQUgsQ0FBY0MsV0FBZCxDQUEwQlgsRUFBMUI7RUFDRCxDQVBEO0VBUUFPLEtBQUssQ0FBQ0UsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBWTtJQUMxQyxJQUFJRixLQUFLLENBQUNILFFBQVYsRUFBb0I7TUFDbEI7SUFDRDs7SUFFREcsS0FBSyxDQUFDSCxRQUFOLEdBQWlCLElBQWpCO0lBQ0FKLEVBQUUsQ0FBQ1UsVUFBSCxDQUFjQyxXQUFkLENBQTBCWCxFQUExQjtFQUNELENBUEQ7RUFRQU8sS0FBSyxDQUFDTCxJQUFOLEdBQWEsR0FBR0osTUFBSCxDQUFVRyxHQUFWLEVBQWUsR0FBZixFQUFvQkgsTUFBcEIsQ0FBMkJjLElBQUksQ0FBQ0MsR0FBTCxFQUEzQixDQUFiOztFQUVBLElBQUliLEVBQUUsQ0FBQ2MsV0FBUCxFQUFvQjtJQUNsQmQsRUFBRSxDQUFDVSxVQUFILENBQWNLLFlBQWQsQ0FBMkJSLEtBQTNCLEVBQWtDUCxFQUFFLENBQUNjLFdBQXJDO0VBQ0QsQ0FGRCxNQUVPO0lBQ0xkLEVBQUUsQ0FBQ1UsVUFBSCxDQUFjTSxXQUFkLENBQTBCVCxLQUExQjtFQUNEO0FBQ0Y7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxTQUFTVSxZQUFULENBQXNCZixJQUF0QixFQUE0Qm5CLEdBQTVCLEVBQWlDO0VBQy9CLElBQUltQyxHQUFKLENBRCtCLENBQ3RCOztFQUVUaEIsSUFBSSxHQUFHM0MsWUFBWSxDQUFDMkMsSUFBRCxDQUFuQjtFQUNBbkIsR0FBRyxDQUFDb0MsSUFBSjtFQUNBO0FBQ0Y7QUFDQTtFQUNFO0VBQ0EsVUFBVWxCLEdBQVYsRUFBZTtJQUNiLElBQUlDLElBQUksQ0FBQ0csT0FBTCxDQUFhdEIsR0FBYixJQUFvQixDQUFDLENBQXpCLEVBQTRCO01BQzFCbUMsR0FBRyxHQUFHakIsR0FBTjtJQUNEO0VBQ0YsQ0FURDtFQVVBLE9BQU9pQixHQUFQO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBU0UsV0FBVCxDQUFxQnJDLEdBQXJCLEVBQTBCO0VBQ3hCLElBQUksQ0FBQ0EsR0FBTCxFQUFVO0lBQ1IsT0FBTyxLQUFQO0VBQ0Q7O0VBRUQsSUFBSXNDLFFBQVEsR0FBR3hELFFBQVEsQ0FBQ3lELGdCQUFULENBQTBCLE1BQTFCLENBQWY7RUFDQSxJQUFJQyxNQUFNLEdBQUcsS0FBYjtFQUNBekQsT0FBTyxDQUFDMEQsSUFBUixDQUFhSCxRQUFiLEVBQXVCLFVBQVVyQixFQUFWLEVBQWM7SUFDbkMsSUFBSSxDQUFDQSxFQUFFLENBQUNFLElBQVIsRUFBYztNQUNaO0lBQ0Q7O0lBRUQsSUFBSUQsR0FBRyxHQUFHZ0IsWUFBWSxDQUFDakIsRUFBRSxDQUFDRSxJQUFKLEVBQVVuQixHQUFWLENBQXRCOztJQUVBLElBQUksQ0FBQ29CLFlBQVksQ0FBQ0YsR0FBRCxDQUFqQixFQUF3QjtNQUN0QjtJQUNEOztJQUVELElBQUlELEVBQUUsQ0FBQ00sT0FBSCxLQUFlLElBQW5CLEVBQXlCO01BQ3ZCO0lBQ0Q7O0lBRUQsSUFBSUwsR0FBSixFQUFTO01BQ1BGLFNBQVMsQ0FBQ0MsRUFBRCxFQUFLQyxHQUFMLENBQVQ7TUFDQXNCLE1BQU0sR0FBRyxJQUFUO0lBQ0Q7RUFDRixDQW5CRDtFQW9CQSxPQUFPQSxNQUFQO0FBQ0Q7O0FBRUQsU0FBU0UsU0FBVCxHQUFxQjtFQUNuQixJQUFJSixRQUFRLEdBQUd4RCxRQUFRLENBQUN5RCxnQkFBVCxDQUEwQixNQUExQixDQUFmO0VBQ0F4RCxPQUFPLENBQUMwRCxJQUFSLENBQWFILFFBQWIsRUFBdUIsVUFBVXJCLEVBQVYsRUFBYztJQUNuQyxJQUFJQSxFQUFFLENBQUNNLE9BQUgsS0FBZSxJQUFuQixFQUF5QjtNQUN2QjtJQUNEOztJQUVEUCxTQUFTLENBQUNDLEVBQUQsQ0FBVDtFQUNELENBTkQ7QUFPRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxTQUFTRyxZQUFULENBQXNCRixHQUF0QixFQUEyQjtFQUN6QjtFQUNBO0VBQ0EsSUFBSSxDQUFDLDRCQUE0QnlCLElBQTVCLENBQWlDekIsR0FBakMsQ0FBTCxFQUE0QztJQUMxQyxPQUFPLEtBQVA7RUFDRDs7RUFFRCxPQUFPLElBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBMEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVU5QyxRQUFWLEVBQW9CK0MsT0FBcEIsRUFBNkI7RUFDNUMsSUFBSWpFLFVBQUosRUFBZ0I7SUFDZGtFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRDQUFaO0lBQ0EsT0FBT25ELElBQVA7RUFDRDs7RUFFRCxJQUFJb0QsWUFBWSxHQUFHbkQsbUJBQW1CLENBQUNDLFFBQUQsQ0FBdEM7O0VBRUEsU0FBU21ELE1BQVQsR0FBa0I7SUFDaEIsSUFBSWxELEdBQUcsR0FBR2lELFlBQVksQ0FBQ0gsT0FBTyxDQUFDckMsUUFBVCxDQUF0QjtJQUNBLElBQUkwQyxRQUFRLEdBQUdkLFdBQVcsQ0FBQ3JDLEdBQUQsQ0FBMUI7O0lBRUEsSUFBSThDLE9BQU8sQ0FBQ00sTUFBWixFQUFvQjtNQUNsQkwsT0FBTyxDQUFDQyxHQUFSLENBQVksa0RBQVo7TUFDQU4sU0FBUztNQUNUO0lBQ0Q7O0lBRUQsSUFBSVMsUUFBSixFQUFjO01BQ1pKLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaLEVBQW1DaEQsR0FBRyxDQUFDcUQsSUFBSixDQUFTLEdBQVQsQ0FBbkM7SUFDRCxDQUZELE1BRU87TUFDTE4sT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7TUFDQU4sU0FBUztJQUNWO0VBQ0Y7O0VBRUQsT0FBT3hELFFBQVEsQ0FBQ2dFLE1BQUQsRUFBUyxFQUFULENBQWY7QUFDRCxDQTNCRDs7Ozs7Ozs7OztBQ3JQYTtBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVMxRSxZQUFULENBQXNCOEUsY0FBdEIsRUFBc0M7RUFDcEMsT0FBT0EsY0FBYyxDQUFDQyxNQUFmLENBQXNCLFVBQVVDLFdBQVYsRUFBdUJDLElBQXZCLEVBQTZCO0lBQ3hELFFBQVFBLElBQVI7TUFDRSxLQUFLLElBQUw7UUFDRUQsV0FBVyxDQUFDRSxHQUFaO1FBQ0E7O01BRUYsS0FBSyxHQUFMO1FBQ0U7O01BRUY7UUFDRUYsV0FBVyxDQUFDRyxJQUFaLENBQWlCRixJQUFqQjtJQVRKOztJQVlBLE9BQU9ELFdBQVA7RUFDRCxDQWRNO0VBZVA7RUFDQSxFQWhCTyxFQWdCSEgsSUFoQkcsQ0FnQkUsR0FoQkYsQ0FBUDtBQWlCRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQVQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVVlLFNBQVYsRUFBcUI7RUFDcENBLFNBQVMsR0FBR0EsU0FBUyxDQUFDQyxJQUFWLEVBQVo7O0VBRUEsSUFBSSxVQUFVbEIsSUFBVixDQUFlaUIsU0FBZixDQUFKLEVBQStCO0lBQzdCLE9BQU9BLFNBQVA7RUFDRDs7RUFFRCxJQUFJRSxRQUFRLEdBQUdGLFNBQVMsQ0FBQ3RDLE9BQVYsQ0FBa0IsSUFBbEIsTUFBNEIsQ0FBQyxDQUE3QixHQUFpQ3NDLFNBQVMsQ0FBQ3BELEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0IsQ0FBdEIsSUFBMkIsSUFBNUQsR0FBbUUsRUFBbEY7RUFDQSxJQUFJdUQsVUFBVSxHQUFHSCxTQUFTLENBQUNsRCxPQUFWLENBQWtCLElBQUlJLE1BQUosQ0FBV2dELFFBQVgsRUFBcUIsR0FBckIsQ0FBbEIsRUFBNkMsRUFBN0MsRUFBaUR0RCxLQUFqRCxDQUF1RCxHQUF2RCxDQUFqQjtFQUNBLElBQUl3RCxJQUFJLEdBQUdELFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0UsV0FBZCxHQUE0QnZELE9BQTVCLENBQW9DLEtBQXBDLEVBQTJDLEVBQTNDLENBQVg7RUFDQXFELFVBQVUsQ0FBQyxDQUFELENBQVYsR0FBZ0IsRUFBaEI7RUFDQSxJQUFJRyxJQUFJLEdBQUcxRixZQUFZLENBQUN1RixVQUFELENBQXZCO0VBQ0EsT0FBT0QsUUFBUSxHQUFHRSxJQUFYLEdBQWtCRSxJQUF6QjtBQUNELENBYkQ7Ozs7Ozs7Ozs7O0FDakNBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQyx5SkFBMEUsY0FBYywrQkFBK0I7QUFDckosTUFBTSxVQUFVO0FBQ2hCLE1BQU0saUJBQWlCO0FBQ3ZCO0FBQ0E7Ozs7Ozs7O1VDUkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJzaXRlYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2Vic2l0ZWJvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL25vcm1hbGl6ZS11cmwuanMiLCJ3ZWJwYWNrOi8vd2Vic2l0ZWJvaWxlcnBsYXRlLy4vc3R5bGVzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL3dlYnNpdGVib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKlxuICBlc2xpbnQtZGlzYWJsZVxuICBuby1jb25zb2xlLFxuICBmdW5jLW5hbWVzXG4qL1xuXG4vKiogQHR5cGVkZWYge2FueX0gVE9ETyAqL1xudmFyIG5vcm1hbGl6ZVVybCA9IHJlcXVpcmUoXCIuL25vcm1hbGl6ZS11cmxcIik7XG5cbnZhciBzcmNCeU1vZHVsZUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBub0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiO1xudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gKiBAcmV0dXJucyB7KGZ1bmN0aW9uKCk6IHZvaWQpfCp9XG4gKi9cblxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWUpIHtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB2YXIgc2VsZiA9IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcblxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIGZ1bmN0aW9uQ2FsbCA9IGZ1bmN0aW9uIGZ1bmN0aW9uQ2FsbCgpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpOyAvLyBAdHMtaWdub3JlXG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbkNhbGwsIHRpbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBtb2R1bGVJZFxuICogQHJldHVybnMge1RPRE99XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKSB7XG4gIHZhciBzcmMgPSBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXTtcblxuICBpZiAoIXNyYykge1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICBzcmMgPVxuICAgICAgLyoqIEB0eXBlIHtIVE1MU2NyaXB0RWxlbWVudH0gKi9cbiAgICAgIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuICAgICAgdmFyIGxhc3RTY3JpcHRUYWcgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdID0gc3JjO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU1hcFxuICAgKiBAcmV0dXJucyB7bnVsbCB8IHN0cmluZ1tdfVxuICAgKi9cblxuXG4gIHJldHVybiBmdW5jdGlvbiAoZmlsZU1hcCkge1xuICAgIGlmICghc3JjKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3BsaXRSZXN1bHQgPSBzcmMuc3BsaXQoLyhbXlxcXFwvXSspXFwuanMkLyk7XG4gICAgdmFyIGZpbGVuYW1lID0gc3BsaXRSZXN1bHQgJiYgc3BsaXRSZXN1bHRbMV07XG5cbiAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKFwiLmpzXCIsIFwiLmNzc1wiKV07XG4gICAgfVxuXG4gICAgaWYgKCFmaWxlTWFwKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKFwiLmpzXCIsIFwiLmNzc1wiKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAobWFwUnVsZSkge1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQoZmlsZW5hbWUsIFwiXFxcXC5qcyRcIiksIFwiZ1wiKTtcbiAgICAgIHJldHVybiBub3JtYWxpemVVcmwoc3JjLnJlcGxhY2UocmVnLCBcIlwiLmNvbmNhdChtYXBSdWxlLnJlcGxhY2UoL3tmaWxlTmFtZX0vZywgZmlsZW5hbWUpLCBcIi5jc3NcIikpKTtcbiAgICB9KTtcbiAgfTtcbn1cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBlbFxuICogQHBhcmFtIHtzdHJpbmd9IFt1cmxdXG4gKi9cblxuXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cblxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xuICB9XG5cbiAgaWYgKCFpc1VybFJlcXVlc3QoXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICB1cmwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVsLmlzTG9hZGVkID09PSBmYWxzZSkge1xuICAgIC8vIFdlIHNlZW0gdG8gYmUgYWJvdXQgdG8gcmVwbGFjZSBhIGNzcyBsaW5rIHRoYXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gICAgLy8gV2UncmUgcHJvYmFibHkgY2hhbmdpbmcgdGhlIHNhbWUgZmlsZSBtb3JlIHRoYW4gb25jZS5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXVybCB8fCAhKHVybC5pbmRleE9mKFwiLmNzc1wiKSA+IC0xKSkge1xuICAgIHJldHVybjtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIGVsLnZpc2l0ZWQgPSB0cnVlO1xuICB2YXIgbmV3RWwgPSBlbC5jbG9uZU5vZGUoKTtcbiAgbmV3RWwuaXNMb2FkZWQgPSBmYWxzZTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfSk7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKG5ld0VsLmlzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV3RWwuaXNMb2FkZWQgPSB0cnVlO1xuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICB9KTtcbiAgbmV3RWwuaHJlZiA9IFwiXCIuY29uY2F0KHVybCwgXCI/XCIpLmNvbmNhdChEYXRlLm5vdygpKTtcblxuICBpZiAoZWwubmV4dFNpYmxpbmcpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdFbCwgZWwubmV4dFNpYmxpbmcpO1xuICB9IGVsc2Uge1xuICAgIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICB9XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gKiBAcGFyYW0ge1RPRE99IHNyY1xuICogQHJldHVybnMge1RPRE99XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRSZWxvYWRVcmwoaHJlZiwgc3JjKSB7XG4gIHZhciByZXQ7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXG4gIGhyZWYgPSBub3JtYWxpemVVcmwoaHJlZik7XG4gIHNyYy5zb21lKFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICBmdW5jdGlvbiAodXJsKSB7XG4gICAgaWYgKGhyZWYuaW5kZXhPZihzcmMpID4gLTEpIHtcbiAgICAgIHJldCA9IHVybDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NyY11cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gcmVsb2FkU3R5bGUoc3JjKSB7XG4gIGlmICghc3JjKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gZ2V0UmVsb2FkVXJsKGVsLmhyZWYsIHNyYyk7XG5cbiAgICBpZiAoIWlzVXJsUmVxdWVzdCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodXJsKSB7XG4gICAgICB1cGRhdGVDc3MoZWwsIHVybCk7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsb2FkZWQ7XG59XG5cbmZ1bmN0aW9uIHJlbG9hZEFsbCgpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIGZvckVhY2guY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1cGRhdGVDc3MoZWwpO1xuICB9KTtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuXG5mdW5jdGlvbiBpc1VybFJlcXVlc3QodXJsKSB7XG4gIC8vIEFuIFVSTCBpcyBub3QgYW4gcmVxdWVzdCBpZlxuICAvLyBJdCBpcyBub3QgaHR0cCBvciBodHRwc1xuICBpZiAoIS9eW2EtekEtWl1bYS16QS1aXFxkK1xcLS5dKjovLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBAcGFyYW0ge1RPRE99IG1vZHVsZUlkXG4gKiBAcGFyYW0ge1RPRE99IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlSWQsIG9wdGlvbnMpIHtcbiAgaWYgKG5vRG9jdW1lbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vIHdpbmRvdy5kb2N1bWVudCBmb3VuZCwgd2lsbCBub3QgSE1SIENTU1wiKTtcbiAgICByZXR1cm4gbm9vcDtcbiAgfVxuXG4gIHZhciBnZXRTY3JpcHRTcmMgPSBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKTtcblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHNyYyA9IGdldFNjcmlwdFNyYyhvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB2YXIgcmVsb2FkZWQgPSByZWxvYWRTdHlsZShzcmMpO1xuXG4gICAgaWYgKG9wdGlvbnMubG9jYWxzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIERldGVjdGVkIGxvY2FsIGNzcyBtb2R1bGVzLiBSZWxvYWQgYWxsIGNzc1wiKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZWxvYWRlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBjc3MgcmVsb2FkICVzXCIsIHNyYy5qb2luKFwiIFwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gUmVsb2FkIGFsbCBjc3NcIik7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVib3VuY2UodXBkYXRlLCA1MCk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhDb21wb25lbnRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVVcmwocGF0aENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHBhdGhDb21wb25lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGl0ZW0pIHtcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcbiAgICAgIGNhc2UgXCIuLlwiOlxuICAgICAgICBhY2N1bXVsYXRvci5wb3AoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCIuXCI6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGl0ZW0pO1xuICAgIH1cblxuICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgfSxcbiAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgW10pLmpvaW4oXCIvXCIpO1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsU3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsU3RyaW5nKSB7XG4gIHVybFN0cmluZyA9IHVybFN0cmluZy50cmltKCk7XG5cbiAgaWYgKC9eZGF0YTovaS50ZXN0KHVybFN0cmluZykpIHtcbiAgICByZXR1cm4gdXJsU3RyaW5nO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdXJsU3RyaW5nLmluZGV4T2YoXCIvL1wiKSAhPT0gLTEgPyB1cmxTdHJpbmcuc3BsaXQoXCIvL1wiKVswXSArIFwiLy9cIiA6IFwiXCI7XG4gIHZhciBjb21wb25lbnRzID0gdXJsU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChwcm90b2NvbCwgXCJpXCIpLCBcIlwiKS5zcGxpdChcIi9cIik7XG4gIHZhciBob3N0ID0gY29tcG9uZW50c1swXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcLiQvLCBcIlwiKTtcbiAgY29tcG9uZW50c1swXSA9IFwiXCI7XG4gIHZhciBwYXRoID0gbm9ybWFsaXplVXJsKGNvbXBvbmVudHMpO1xuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aDtcbn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTY1Njg3ODM4NTUxNVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJwdWJsaWNQYXRoXCI6XCJcIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImU3ZTM2YTZmNzA1MGVlMGY4YzFjXCIpIl0sIm5hbWVzIjpbIm5vcm1hbGl6ZVVybCIsInJlcXVpcmUiLCJzcmNCeU1vZHVsZUlkIiwiT2JqZWN0IiwiY3JlYXRlIiwibm9Eb2N1bWVudCIsImRvY3VtZW50IiwiZm9yRWFjaCIsIkFycmF5IiwicHJvdG90eXBlIiwiZGVib3VuY2UiLCJmbiIsInRpbWUiLCJ0aW1lb3V0Iiwic2VsZiIsImFyZ3MiLCJhcmd1bWVudHMiLCJmdW5jdGlvbkNhbGwiLCJhcHBseSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJub29wIiwiZ2V0Q3VycmVudFNjcmlwdFVybCIsIm1vZHVsZUlkIiwic3JjIiwiY3VycmVudFNjcmlwdCIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxhc3RTY3JpcHRUYWciLCJsZW5ndGgiLCJmaWxlTWFwIiwic3BsaXRSZXN1bHQiLCJzcGxpdCIsImZpbGVuYW1lIiwicmVwbGFjZSIsIm1hcCIsIm1hcFJ1bGUiLCJyZWciLCJSZWdFeHAiLCJjb25jYXQiLCJ1cGRhdGVDc3MiLCJlbCIsInVybCIsImhyZWYiLCJpc1VybFJlcXVlc3QiLCJpc0xvYWRlZCIsImluZGV4T2YiLCJ2aXNpdGVkIiwibmV3RWwiLCJjbG9uZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiRGF0ZSIsIm5vdyIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJnZXRSZWxvYWRVcmwiLCJyZXQiLCJzb21lIiwicmVsb2FkU3R5bGUiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkZWQiLCJjYWxsIiwicmVsb2FkQWxsIiwidGVzdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsImdldFNjcmlwdFNyYyIsInVwZGF0ZSIsInJlbG9hZGVkIiwibG9jYWxzIiwiam9pbiIsInBhdGhDb21wb25lbnRzIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJpdGVtIiwicG9wIiwicHVzaCIsInVybFN0cmluZyIsInRyaW0iLCJwcm90b2NvbCIsImNvbXBvbmVudHMiLCJob3N0IiwidG9Mb3dlckNhc2UiLCJwYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==
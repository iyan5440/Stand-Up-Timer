/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/alarmsfx.mp3":
/*!*************************************!*\
  !*** ./src/background/alarmsfx.mp3 ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "ebbc126a4ae1055a035456c84a11bec3.mp3");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alarmsfx_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alarmsfx.mp3 */ "./src/background/alarmsfx.mp3");

var isOnClick = false;
var isOnBreakClick = false;
var isLoop = false;
//let pingSfx = new Audio(sfx);
var volume;
var timerInterval;
var countDate;
var countBreakDate;
//let audioObject;

chrome.runtime.onInstalled.addListener(function () {
  console.log("just installed");
  var defaultdata = {
    timer: 1 * 10 * 1000,
    //3 * 1000, //30 * 60 * 1000,  // default timer - 3 seconds
    breakTimer: 30 * 1000,
    defaultVolume: 0.5
  };
  countDate = defaultdata.timer;
  countBreakDate = defaultdata.breakTimer;
  volume = defaultdata.defaultVolume;
});
chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  if (data.event === 'start') {
    if (isOnClick || isOnBreakClick) return;else {
      if (isOnClick == false) {
        isOnClick = true;
        clearInterval(timerInterval);
        startTimer(countDate, 'Study Time');
      }
    }
  } else if (data.event === 'stop') {
    clearInterval(timerInterval);
    isOnClick = false;
    isOnBreakClick = false;
    //if in blur do not send update
    sendUpdate('Study Time', countDate);
  } else if (data.event === 'loop') {
    isLoop = !isLoop;
    console.log('Loop is ' + isLoop);
  } else if (data.event === 'getState') {
    sendResponse({
      isOnClick: isOnClick,
      isOnBreakClick: isOnBreakClick,
      countDate: countDate,
      countBreakDate: countBreakDate,
      isLoop: isLoop
    });
    return true; // Ensure async response
  }
});
function startTimer(time, type) {
  var intervalTime = 1000; // 1 second
  var tmpTime = time;
  sendUpdate(type, time);
  timerInterval = setInterval(function () {
    tmpTime -= intervalTime;
    console.log(tmpTime);
    if (type === 'Study Time') {
      if (tmpTime == 0) {
        playSfx();
        sendUpdate('Break Time', 0);
      } else if (tmpTime <= -1000) {
        clearInterval(timerInterval);
        isOnClick = false;
        startTimer(countBreakDate, 'Break Time');
      } else {
        sendUpdate('Study Time', tmpTime);
      }
    } else if (type === 'Break Time') {
      if (tmpTime == 0) {
        playSfx();
        sendUpdate('Study Time', 0);
      } else if (tmpTime <= -1000) {
        clearInterval(timerInterval);
        isOnClick = false;
        if (isLoop) startTimer(countDate, 'Study Time');
      } else {
        sendUpdate('Break Time', tmpTime);
      }
    }
  }, intervalTime);
}
function sendUpdate(type, time) {
  console.log("Sending ".concat(type, " update: ").concat(formatTime(time)));
  chrome.runtime.sendMessage({
    event: 'timerUpdate',
    time: formatTime(time),
    type: type
  });
}
function playSfx() {
  chrome.runtime.sendMessage({
    event: 'play',
    sfx: _alarmsfx_mp3__WEBPACK_IMPORTED_MODULE_0__["default"],
    volume: volume
  });
}
function formatTime(milliseconds) {
  var hrs = String(Math.floor(milliseconds / (1000 * 60 * 60) % 24)).padStart(2, '0');
  var mins = String(Math.floor(milliseconds / (1000 * 60) % 60)).padStart(2, '0');
  var secs = String(Math.floor(milliseconds / 1000 % 60)).padStart(2, '0');
  return "".concat(hrs, ":").concat(mins, ":").concat(secs);
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLENBQUVKLFlBQVksR0FBRyxJQUFJLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQ0ssUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDNUUsVUFBQVIsTUFBQSxDQUFVSSxHQUFHLE9BQUFKLE1BQUEsQ0FBSVMsSUFBSSxPQUFBVCxNQUFBLENBQUlVLElBQUk7QUFDakMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2FsYXJtc2Z4Lm1wMyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZWJiYzEyNmE0YWUxMDU1YTAzNTQ1NmM4NGExMWJlYzMubXAzXCI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBzZnggZnJvbSBcIi4vYWxhcm1zZngubXAzXCI7XHJcblxyXG5sZXQgaXNPbkNsaWNrID0gZmFsc2U7XHJcbmxldCBpc09uQnJlYWtDbGljayA9IGZhbHNlO1xyXG5sZXQgaXNMb29wID0gZmFsc2U7XHJcbi8vbGV0IHBpbmdTZnggPSBuZXcgQXVkaW8oc2Z4KTtcclxubGV0IHZvbHVtZTtcclxubGV0IHRpbWVySW50ZXJ2YWw7XHJcbmxldCBjb3VudERhdGU7IFxyXG5sZXQgY291bnRCcmVha0RhdGU7IFxyXG4vL2xldCBhdWRpb09iamVjdDtcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwianVzdCBpbnN0YWxsZWRcIik7XHJcbiAgICBcclxuICAgIGNvbnN0IGRlZmF1bHRkYXRhID0ge1xyXG4gICAgICAgIHRpbWVyOiAxICogMTAgKiAxMDAwLC8vMyAqIDEwMDAsIC8vMzAgKiA2MCAqIDEwMDAsICAvLyBkZWZhdWx0IHRpbWVyIC0gMyBzZWNvbmRzXHJcbiAgICAgICAgYnJlYWtUaW1lcjogMzAgKiAxMDAwLFxyXG4gICAgICAgIGRlZmF1bHRWb2x1bWU6IDAuNVxyXG4gICAgfTsgXHJcblxyXG4gICAgY291bnREYXRlID0gZGVmYXVsdGRhdGEudGltZXI7XHJcbiAgICBjb3VudEJyZWFrRGF0ZSA9IGRlZmF1bHRkYXRhLmJyZWFrVGltZXI7XHJcbiAgICB2b2x1bWUgPSBkZWZhdWx0ZGF0YS5kZWZhdWx0Vm9sdW1lO1xyXG59KVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChkYXRhLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgaWYgKGRhdGEuZXZlbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgICBpZihpc09uQ2xpY2sgfHwgaXNPbkJyZWFrQ2xpY2spIHJldHVybjtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihpc09uQ2xpY2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlzT25DbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpOyAgXHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWVyKGNvdW50RGF0ZSwgJ1N0dWR5IFRpbWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuZXZlbnQgPT09ICdzdG9wJykge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgaXNPbkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgaXNPbkJyZWFrQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAvL2lmIGluIGJsdXIgZG8gbm90IHNlbmQgdXBkYXRlXHJcbiAgICAgICAgc2VuZFVwZGF0ZSgnU3R1ZHkgVGltZScsIGNvdW50RGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuZXZlbnQgPT09ICdsb29wJykge1xyXG4gICAgICAgIGlzTG9vcCA9ICFpc0xvb3A7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xvb3AgaXMgJyArIGlzTG9vcCk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuZXZlbnQgPT09ICdnZXRTdGF0ZScpIHtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICBpc09uQ2xpY2ssXHJcbiAgICAgICAgICAgIGlzT25CcmVha0NsaWNrLFxyXG4gICAgICAgICAgICBjb3VudERhdGUsXHJcbiAgICAgICAgICAgIGNvdW50QnJlYWtEYXRlLFxyXG4gICAgICAgICAgICBpc0xvb3AsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7ICAvLyBFbnN1cmUgYXN5bmMgcmVzcG9uc2VcclxuICAgIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBzdGFydFRpbWVyKHRpbWUsIHR5cGUpIHtcclxuICAgIGNvbnN0IGludGVydmFsVGltZSA9IDEwMDA7IC8vIDEgc2Vjb25kXHJcbiAgICBsZXQgdG1wVGltZSA9IHRpbWU7XHJcblxyXG4gICAgc2VuZFVwZGF0ZSh0eXBlLCB0aW1lKTtcclxuICAgIHRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdG1wVGltZSAtPSBpbnRlcnZhbFRpbWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codG1wVGltZSk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdTdHVkeSBUaW1lJykge1xyXG4gICAgICAgICAgICBpZiAodG1wVGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5U2Z4KCk7XHJcbiAgICAgICAgICAgICAgICBzZW5kVXBkYXRlKCdCcmVhayBUaW1lJywgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRtcFRpbWUgPD0gLTEwMDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBpc09uQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZXIoY291bnRCcmVha0RhdGUsICdCcmVhayBUaW1lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VuZFVwZGF0ZSgnU3R1ZHkgVGltZScsIHRtcFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnQnJlYWsgVGltZScpIHtcclxuICAgICAgICAgICAgaWYgKHRtcFRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcGxheVNmeCgpO1xyXG4gICAgICAgICAgICAgICAgc2VuZFVwZGF0ZSgnU3R1ZHkgVGltZScsIDApO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZiAodG1wVGltZSA8PSAtMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIGlzT25DbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTG9vcCkgc3RhcnRUaW1lcihjb3VudERhdGUsICdTdHVkeSBUaW1lJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VuZFVwZGF0ZSgnQnJlYWsgVGltZScsIHRtcFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgaW50ZXJ2YWxUaW1lKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNlbmRVcGRhdGUodHlwZSwgdGltZSkge1xyXG4gICAgY29uc29sZS5sb2coYFNlbmRpbmcgJHt0eXBlfSB1cGRhdGU6ICR7Zm9ybWF0VGltZSh0aW1lKX1gKTtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBldmVudDogJ3RpbWVyVXBkYXRlJyxcclxuICAgICAgICB0aW1lOiBmb3JtYXRUaW1lKHRpbWUpLFxyXG4gICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheVNmeCgpIHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBldmVudDogJ3BsYXknLFxyXG4gICAgICAgIHNmeDogc2Z4LFxyXG4gICAgICAgIHZvbHVtZTogdm9sdW1lLFxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRUaW1lKG1pbGxpc2Vjb25kcykge1xyXG4gICAgY29uc3QgaHJzID0gU3RyaW5nKE1hdGguZmxvb3IoKG1pbGxpc2Vjb25kcyAvICgxMDAwICogNjAgKiA2MCkpICUgMjQpKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3QgbWlucyA9IFN0cmluZyhNYXRoLmZsb29yKChtaWxsaXNlY29uZHMgLyAoMTAwMCAqIDYwKSkgJSA2MCkpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICBjb25zdCBzZWNzID0gU3RyaW5nKE1hdGguZmxvb3IoKG1pbGxpc2Vjb25kcyAvIDEwMDApICUgNjApKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgcmV0dXJuIGAke2hyc306JHttaW5zfToke3NlY3N9YDtcclxufVxyXG4iXSwibmFtZXMiOlsic2Z4IiwiaXNPbkNsaWNrIiwiaXNPbkJyZWFrQ2xpY2siLCJpc0xvb3AiLCJ2b2x1bWUiLCJ0aW1lckludGVydmFsIiwiY291bnREYXRlIiwiY291bnRCcmVha0RhdGUiLCJjaHJvbWUiLCJydW50aW1lIiwib25JbnN0YWxsZWQiLCJhZGRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJkZWZhdWx0ZGF0YSIsInRpbWVyIiwiYnJlYWtUaW1lciIsImRlZmF1bHRWb2x1bWUiLCJvbk1lc3NhZ2UiLCJkYXRhIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwiZXZlbnQiLCJjbGVhckludGVydmFsIiwic3RhcnRUaW1lciIsInNlbmRVcGRhdGUiLCJ0aW1lIiwidHlwZSIsImludGVydmFsVGltZSIsInRtcFRpbWUiLCJzZXRJbnRlcnZhbCIsInBsYXlTZngiLCJjb25jYXQiLCJmb3JtYXRUaW1lIiwic2VuZE1lc3NhZ2UiLCJtaWxsaXNlY29uZHMiLCJocnMiLCJTdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJwYWRTdGFydCIsIm1pbnMiLCJzZWNzIl0sInNvdXJjZVJvb3QiOiIifQ==
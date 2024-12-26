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
var timerInterval;
var countDate = 3 * 1000; // Default study time (5 seconds)
var countBreakDate = 3 * 1000; // Default break time (3 seconds)

chrome.runtime.onInstalled.addListener(function () {
  console.log("just installed");
  var defaultData = {
    timer: 3 * 1000 // default timer - 3 seconds
  };
  var userData = {
    timer: 0 // user custom timer
  };
  chrome.storage.local.set({
    defaultData: defaultData
  }, function () {
    console.log('Data has been Initalized');

    /* chrome.storage.local.get('defaultData', (result) => {
        if (result.defaultData) {
            console.log(result.defaultData);
        } else {
            console.log("no data")
        }
    }); */
  });
});
chrome.runtime.onMessage.addListener(function (data, _, sendResponse) {
  if (data.event === 'default') {
    // Delay between retries (in milliseconds)
    var tryGetData = function tryGetData() {
      chrome.storage.local.get('defaultData', function (result) {
        if (result.defaultData) {
          console.log(result.defaultData.timer);
          sendResponse(result.defaultData.timer); // Send the timer value once data is found
        } else {
          // If no data, retry after a delay
          setTimeout(tryGetData, retryDelay);
        }
      });
    };
    var retryDelay = 500;
    tryGetData(); // Initiate the first attempt

    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

/*

chrome.runtime.onMessage.addListener(data => {
    if(data.event === 'start') {
        //console.log("yes - comms are working");
        if(isOnClick || isOnBreakClick) return;
        else{
            if(isOnClick == false) {
                isOnClick = true;
                //event.currentTarget.disabled = true;
                
                updateStudy();   
            }
        }

        
    }

})
*/

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  if (data.event === 'start') {
    if (isOnClick || isOnBreakClick) return;else {
      if (isOnClick == false) {
        isOnClick = true;
        //event.currentTarget.disabled = true;
        clearInterval(timerInterval);

        //updateStudy();   
        startTimer(countDate, 'Study Time');
      }
    }

    /*if (!isOnClick && !isOnBreakClick) {
        isOnClick = true;
        startTimer(countDate, 'study');
    }*/
  } else if (data.event === 'stop') {
    clearInterval(timerInterval);
    isOnClick = false;
    isOnBreakClick = false;
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
        //tell to play the sfx
        playSfx();
        /*if (isLoop) startTimer(countBreakDate, 'break'); 
        else sendUpdate('Break Time', tmpTime); */
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
        //send update to title
        //tell to play sfx
        playSfx();
        sendUpdate('Study Time', 0); // setTimeout(function() {updateStudy()}, 1000);
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
    sfx: _alarmsfx_mp3__WEBPACK_IMPORTED_MODULE_0__["default"]
  });
}
function formatTime(milliseconds) {
  var hrs = String(Math.floor(milliseconds / (1000 * 60 * 60) % 24)).padStart(2, '0');
  var mins = String(Math.floor(milliseconds / (1000 * 60) % 60)).padStart(2, '0');
  var secs = String(Math.floor(milliseconds / 1000 % 60)).padStart(2, '0');
  return "".concat(hrs, ":").concat(mins, ":").concat(secs);
}

/*
function updateStudy(){
    //let hrs, mins, secs;
    if(isOnClick == false) {
        isOnClick = true;
    }
    

    if(isOnClick) {// while loop
        timerElement.innerHTML = formatTime(countDate); //formatTimer(time)
        let tmpCountDate = countDate;
        breakOrStudyButton = document.getElementById("BreakOrStudy");
        breakOrStudyButton.innerHTML = "Study Time";
        timetext = setInterval(function () {
            if(isOnClick){
                tmpCountDate-=1000;
                timerElement.innerHTML = formatTime(tmpCountDate);//hrs+":"+mins+":"+secs; //formatTimer(time)

                if(tmpCountDate == 0){ 
                    breakOrStudyButton.innerHTML = "Break Time";
                    new Audio(sfx).play();
                }

                if(tmpCountDate == -1000){
                    clearInterval(timetext);
                    isOnClick = false;
                    tmpCountDate = countDate;
                    updateBreak();
                }
            }
            
        },1000);
        
    }

}

function updateBreak(){
    //let hrs, mins, secs;
    if(isOnBreakClick == false) {
        isOnBreakClick = true;
    }
    

    if(isOnBreakClick) {// while loop
        timerElement.innerHTML = formatTime(countBreakDate);
        let tmpCountDate = countBreakDate;
        breakOrStudyButton = document.getElementById("BreakOrStudy");
        breakOrStudyButton.innerHTML = "Break Time";
        timetext = setInterval(function () {
            if(isOnBreakClick){
                tmpCountDate-=1000;
                timerElement.innerHTML = formatTime(tmpCountDate)//hrs+":"+mins+":"+secs;

                if(tmpCountDate == 0){ 
                    //clearInterval(timetext);
                    //isOnBreakClick = false;
                    breakOrStudyButton.innerHTML = "Study Time";
                    new Audio(sfx).play();
                    
                }

                if(tmpCountDate == 0){
                    clearInterval(timetext);
                    if(isOnBreakClick == true){
                        isOnBreakClick = false;
                        if(isLoop){
                            setTimeout(function() {updateStudy()}, 1000);
                            
                        }
                    }
                }

            }
            
        },1000);
        
    }

}

*/
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUNLLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQzVFLFVBQUFSLE1BQUEsQ0FBVUksR0FBRyxPQUFBSixNQUFBLENBQUlTLElBQUksT0FBQVQsTUFBQSxDQUFJVSxJQUFJO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9hbGFybXNmeC5tcDMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImViYmMxMjZhNGFlMTA1NWEwMzU0NTZjODRhMTFiZWMzLm1wM1wiOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgc2Z4IGZyb20gXCIuL2FsYXJtc2Z4Lm1wM1wiO1xyXG5cclxubGV0IGlzT25DbGljayA9IGZhbHNlO1xyXG5sZXQgaXNPbkJyZWFrQ2xpY2sgPSBmYWxzZTtcclxubGV0IGlzTG9vcCA9IGZhbHNlO1xyXG5sZXQgdGltZXJJbnRlcnZhbDtcclxubGV0IGNvdW50RGF0ZSA9IDMgKiAxMDAwOyAvLyBEZWZhdWx0IHN0dWR5IHRpbWUgKDUgc2Vjb25kcylcclxubGV0IGNvdW50QnJlYWtEYXRlID0gMyAqIDEwMDA7IC8vIERlZmF1bHQgYnJlYWsgdGltZSAoMyBzZWNvbmRzKVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJqdXN0IGluc3RhbGxlZFwiKTtcclxuXHJcbiAgICBjb25zdCBkZWZhdWx0RGF0YSA9IHtcclxuICAgICAgICB0aW1lcjogMyAqIDEwMDAsICAvLyBkZWZhdWx0IHRpbWVyIC0gMyBzZWNvbmRzXHJcbiAgICB9O1xyXG4gICAgICBcclxuICAgIGNvbnN0IHVzZXJEYXRhID0ge1xyXG4gICAgICAgIHRpbWVyOiAwICAvLyB1c2VyIGN1c3RvbSB0aW1lclxyXG4gICAgfTtcclxuXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2RlZmF1bHREYXRhOiBkZWZhdWx0RGF0YX0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXRhIGhhcyBiZWVuIEluaXRhbGl6ZWQnKTtcclxuXHJcbiAgICAgICAgLyogY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdkZWZhdWx0RGF0YScsIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5kZWZhdWx0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRlZmF1bHREYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gZGF0YVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7ICovXHJcbiAgICB9KTtcclxuICAgIFxyXG59KVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChkYXRhLCBfLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIGlmIChkYXRhLmV2ZW50ID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICBjb25zdCByZXRyeURlbGF5ID0gNTAwOyAvLyBEZWxheSBiZXR3ZWVuIHJldHJpZXMgKGluIG1pbGxpc2Vjb25kcylcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiB0cnlHZXREYXRhKCkge1xyXG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2RlZmF1bHREYXRhJywgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kZWZhdWx0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kZWZhdWx0RGF0YS50aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHJlc3VsdC5kZWZhdWx0RGF0YS50aW1lcik7IC8vIFNlbmQgdGhlIHRpbWVyIHZhbHVlIG9uY2UgZGF0YSBpcyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBubyBkYXRhLCByZXRyeSBhZnRlciBhIGRlbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCh0cnlHZXREYXRhLCByZXRyeURlbGF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnlHZXREYXRhKCk7IC8vIEluaXRpYXRlIHRoZSBmaXJzdCBhdHRlbXB0XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmV0dXJuIHRydWUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgcmVzcG9uc2Ugd2lsbCBiZSBzZW50IGFzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLypcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihkYXRhID0+IHtcclxuICAgIGlmKGRhdGEuZXZlbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieWVzIC0gY29tbXMgYXJlIHdvcmtpbmdcIik7XHJcbiAgICAgICAgaWYoaXNPbkNsaWNrIHx8IGlzT25CcmVha0NsaWNrKSByZXR1cm47XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNPbkNsaWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpc09uQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy9ldmVudC5jdXJyZW50VGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3R1ZHkoKTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59KVxyXG4qL1xyXG5cclxuXHJcblxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChkYXRhLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgaWYgKGRhdGEuZXZlbnQgPT09ICdzdGFydCcpIHtcclxuXHJcbiAgICAgICAgaWYoaXNPbkNsaWNrIHx8IGlzT25CcmVha0NsaWNrKSByZXR1cm47XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNPbkNsaWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpc09uQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy9ldmVudC5jdXJyZW50VGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlU3R1ZHkoKTsgICBcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZXIoY291bnREYXRlLCAnU3R1ZHkgVGltZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKmlmICghaXNPbkNsaWNrICYmICFpc09uQnJlYWtDbGljaykge1xyXG4gICAgICAgICAgICBpc09uQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFydFRpbWVyKGNvdW50RGF0ZSwgJ3N0dWR5Jyk7XHJcbiAgICAgICAgfSovXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuZXZlbnQgPT09ICdzdG9wJykge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgaXNPbkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgaXNPbkJyZWFrQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICBzZW5kVXBkYXRlKCdTdHVkeSBUaW1lJywgY291bnREYXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5ldmVudCA9PT0gJ2xvb3AnKSB7XHJcbiAgICAgICAgaXNMb29wID0gIWlzTG9vcDtcclxuICAgICAgICBjb25zb2xlLmxvZygnTG9vcCBpcyAnICsgaXNMb29wKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5ldmVudCA9PT0gJ2dldFN0YXRlJykge1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7XHJcbiAgICAgICAgICAgIGlzT25DbGljayxcclxuICAgICAgICAgICAgaXNPbkJyZWFrQ2xpY2ssXHJcbiAgICAgICAgICAgIGNvdW50RGF0ZSxcclxuICAgICAgICAgICAgY291bnRCcmVha0RhdGUsXHJcbiAgICAgICAgICAgIGlzTG9vcCxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vIEVuc3VyZSBhc3luYyByZXNwb25zZVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0VGltZXIodGltZSwgdHlwZSkge1xyXG4gICAgY29uc3QgaW50ZXJ2YWxUaW1lID0gMTAwMDsgLy8gMSBzZWNvbmRcclxuICAgIGxldCB0bXBUaW1lID0gdGltZTtcclxuXHJcbiAgICBzZW5kVXBkYXRlKHR5cGUsIHRpbWUpO1xyXG4gICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0bXBUaW1lIC09IGludGVydmFsVGltZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0bXBUaW1lKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ1N0dWR5IFRpbWUnKSB7XHJcbiAgICAgICAgICAgIGlmICh0bXBUaW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vdGVsbCB0byBwbGF5IHRoZSBzZnhcclxuICAgICAgICAgICAgICAgIHBsYXlTZngoKTtcclxuICAgICAgICAgICAgICAgIC8qaWYgKGlzTG9vcCkgc3RhcnRUaW1lcihjb3VudEJyZWFrRGF0ZSwgJ2JyZWFrJyk7IFxyXG4gICAgICAgICAgICAgICAgZWxzZSBzZW5kVXBkYXRlKCdCcmVhayBUaW1lJywgdG1wVGltZSk7ICovXHJcbiAgICAgICAgICAgICAgICBzZW5kVXBkYXRlKCdCcmVhayBUaW1lJywgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRtcFRpbWUgPD0gLTEwMDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBpc09uQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZXIoY291bnRCcmVha0RhdGUsICdCcmVhayBUaW1lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VuZFVwZGF0ZSgnU3R1ZHkgVGltZScsIHRtcFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnQnJlYWsgVGltZScpIHtcclxuICAgICAgICAgICAgaWYgKHRtcFRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9zZW5kIHVwZGF0ZSB0byB0aXRsZVxyXG4gICAgICAgICAgICAgICAgLy90ZWxsIHRvIHBsYXkgc2Z4XHJcbiAgICAgICAgICAgICAgICBwbGF5U2Z4KCk7XHJcbiAgICAgICAgICAgICAgICBzZW5kVXBkYXRlKCdTdHVkeSBUaW1lJywgMCk7IC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7dXBkYXRlU3R1ZHkoKX0sIDEwMDApO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZiAodG1wVGltZSA8PSAtMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIGlzT25DbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTG9vcCkgc3RhcnRUaW1lcihjb3VudERhdGUsICdTdHVkeSBUaW1lJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VuZFVwZGF0ZSgnQnJlYWsgVGltZScsIHRtcFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgaW50ZXJ2YWxUaW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZFVwZGF0ZSh0eXBlLCB0aW1lKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgU2VuZGluZyAke3R5cGV9IHVwZGF0ZTogJHtmb3JtYXRUaW1lKHRpbWUpfWApO1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIGV2ZW50OiAndGltZXJVcGRhdGUnLFxyXG4gICAgICAgIHRpbWU6IGZvcm1hdFRpbWUodGltZSksXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5U2Z4KCkge1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIGV2ZW50OiAncGxheScsXHJcbiAgICAgICAgc2Z4OiBzZngsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0VGltZShtaWxsaXNlY29uZHMpIHtcclxuICAgIGNvbnN0IGhycyA9IFN0cmluZyhNYXRoLmZsb29yKChtaWxsaXNlY29uZHMgLyAoMTAwMCAqIDYwICogNjApKSAlIDI0KSkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIGNvbnN0IG1pbnMgPSBTdHJpbmcoTWF0aC5mbG9vcigobWlsbGlzZWNvbmRzIC8gKDEwMDAgKiA2MCkpICUgNjApKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3Qgc2VjcyA9IFN0cmluZyhNYXRoLmZsb29yKChtaWxsaXNlY29uZHMgLyAxMDAwKSAlIDYwKSkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIHJldHVybiBgJHtocnN9OiR7bWluc306JHtzZWNzfWA7XHJcbn1cclxuXHJcbi8qXHJcbmZ1bmN0aW9uIHVwZGF0ZVN0dWR5KCl7XHJcbiAgICAvL2xldCBocnMsIG1pbnMsIHNlY3M7XHJcbiAgICBpZihpc09uQ2xpY2sgPT0gZmFsc2UpIHtcclxuICAgICAgICBpc09uQ2xpY2sgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgaWYoaXNPbkNsaWNrKSB7Ly8gd2hpbGUgbG9vcFxyXG4gICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKGNvdW50RGF0ZSk7IC8vZm9ybWF0VGltZXIodGltZSlcclxuICAgICAgICBsZXQgdG1wQ291bnREYXRlID0gY291bnREYXRlO1xyXG4gICAgICAgIGJyZWFrT3JTdHVkeUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQnJlYWtPclN0dWR5XCIpO1xyXG4gICAgICAgIGJyZWFrT3JTdHVkeUJ1dHRvbi5pbm5lckhUTUwgPSBcIlN0dWR5IFRpbWVcIjtcclxuICAgICAgICB0aW1ldGV4dCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoaXNPbkNsaWNrKXtcclxuICAgICAgICAgICAgICAgIHRtcENvdW50RGF0ZS09MTAwMDtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKHRtcENvdW50RGF0ZSk7Ly9ocnMrXCI6XCIrbWlucytcIjpcIitzZWNzOyAvL2Zvcm1hdFRpbWVyKHRpbWUpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYodG1wQ291bnREYXRlID09IDApeyBcclxuICAgICAgICAgICAgICAgICAgICBicmVha09yU3R1ZHlCdXR0b24uaW5uZXJIVE1MID0gXCJCcmVhayBUaW1lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEF1ZGlvKHNmeCkucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRtcENvdW50RGF0ZSA9PSAtMTAwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1ldGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNPbkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wQ291bnREYXRlID0gY291bnREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUJyZWFrKCl7XHJcbiAgICAvL2xldCBocnMsIG1pbnMsIHNlY3M7XHJcbiAgICBpZihpc09uQnJlYWtDbGljayA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlzT25CcmVha0NsaWNrID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGlmKGlzT25CcmVha0NsaWNrKSB7Ly8gd2hpbGUgbG9vcFxyXG4gICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKGNvdW50QnJlYWtEYXRlKTtcclxuICAgICAgICBsZXQgdG1wQ291bnREYXRlID0gY291bnRCcmVha0RhdGU7XHJcbiAgICAgICAgYnJlYWtPclN0dWR5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCcmVha09yU3R1ZHlcIik7XHJcbiAgICAgICAgYnJlYWtPclN0dWR5QnV0dG9uLmlubmVySFRNTCA9IFwiQnJlYWsgVGltZVwiO1xyXG4gICAgICAgIHRpbWV0ZXh0ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZihpc09uQnJlYWtDbGljayl7XHJcbiAgICAgICAgICAgICAgICB0bXBDb3VudERhdGUtPTEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSh0bXBDb3VudERhdGUpLy9ocnMrXCI6XCIrbWlucytcIjpcIitzZWNzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRtcENvdW50RGF0ZSA9PSAwKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jbGVhckludGVydmFsKHRpbWV0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2lzT25CcmVha0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtPclN0dWR5QnV0dG9uLmlubmVySFRNTCA9IFwiU3R1ZHkgVGltZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBdWRpbyhzZngpLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0bXBDb3VudERhdGUgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1ldGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNPbkJyZWFrQ2xpY2sgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT25CcmVha0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge3VwZGF0ZVN0dWR5KCl9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LDEwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuKi8iXSwibmFtZXMiOlsic2Z4IiwiaXNPbkNsaWNrIiwiaXNPbkJyZWFrQ2xpY2siLCJpc0xvb3AiLCJ0aW1lckludGVydmFsIiwiY291bnREYXRlIiwiY291bnRCcmVha0RhdGUiLCJjaHJvbWUiLCJydW50aW1lIiwib25JbnN0YWxsZWQiLCJhZGRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJkZWZhdWx0RGF0YSIsInRpbWVyIiwidXNlckRhdGEiLCJzdG9yYWdlIiwibG9jYWwiLCJzZXQiLCJvbk1lc3NhZ2UiLCJkYXRhIiwiXyIsInNlbmRSZXNwb25zZSIsImV2ZW50IiwidHJ5R2V0RGF0YSIsImdldCIsInJlc3VsdCIsInNldFRpbWVvdXQiLCJyZXRyeURlbGF5Iiwic2VuZGVyIiwiY2xlYXJJbnRlcnZhbCIsInN0YXJ0VGltZXIiLCJzZW5kVXBkYXRlIiwidGltZSIsInR5cGUiLCJpbnRlcnZhbFRpbWUiLCJ0bXBUaW1lIiwic2V0SW50ZXJ2YWwiLCJwbGF5U2Z4IiwiY29uY2F0IiwiZm9ybWF0VGltZSIsInNlbmRNZXNzYWdlIiwibWlsbGlzZWNvbmRzIiwiaHJzIiwiU3RyaW5nIiwiTWF0aCIsImZsb29yIiwicGFkU3RhcnQiLCJtaW5zIiwic2VjcyJdLCJzb3VyY2VSb290IjoiIn0=
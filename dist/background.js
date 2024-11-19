/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
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
chrome.runtime.onMessage.addListener(function (data) {
  if (data.event == 'start') {
    console.log("yes - comms are working");
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsV0FBVyxDQUFDQyxXQUFXLENBQUMsWUFBTTtFQUN6Q0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7RUFFN0IsSUFBTUMsV0FBVyxHQUFHO0lBQ2hCQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBRztFQUN0QixDQUFDOztFQUVELElBQU1DLFFBQVEsR0FBRztJQUNiRCxLQUFLLEVBQUUsQ0FBQyxDQUFFO0VBQ2QsQ0FBQzs7RUFFRFAsTUFBTSxDQUFDUyxPQUFPLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDO0lBQUNMLFdBQVcsRUFBRUE7RUFBVyxDQUFDLEVBQUUsWUFBVztJQUM1REYsT0FBTyxDQUFDQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7O0lBRXZDO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksQ0FBQyxDQUFDO0FBRU4sQ0FBQyxDQUFDOztBQUVGTCxNQUFNLENBQUNDLE9BQU8sQ0FBQ1csU0FBUyxDQUFDVCxXQUFXLENBQUMsVUFBQ1UsSUFBSSxFQUFFQyxDQUFDLEVBQUVDLFlBQVksRUFBSztFQUM1RCxJQUFJRixJQUFJLENBQUNHLEtBQUssS0FBSyxTQUFTLEVBQUU7SUFDRjtJQUFBLElBRWZDLFVBQVUsR0FBbkIsU0FBU0EsVUFBVSxHQUFHO01BQ2xCakIsTUFBTSxDQUFDUyxPQUFPLENBQUNDLEtBQUssQ0FBQ1EsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFDQyxNQUFNLEVBQUs7UUFDaEQsSUFBSUEsTUFBTSxDQUFDYixXQUFXLEVBQUU7VUFDcEJGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDYyxNQUFNLENBQUNiLFdBQVcsQ0FBQ0MsS0FBSyxDQUFDO1VBQ3JDUSxZQUFZLENBQUNJLE1BQU0sQ0FBQ2IsV0FBVyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsTUFBTTtVQUNIO1VBQ0FhLFVBQVUsQ0FBQ0gsVUFBVSxFQUFFSSxVQUFVLENBQUM7UUFDdEM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDO0lBWkQsSUFBTUEsVUFBVSxHQUFHLEdBQUc7SUFjdEJKLFVBQVUsRUFBRSxDQUFDLENBQUM7O0lBRWQ7SUFDQSxPQUFPLElBQUk7RUFDZjtBQUNKLENBQUMsQ0FBQztBQUdGakIsTUFBTSxDQUFDQyxPQUFPLENBQUNXLFNBQVMsQ0FBQ1QsV0FBVyxDQUFDLFVBQUFVLElBQUksRUFBSTtFQUN6QyxJQUFHQSxJQUFJLENBQUNHLEtBQUssSUFBSSxPQUFPLEVBQUU7SUFDdEJaLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0VBRTFDO0FBRUosQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwianVzdCBpbnN0YWxsZWRcIik7XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdERhdGEgPSB7XHJcbiAgICAgICAgdGltZXI6IDMgKiAxMDAwLCAgLy8gZGVmYXVsdCB0aW1lciAtIDMgc2Vjb25kc1xyXG4gICAgfTtcclxuICAgICAgXHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IHtcclxuICAgICAgICB0aW1lcjogMCAgLy8gdXNlciBjdXN0b20gdGltZXJcclxuICAgIH07XHJcblxyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtkZWZhdWx0RGF0YTogZGVmYXVsdERhdGF9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGF0YSBoYXMgYmVlbiBJbml0YWxpemVkJyk7XHJcblxyXG4gICAgICAgIC8qIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnZGVmYXVsdERhdGEnLCAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGVmYXVsdERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kZWZhdWx0RGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIGRhdGFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAqL1xyXG4gICAgfSk7XHJcbiAgICBcclxufSlcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigoZGF0YSwgXywgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICBpZiAoZGF0YS5ldmVudCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgY29uc3QgcmV0cnlEZWxheSA9IDUwMDsgLy8gRGVsYXkgYmV0d2VlbiByZXRyaWVzIChpbiBtaWxsaXNlY29uZHMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdHJ5R2V0RGF0YSgpIHtcclxuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdkZWZhdWx0RGF0YScsIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGVmYXVsdERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGVmYXVsdERhdGEudGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShyZXN1bHQuZGVmYXVsdERhdGEudGltZXIpOyAvLyBTZW5kIHRoZSB0aW1lciB2YWx1ZSBvbmNlIGRhdGEgaXMgZm91bmRcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm8gZGF0YSwgcmV0cnkgYWZ0ZXIgYSBkZWxheVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHJ5R2V0RGF0YSwgcmV0cnlEZWxheSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5R2V0RGF0YSgpOyAvLyBJbml0aWF0ZSB0aGUgZmlyc3QgYXR0ZW1wdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJldHVybiB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIHJlc3BvbnNlIHdpbGwgYmUgc2VudCBhc3luY2hyb25vdXNseVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZGF0YSA9PiB7XHJcbiAgICBpZihkYXRhLmV2ZW50ID09ICdzdGFydCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInllcyAtIGNvbW1zIGFyZSB3b3JraW5nXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSlcclxuXHJcblxyXG4iXSwibmFtZXMiOlsiY2hyb21lIiwicnVudGltZSIsIm9uSW5zdGFsbGVkIiwiYWRkTGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiZGVmYXVsdERhdGEiLCJ0aW1lciIsInVzZXJEYXRhIiwic3RvcmFnZSIsImxvY2FsIiwic2V0Iiwib25NZXNzYWdlIiwiZGF0YSIsIl8iLCJzZW5kUmVzcG9uc2UiLCJldmVudCIsInRyeUdldERhdGEiLCJnZXQiLCJyZXN1bHQiLCJzZXRUaW1lb3V0IiwicmV0cnlEZWxheSJdLCJzb3VyY2VSb290IjoiIn0=
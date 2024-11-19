chrome.runtime.onInstalled.addListener(() => {
    console.log("just installed");

    const defaultData = {
        timer: 3 * 1000,  // default timer - 3 seconds
    };
      
    const userData = {
        timer: 0  // user custom timer
    };

    chrome.storage.local.set({defaultData: defaultData}, function() {
        console.log('Data has been Initalized');

        /* chrome.storage.local.get('defaultData', (result) => {
            if (result.defaultData) {
                console.log(result.defaultData);
            } else {
                console.log("no data")
            }
        }); */
    });
    
})

chrome.runtime.onMessage.addListener((data, _, sendResponse) => {
    if (data.event === 'default') {
        const retryDelay = 500; // Delay between retries (in milliseconds)
        
        function tryGetData() {
            chrome.storage.local.get('defaultData', (result) => {
                if (result.defaultData) {
                    console.log(result.defaultData.timer);
                    sendResponse(result.defaultData.timer); // Send the timer value once data is found
                } else {
                    // If no data, retry after a delay
                    setTimeout(tryGetData, retryDelay);
                }
            });
        }

        tryGetData(); // Initiate the first attempt
        
        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});


chrome.runtime.onMessage.addListener(data => {
    if(data.event == 'start') {
        console.log("yes - comms are working");
        
    }

})



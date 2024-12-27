import sfx from "./alarmsfx.mp3";

let isOnClick = false;
let isOnBreakClick = false;
let isLoop = false;
let timerInterval;
let countDate = 3 * 1000; 
let countBreakDate = 3 * 1000; 

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
    });
    
})

chrome.runtime.onMessage.addListener((data, _, sendResponse) => {
    if (data.event === 'default') {
        const retryDelay = 500; // Delay between retries (in milliseconds)
        
        function tryGetData() {
            chrome.storage.local.get('defaultData', (result) => {
                if (result.defaultData) {
                    //console.log(result.defaultData.timer);
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




chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    if (data.event === 'start') {
        if(isOnClick || isOnBreakClick) return;
        else{
            if(isOnClick == false) {
                isOnClick = true;
                clearInterval(timerInterval);  
                startTimer(countDate, 'Study Time');
            }
        }

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
            isOnClick,
            isOnBreakClick,
            countDate,
            countBreakDate,
            isLoop,
        });
        return true;  // Ensure async response
    }
});

function startTimer(time, type) {
    const intervalTime = 1000; // 1 second
    let tmpTime = time;

    sendUpdate(type, time);
    timerInterval = setInterval(() => {
        tmpTime -= intervalTime;
        console.log(tmpTime);
        if (type === 'Study Time') {
            if (tmpTime == 0) {
                playSfx();
                sendUpdate('Break Time', 0);
                
            } 

            else if (tmpTime <= -1000) {
                clearInterval(timerInterval);
                isOnClick = false;
                startTimer(countBreakDate, 'Break Time');
            }
            
            else {
                sendUpdate('Study Time', tmpTime);
            }
        } 
        
        else if (type === 'Break Time') {
            if (tmpTime == 0) {
                playSfx();
                sendUpdate('Study Time', 0);
            } 

            else if (tmpTime <= -1000) {
                clearInterval(timerInterval);
                isOnClick = false;
                if (isLoop) startTimer(countDate, 'Study Time');
            }

            else {
                sendUpdate('Break Time', tmpTime);
            }
        }
    }, intervalTime);
}

function sendUpdate(type, time) {
    console.log(`Sending ${type} update: ${formatTime(time)}`);
    chrome.runtime.sendMessage({
        event: 'timerUpdate',
        time: formatTime(time),
        type: type,
    });
}

function playSfx() {
    chrome.runtime.sendMessage({
        event: 'play',
        sfx: sfx,
    });
}

function formatTime(milliseconds) {
    const hrs = String(Math.floor((milliseconds / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const mins = String(Math.floor((milliseconds / (1000 * 60)) % 60)).padStart(2, '0');
    const secs = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

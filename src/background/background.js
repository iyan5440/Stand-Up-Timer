import sfx from "./alarmsfx.mp3";

let isOnClick = false;
let isOnBreakClick = false;
let isLoop = false;
//let pingSfx = new Audio(sfx);
let volume;
let timerInterval;
let countDate; 
let countBreakDate; 
//let audioObject;

chrome.runtime.onInstalled.addListener(() => {
    console.log("just installed");
    
    const defaultdata = {
        timer: 1 * 10 * 1000,//3 * 1000, //30 * 60 * 1000,  // default timer - 3 seconds
        breakTimer: 30 * 1000,
        defaultVolume: 0.5
    }; 

    countDate = defaultdata.timer;
    countBreakDate = defaultdata.breakTimer;
    volume = defaultdata.defaultVolume;
})

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
        //if in blur do not send update
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
        volume: volume,
    });

}

function formatTime(milliseconds) {
    const hrs = String(Math.floor((milliseconds / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const mins = String(Math.floor((milliseconds / (1000 * 60)) % 60)).padStart(2, '0');
    const secs = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

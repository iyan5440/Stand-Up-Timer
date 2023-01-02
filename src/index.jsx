import React from "react";
import { render } from "react-dom";
import sfx from "./alarmsfx.mp3";
import "./index.css";

function Index() {
    const defaultTime = "00:00:03";
    let countDate = (defaultTime.substring(0,2) * 3600000) + (defaultTime.substring(3,5) * 60000) + (defaultTime.substring(6,8) * 1000); //new Date(defaultTime).getTime();
    let isOnClick = false;
    let timetext;
    let timerButton;
    let breakOrStudy = isOnClick ? "Study Time" : "Break Time";
    let breakOrStudyButton;
    
    const handleStartClick  = event => {
        if(isOnClick == false) {
            isOnClick = true;
            event.currentTarget.disabled = true;
            
            update();
        }
        event.currentTarget.disabled = false;
    };

    function update(){
        let hrs, mins, secs;
        if(isOnClick == false) {
            isOnClick = true;
        }
        

        if(isOnClick) {// while loop
            timerButton = document.getElementById("timer");
            timerButton.innerHTML = defaultTime;
            let tmpCountDate = countDate;
            breakOrStudyButton = document.getElementById("BreakOrStudy");
            breakOrStudyButton.innerHTML = isOnClick ? "Study Time" : "Break Time";
            timetext = setInterval(function () {
                if(isOnClick){
                    tmpCountDate-=1000;
                    //console.log(""+tmpCountDate);
                    hrs = (Math.floor((tmpCountDate) / (1000 * 60 * 60))).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                    mins = (Math.floor((tmpCountDate % (1000 * 60 * 60)) / (1000 * 60))).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                    secs = (Math.floor((tmpCountDate % (1000 * 60)) / 1000)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                    
                    //console.log(hrs+":"+mins+":"+secs);
                    timerButton.innerHTML = hrs+":"+mins+":"+secs;
    
                    if(tmpCountDate == 0){ 
                        clearInterval(timetext);
                        isOnClick = false;
                        breakOrStudyButton.innerHTML = breakOrStudy;
                        new Audio(sfx).play();
                    }
                }
                
            },1000);
            
        }

    }

    const handleClearClick  = event => {
        if(isOnClick == true) {
            isOnClick = false;
            //handleStartClick.event.currentTarget.disabled = false;
            breakOrStudyButton.innerHTML = breakOrStudy;
        }
        clearInterval(timetext);
        timerButton.innerHTML = defaultTime;
        breakOrStudyButton.innerHTML = breakOrStudy;
    };


    return (
        <div>
            <button className="settings-button">O</button>

            <div className="flex column ">
                <h3 id="BreakOrStudy">{breakOrStudy}</h3>
                <h1 id="timer">{defaultTime}</h1>
                
                
            </div>

            <div className="button-container flex">
                <button className="button-items" onClick={handleStartClick}>
                    Start
                </button>
                <button className="button-items" onClick={handleClearClick}>Clear</button>
            </div>

            <button className="settings-button">O</button>
        </div>
    );
}

render(<Index />, document.getElementById("react-target"));
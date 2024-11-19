import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import sfx from "./alarmsfx.mp3";
import "./index.css";


let timerElement;

function Index() {
    /*
    const defaultTime = "00:00:03";
    let countDate = (defaultTime.substring(0,2) * 3600000) + (defaultTime.substring(3,5) * 60000) + (defaultTime.substring(6,8) * 1000); //new Date(defaultTime).getTime();
    const defaultBreakTime = "00:00:03";
    let countBreakDate = (defaultTime.substring(0,2) * 3600000) + (defaultTime.substring(3,5) * 60000) + (defaultTime.substring(6,8) * 1000); //new Date(defaultTime).getTime();
    */
    
    let countDate; //new Date(defaultTime).getTime();
    //const defaultBreakTime = "00:00:03";
    let countBreakDate;

    
    let isOnClick = false;
    let isOnBreakClick = false;
    let isLoop = false;
    var timetext;
    //const timerElement = document.getElementById("timer");
    document.addEventListener("DOMContentLoaded", function () {
        timerElement = document.getElementById("timer");
    });
    
    let breakOrStudy = isOnClick ? "Study Time" : "Break Time";
    let breakOrStudyButton;

    

    const formatTime = (milliseconds) => {
        const hrs = String(Math.floor((milliseconds / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const mins = String(Math.floor((milliseconds / (1000 * 60)) % 60)).padStart(2, '0');
        const secs = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    chrome.runtime.sendMessage({event: 'default'}, (response) => {
        console.log("worked out", response);
        countDate = response;
        countBreakDate = response;
        timerElement.innerHTML = formatTime(countDate); //formatTimer(time)
        console.log("worked out");
    }); //new Date(defaultTime).getTime();

    const defaultTime = "00:00:03";//formatTime(countDate);//"00:00:03";
    
    const handleStartClick  = event => {
        chrome.runtime.sendMessage({event: 'start'});


        if(isOnClick || isOnBreakClick) return;
        else{
            if(isOnClick == false) {
                isOnClick = true;
                //event.currentTarget.disabled = true;
                
                updateStudy();   
            }
        }
        

        //event.currentTarget.disabled = false;
    };

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

    const handleLoopClick = event =>{
        isLoop = !isLoop;
        console.log(isLoop);
    }

    const handleClearClick  = event => {
        /*if(isOnClick == true) {
            isOnClick = false;
            breakOrStudyButton.innerHTML = breakOrStudy;
        }*/
        isOnClick = false;
        isOnBreakClick = false;
        clearInterval(timetext);
        timerElement.innerHTML = formatTime(countDate);
        breakOrStudyButton.innerHTML = breakOrStudy;
    };

    return (
        <div>
            <button className="settings-button">S</button>
            

            <div className="flex column ">
                <h3 id="BreakOrStudy">{breakOrStudy}</h3>
                <h1 id="timer">{"Yeah"}</h1>
                
                
            </div>

            <div className="button-container flex">
                
                <button className="button-items" onClick={handleStartClick}>
                    Start
                </button>
                <button className="button-items" onClick={handleClearClick}>Clear</button>
                
            </div>

            <button className="settings-button" onClick={handleLoopClick}>O</button>

        </div>
    );
}

render(<Index />, document.getElementById("react-target"));
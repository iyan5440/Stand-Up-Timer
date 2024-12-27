import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";




let timerElement;

export function App() {
    document.addEventListener("DOMContentLoaded", function () {
        timerElement = document.getElementById("timer");
    });

    const [timer, setTimer] = useState("00:00:03");
    const [isLoop, setIsLoop] = useState(false);
    const [currentMode, setCurrentMode] = useState("Study Time");
    const navigate = useNavigate();

    function AppToSettings() {
        navigate('/settings');
    }

    useEffect(() => {
        const handleTimerUpdate = (message) => {
          console.log("Received message: ", message); 
          if (message.event === "timerUpdate") {
            console.log("Updating timer with time:", message.time);
            setTimer(message.time);
            setCurrentMode(message.type);
          }
        };
    
        chrome.runtime.onMessage.addListener(handleTimerUpdate);
    
        // Cleanup the listener when the component unmounts
        return () => {
          chrome.runtime.onMessage.removeListener(handleTimerUpdate);
        };
      }, []);
    
    const handleStartClick  = event => {
        chrome.runtime.sendMessage({event: 'start'});
    };

    const handleLoopClick = event =>{
        setIsLoop(!isLoop);
        chrome.runtime.sendMessage({ event: "loop" });
    }

    const handleClearClick  = event => {
        chrome.runtime.sendMessage({ event: "stop" });
    };

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.event === 'play') {
                new Audio(message.sfx).play();
            }
        });
    }, []);

    return (
        <div>
            <button className="settings-button" onClick={AppToSettings}>S</button>
            

            <div className="flex column ">
                <h3 id="BreakOrStudy">{currentMode}</h3>
                <h1 id="timer">{timer}</h1>
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

//render(<App />, document.getElementById("react-target"));
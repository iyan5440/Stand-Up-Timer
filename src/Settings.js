import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


export function Settings() {

    const navigate = useNavigate();
    const [sliderValue, setSliderValue] = useState(50);

    //modifying the times for user times

    const sendVolumeToBackground = () => {
        chrome.runtime.sendMessage({ 
            event: "setVolume",
            volume: sliderValue
        })
    };

    function SettingsToApp() {
        sendVolumeToBackground();
        navigate('/index.html');
    }

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value); // Update state
        console.log("Slider value:", event.target.value); // Log the new value
    };


    useEffect(() => {

        window.addEventListener('blur', sendVolumeToBackground);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('blur', sendVolumeToBackground);
        };
    }, [sliderValue]); 



return (
        <div>
            <button className="settings-button" onClick={SettingsToApp}> M</button>
            

            <div className="flex column">
                <h3>Settings</h3>
                <div>
                    <label htmlFor="volumeSlider">Volume:</label>
                    <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value={sliderValue} onChange={handleSliderChange}/>
                </div>
            </div>


        </div>
    );
}
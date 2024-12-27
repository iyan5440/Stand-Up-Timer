import { useNavigate } from "react-router-dom";


export function Settings() {

    const navigate = useNavigate();

    function SettingsToApp() {
        navigate('/index.html');
    }

return (
        <div>
            <button className="settings-button" onClick={SettingsToApp}> M</button>
            

            <div className="flex column">
                <h3>Settings</h3>
                <h1>Testing</h1>
            </div>

            <div className="button-container flex">
                
                <button className="button-items" >
                    Set
                </button>
                <button className="button-items" >Clear</button>
                
            </div>

            <button className="settings-button">O</button>

        </div>
    );
}
import React from "react";
import { render } from "react-dom";

function Index() {
    return (
        <div>
            <h1>Welcome to my Extension</h1>
        </div>
    );
}

render(<Index />, document.getElementById("react-target"));
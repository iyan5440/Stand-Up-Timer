import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "./App.js"
import { Settings } from "./Settings"; 



export const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/index.html" element={<App />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
            </Routes>
        </Router>
    );
}
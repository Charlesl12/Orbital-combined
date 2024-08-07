import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Homepage.css";
import Sidebar from "./Sidebar";
import ComSciMods from "./Courses/Comsci"; 
import BzaMods from "./Courses/Bza"; 
import InfoSysMods from "./Courses/Infosys"; 
import InfoSecMods from "./Courses/Infosec"; 


export default function GradTracker() {
    const [selectedOption, setSelectedOption] = useState(""); 
    const [isSelectionSaved, setIsSelectionSaved] = useState(false); 

    // Function to save selection to local storage
    const saveSelection = () => {
        localStorage.setItem("selectedOption", selectedOption);
        setIsSelectionSaved(true); 
        alert("Selection saved!");
    };

    // Function to delete all local storage content
    const deleteAllLocalStorage = () => {
        localStorage.clear();
        setSelectedOption("");
        setIsSelectionSaved(false); 
        alert("Local storage cleared!");
    };

    // Function to render info based on selected option
    useEffect(() => {
        const savedOption = localStorage.getItem("selectedOption");
        if (savedOption) {
            setSelectedOption(savedOption);
            setIsSelectionSaved(true); 
        }
    }, []); 
    const renderSelectedComponent = () => {
        switch(selectedOption) {
            case "CS":
                return <ComSciMods />;
            case "BZA":
                return <BzaMods />;
            case "INFO SYS":
                return <InfoSysMods />;
            case "INFO SEC":
                return <InfoSecMods />;
            default:
                return <h3>Please select an option</h3>;
        }
    };

    return (
    <>
        <div className="container">
        <Sidebar />

        <div className="content">
            <h2>Select an option:</h2>
            <select
            id="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            >
            <option value="">Select an option</option>
            <option value="CS">CS</option>
            <option value="BZA">BZA</option>
            <option value="INFO SYS">INFO SYS</option>
            <option value="INFO SEC">INFO SEC</option>
            </select>
            <button onClick={saveSelection} className="btn btn-success">Save Selection</button>
            <button onClick={deleteAllLocalStorage} className="btn btn-danger">Delete All</button>

            {renderSelectedComponent()}

        </div>
        </div>
    </>
);
}

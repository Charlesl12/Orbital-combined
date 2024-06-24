import React, {useState, useEffect} from "react";
import {Routes, Route, Link } from "react-router-dom";
import "../Homepage.css";

export default function GradTracker() {
    return(   
        <>
        <div className="container">
            <div className="sidebar">
                <div className="list-group">
                    <Link to="/homepage/coursetracker" className="list-group-item list-group-item-action">
                        Course Tracker
                    </Link>
                    <Link to="/homepage/suggestedroadmap" className="list-group-item list-group-item-action">
                        Suggested Roadmap
                    </Link>
                    <Link to="/homepage/usefullinks" className="list-group-item list-group-item-action">
                        Useful Links
                    </Link>
                </div>
            </div>

            <div className="content">
                    <p>Course Tracker in progress</p>
            </div>
        </div>        
        </>
    )
}
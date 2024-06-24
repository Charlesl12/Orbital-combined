import React, {useState, useEffect} from "react";
import {Routes, Route, Link } from "react-router-dom";
import "../Homepage.css";

const links = [
    {   url: "https://nusmods.com/courses",
        name: "NUSMODS (CLICK ME)",
        description: "- is the website to check modules information, \
                        venue and crafting your timetable."
    },
    
    {   url: "https://myedurec.nus.edu.sg",
        name: "Edurec (CLICK ME)",
        description: "- website to bid for modules, school fees \
                        and settle all things related to your time in NUS"
    },
    
    {   url: "https://www.nus.edu.sg/canvas/login/",
        name: "Canvas web (CLICK ME)",
        description: "- to access your course materials, \
                        submit assignments and check your grades."
    },

    {
        url: "https://www.google.com/search?q=canvas+student+download",
        name: "Canvas Mobile App (CLICK ME)",
        description: "- Allows student to track their assignments that need to be submitted, every week"
    },

    {
        url: "https://univus.nus.edu.sg/",
        name: "Univus (CLICK ME)",
        description: "- uNivUS is the gateway app uniting NUS individuals and resources."
    },

    {
        url: "https://www.google.com/search?q=NUS+NextBus",
        name: "NUS NextBus",
        description: "- is a mobile app that provides real-time bus arrival information to NUS students"        
    },
]


export default function UsefulLink() {
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
                <ol>
                    {links.map((link, index) => (
                        <li key={index} style={{paddingBottom: "20px"}}>
                            <a 
                            href={link.url} 
                            target="_blank"
                            style={{color: "#ff5138"}}>{link.name}</a> {link. description}
                        </li>
                    ))}
                </ol>                     
            </div>
        </div>
        </>
    )
}
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Homepage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
    
export default function Homepage({ setAut }) {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("https://orbital-server-u1ma.onrender.com/homepage", {
                method: "GET",
                headers: { "jwtToken": localStorage.jwtToken }
            });

            const parseRes = await response.json();

            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
    }, []);

    return (
        <>
            <h1>Homepage</h1>
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

                <div className="content" style={{textAlign: 'center'}}>
                    <h2>Welcome!</h2>
                    <p>Course Tracker - To keep track of your modules left</p>
                    <p>Suggested Roadmap - Give a general idea on how to clear your modules during university</p>
                    <p>Useful Links - Links to various websites that are important for SOC students</p>
                </div>
            </div>
        </>
    );
}

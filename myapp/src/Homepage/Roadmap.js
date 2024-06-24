import React from "react";
import { Link } from "react-router-dom";
import "../Homepage.css";
import Accordion from "./Accodion"; 
import cs from "./cs.png";
import bza from "./bza.png";

const accordionData = [
    {
        id: 1,
        title: 'CS',
        content: 
        (
            <>
                <p>
                NOTE: this is just a sample roadmap. Please consult with your seniors or friends for the most accurate information.
                </p>
                
                Try not to attempt taking holy trinity (CS2030S, CS2040S, CS2100) in the same semester. Most take CS2030S and CS2040S
                in the same semester to unlock CS2103T SWE mod. 
                <p>
                Only take CS2100 early on to if you are interested in CS2106.
                </p>

                <p>
                Usually take 3 CS mods per semester the rest for UE/GE mods.
                <br></br>
                <b>IF YOU ARE WEAK IN MATH can just take CS1231S, MA1521, MA1522 and SU them first sem. 
                <br></br>
                Getting D with low effort is possible</b>
                </p>
            </>
        ),
        link: (<img src={cs} alt="CS Roadmap"/>),
    },
    {
        id: 2,
        title: 'BZA',
        content: (<>
                    NOTE: this is just a sample roadmap. Please consult with your seniors or friends for the most accurate information.
                    <br/>
                    The <span style={{color: " #FFC300 "}}>yellow</span> highlighted mods are 2nd major just replace them 
                    ith UEs if you are not doing 2nd major.
                </>),
        link: (<img src={bza} alt="BZA Roadmap"/>)
    },

    {
        id: 3,
        title: 'InfoSys',
        content: (
            <>
                NOTE: this is just a sample roadmap. Please consult with your seniors or friends for the most accurate information.
                <br />
                Below is a link to a Google Form for you to plan your mods and to keep track of mods done.
                <p>.
                <br></br>
                <b>IF YOU ARE WEAK IN MATH can just take CS1231S, MA1521 and SU them first sem. 
                <br></br>
                Getting D with low effort is possible</b>
                </p>
            </>
        ),
        link: (
            <a href="https://docs.google.com/spreadsheets/d/1JrTv3gMZeKl5XpI-Af4JqqZfsj5vRGQZgWKXQSPg6Ac/edit?ref=tayjeanyee.com&gid=273525867#gid=273525867"
                target="_blank"
                rel="noreferrer">
                Link to Google Form</a>),
    },

    {
        id: 4,
        title: 'InfoSec',
        content: 'NOTE: Work in progress',
    },
];

export default function Roadmap() {
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
                    <Accordion data={accordionData} />  
                </div>
            </div>
        </>
    );
}

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
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
                    <Link to="/homepage/recommendation" className="list-group-item list-group-item-action">
                        Recommendation
                    </Link>
                </div>
            </div>
    );
};

export default Sidebar;
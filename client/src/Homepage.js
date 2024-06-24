import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage({setAut}) {

    const [name, setName] = useState("");
        
    async function getName() {
        try {
            const response = await fetch("https://orbital-server-u1ma.onrender.com/homepage", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            
            const parseRes = await response.json();
            setName(parseRes.user_name);

        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
    });

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAut(false);
        toast.success("Logged out successfully");
    };

    return(   
        <>
            <h1>Homepage {name}</h1>
            <button className= "btn btn-primary"
                onClick={(e) => {logout(e)}}>
                    Logout
            </button>
        </>
    );
}
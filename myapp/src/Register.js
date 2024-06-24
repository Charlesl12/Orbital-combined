import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({setAut}) {

    const[inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {name, email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const response = await fetch("https://orbital-server-u1ma.onrender.com/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name, email, password
                })
            });

            const parseRes = await response.json();
            
            if (parseRes.jwtToken) {
                localStorage.setItem("jwt_token", parseRes.jwtToken);
                setAut(true);
                toast.success("Registered successfully");
            } else {
                setAut(false);
                toast.error(parseRes);
            } 
            
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return(
        <>
        <h1 className="text-center my-5">Register</h1>
        <form onSubmit = {onSubmitForm}>
            <input
                type="name" 
                name ="name"
                placeholder="enter your name"
                class="form-control my-3"
                value={name}
                onChange={e => onChange(e)}
            />
            <input 
                type="email" 
                name ="email"
                placeholder="enter your email"
                class="form-control my-3"
                value={email}
                onChange={e => onChange(e)}
            />
            <input
                type="password" 
                name ="password"
                placeholder="enter your password"
                class= "form-control my-3"
                value={password}
                onChange={e => onChange(e)}
            />
            <button class ="btn btn-success btn-block">
                Submit</button>
        </form>
        <Link to = "/login">Login</Link>
        </>
    );
}
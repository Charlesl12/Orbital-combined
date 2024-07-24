import React, { useState } from "react";
import './Chatbot.css'; 

export default function ChatBot() {
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = query; 
        setChatHistory([...chatHistory, { query: userMessage, response: "loading" }]);
        setQuery("");
        setLoading(true); 
        setResponse("");

        try {
            const res = await fetch("http://localhost:5001/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: userMessage, chat_history: chatHistory })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setChatHistory(prevHistory =>
                prevHistory.map((item, index) =>
                    index === prevHistory.length - 1 ? { ...item, response: data.answer } : item
                )
            );
            setResponse(data.answer);
            setError("");
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
            setChatHistory(prevHistory =>
                prevHistory.map((item, index) =>
                    index === prevHistory.length - 1 ? { ...item, response: "Error" } : item
                )
            );
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="chatbot-container">
            <h2>ChatBot</h2>
            <div className="chatbot-messages">
                {chatHistory.map((item, index) => (
                    <div key={index} className="chatbot-message-container">
                        <div className="chatbot-message user-message">
                            {item.query}
                        </div>
                        <div className="chatbot-message bot-message">
                            {item.response === "loading" ? "Typing..." : item.response}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chatbot-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question"
                    className="chatbot-input"
                />
                <button type="submit" className="chatbot-submit-button">Submit</button>
            </form>
            {error && <p className="chatbot-error">{error}</p>}
        </div>
    );
}
import React from 'react';
import ChatBot from './Chatbot';
import Sidebar from './Sidebar';

export default function Recommendation() {
  return(   
    <>
        <div className="container">
            <Sidebar />
            <div className="content">
                <ChatBot />  
            </div>
        </div>
    </>
  );
}

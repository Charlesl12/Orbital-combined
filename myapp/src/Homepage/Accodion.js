import React from "react";


export default function Accordion({ data }) {
    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            {data.map(item => (
                <div className="accordion-item" key={item.id}>
                    <h2 className="accordion-header">
                        <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={`#${item.id}`} 
                            aria-expanded="false" 
                            aria-controls={item.id}
                        >
                            {item.title}
                        </button>
                    </h2>
                    <div 
                        id={item.id} 
                        className="accordion-collapse collapse" 
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body" >
                            {[item.content, item.link]}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

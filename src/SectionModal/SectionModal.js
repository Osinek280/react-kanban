import React from "react";

function SectionModal () {
    return(
        <div className="form-container">
            <div className="form">
                <div className="form-group">
                    <label className="form-label" style={{marginBottom: '3px'}}>Section Name</label>
                    <input
                        id="section-name-input"
                        type="text"
                        className="form-input"
                        placeholder="e.g Take coffee break"
                    />
                    
                <button className="form-submit-button">Add new Section</button>
                </div>
            </div>
        </div> 
    )
}

export default SectionModal
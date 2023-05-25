import React, {useContext} from "react";
import { KanbanContext } from "../KanbanContext";

function SectionModal ( {onClose} ) {

    const { Kanban, replaceTasks, replaceSections } = useContext(KanbanContext)

    const addNewSection = () => {
        replaceSections([...Kanban.section, document.querySelector('#section-name-input').value])
        onClose()
    };  

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
                    
                <button className="form-submit-button" onClick={addNewSection}
                    >Add new Section
                </button>
                </div>
            </div>
        </div> 
    )
}

export default SectionModal
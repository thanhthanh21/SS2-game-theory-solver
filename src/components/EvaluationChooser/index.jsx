import React from 'react';
import "./style.scss";
import InputHint from '../InputHint';
import { useState, useContext } from 'react';

export default function Input({ evaluation, setEvaluation }) {
    // const playerHolder = error ? message: message
    const [showHint, setShowHint] = useState(false);

    const handleMouseOver = () => {
        setShowHint(true);
        
    }
    const handleMouseLeave = () => {
        setShowHint(false);
        
    }
    const checkIfSelected = (value) => {
        return evaluation == value;
    }

    const handleSelect = (value) => {
        setEvaluation(value);
    }
    
    return (
        <>
            <div className='evaluation-chooser'>
                <div className='text'>
                    <p className="bold">Set the evaluation parameter: </p>
                    <i className="info fa-solid fa-info" onMouseOver={handleMouseOver}  onMouseLeave={handleMouseLeave}></i>
                </div>
                <InputHint
                    showHint={showHint}
                    setShowHint={setShowHint}
                    heading="Total of evaluation by algorithm"
                    description="For more evaluation run by the algorithm, the result is accurate, but longer time to process"
                    guideSectionIndex={8}
                />
                <p className={`evaluation-param ${checkIfSelected(100) ? 'selected' : ''}`} onClick={e => handleSelect(100)}>100</p>
                <p className={`evaluation-param ${checkIfSelected(200) ? 'selected' : ''}`} onClick={e => handleSelect(200)}>200</p>
                <p className={`evaluation-param ${checkIfSelected(300) ? 'selected' : ''}`} onClick={e => handleSelect(300)}>300</p>
                <p className={`evaluation-param ${checkIfSelected(500) ? 'selected' : ''}`} onClick={e => handleSelect(500)}>500</p>
                <p className={`evaluation-param ${checkIfSelected(1000) ? 'selected' : ''}`} onClick={e => handleSelect(1000)}>1000</p>

            </div>

        </>

    )
}
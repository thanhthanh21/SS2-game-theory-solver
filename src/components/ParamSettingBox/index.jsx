import React from 'react';
import "./style.scss";
import InputHint from '../InputHint';
import { useState, useContext } from 'react';
import Param from '../Param';

export default function Input({ distributedCoreParam, setDistributedCoreParam, populationSizeParam, setPopulationSizeParam, generationParam , setGenerationParam, maxTimeParam, setMaxTimeParam }) {
    // const playerHolder = error ? message: message
    const [showHint, setShowHint] = useState(false);

    const handleMouseOver = () => {
        setShowHint(true);

    }
    const handleMouseLeave = () => {
        setShowHint(false);

    }
 

    const handleSelectCoreParam = (value) => {
        setDistributedCoreParam(value);
    }

    return (
        <>
            <div className='param-setting-box'>

                <div className="distributed-core-param">
                    <InputHint
                        showHint={showHint}
                        setShowHint={setShowHint}
                        heading="Total of evaluation by algorithm"
                        description="For more evaluation run by the algorithm, the result is accurate, but longer time to process"
                        guideSectionIndex={8}
                    />
                    <div className='text'>
                        <i className="info fa-solid fa-info" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></i>
                        <p className="bold">Number of distributed processing CPU cores:</p>
                    </div>
                    <select name="" id="" value={distributedCoreParam} onChange={e => handleSelectCoreParam(e.target.value)}>
                        <option value="2">2 cores</option>
                        <option value="4">4 cores</option>
                        <option value="8">8 cores</option>
                        <option value="all">All available cores</option>
                    </select>
                </div>


                <Param
                    inputText="Define the population size:"
                    paramVal={populationSizeParam}
                    setParamVal={setPopulationSizeParam}
                />
                <Param
                    inputText="Enter the number of crossover generations:"
                    paramVal={generationParam}
                    setParamVal={setGenerationParam}
                />
                <Param
                    inputText="Maximum execution time in millseconds:"
                    paramVal={maxTimeParam}
                    setParamVal={setMaxTimeParam}
                />
            </div>




        </>

    )
}
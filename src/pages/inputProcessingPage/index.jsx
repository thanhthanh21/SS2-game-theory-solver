// Phuc
import React from 'react'
import "./style.scss"
import { useNavigate } from 'react-router'

import { useContext, useState, useEffect } from 'react'
import Player from '../../components/Player';
import axios from 'axios';
import DataContext from "../../context/DataContext"
import NothingToShow from '../../components/NothingToShow';
import Loading from '../../components/Loading';
import ParamSettingBox from '../../components/ParamSettingBox';
import PopupContext from '../../context/PopupContext';
//TODO: algorithm selection
export default function InputProcessingPage() {
    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [algorithm, setAlgorithm] = useState('NSGAII');
    const [distributedCoreParam, setDistributedCoreParam] = useState("all")
    const [populationSizeParam, setPopulationSizeParam] = useState(1000)
    const [generationParam, setGenerationParam] = useState(100)
    const [maxTimeParam, setMaxTimeParam] = useState(5000)

    const { displayPopup } = useContext(PopupContext)

    useEffect(() => {
        if (!data || !data.problem) return;
        document.title = data.problem.name
    })
    const handleChange = (event) => {
        setAlgorithm(event.target.value);
    }
    // navigate to home page if there is no problem data
    if (!data || !data.problem) {
        return (
            <NothingToShow />
        )
    }

    const handleSolveNow = async () => {
        try {
            //TODO: here request
            const body = {
                specialPlayer: data.problem.specialPlayer,
                normalPlayers: data.problem.players,
                fitnessFunction: data.problem.fitnessFunction,
                defaultPayoffFunction: data.problem.playerPayoffFunction,
                conflictSet: data.problem.conflictSet,
                algorithm: algorithm,
                distributedCores: distributedCoreParam,
                populationSize: populationSizeParam,
                generation: generationParam,
                maxTime: maxTimeParam,
                // evaluation: evaluationParam
            }
            setIsLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/game-theory-solver`, body);
            // const res = await axios.post(`http://localhost:8080/api/game-theory-solver`, body);
            const runtime = res.data.data.runtime;
            const usedAlgorithm = res.data.data.algorithm;

            let estimatedWaitingTime = 0;
            if (usedAlgorithm === 'eMOEA') {
                estimatedWaitingTime = (runtime * 20);
            } else {
                estimatedWaitingTime = (runtime * 70);
            }
            setData({ ...data, result: res.data.data, estimatedWaitingTime: Math.round(estimatedWaitingTime) });
            setIsLoading(false);
            navigate('/result')
        } catch (err) {
            setIsLoading(false);
            displayPopup("Running failed", "Please check the dataset and try again or contact the admin!", true)
        }

    }



    return (
        <div className='input-processing-page'>
            <Loading isLoading={isLoading} message='Solve your problem, please do not close this window...' />
            <h1 className="problem-name">{data.problem.name}</h1>




            <ParamSettingBox
                distributedCoreParam={distributedCoreParam}
                setDistributedCoreParam={setDistributedCoreParam}
                generationParam={generationParam}
                setGenerationParam={setGenerationParam}
                populationSizeParam={populationSizeParam}
                setPopulationSizeParam={setPopulationSizeParam}
                maxTimeParam={maxTimeParam}
                setMaxTimeParam={setMaxTimeParam}
            />

            <div className="algo-chooser">
                <p className='algorithm-text bold'>Choose an algorithm: </p>

                <select name="" id="" value={algorithm} onChange={handleChange} className='algorithm-select'>
                    <option value="NSGAII">NSGAII</option>
                    <option value="eMOEA">εMOEA</option>
                    <option value="PESA2">PESA2</option>
                    <option value="VEGA">VEGA</option>
                </select>
            </div>

            <p className="solve-now-btn" onClick={handleSolveNow}>Solve now</p>
            <p className="playerNum bold">{data.problem.players.length} {data.problem.players.length < 2 ? 'Player' : "Players"}  </p>

            <div className="player-container">
                {data.problem.players.map((player, index) => (
                    <div key={index}>
                        <Player index={index} name={player.name} strategies={player.strategies} />
                    </div>
                ))}
            </div>
        </div>
    )
}
// Phuc
import React from 'react'
import "./style.scss"
import { useNavigate } from 'react-router'

import { useContext, useState , useEffect} from 'react'
import Player from '../../components/Player';
import axios from 'axios';
import DataContext from "../../context/DataContext"
import NothingToShow from '../../components/NothingToShow';
import Loading from '../../components/Loading';
import Popup from '../../components/Popup';

//TODO: algorithm selection
export default function InputProcessingPage() {
    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [algorithm, setAlgorithm] = useState('NSGAII');

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
            <NothingToShow/>
        )
    }

    const handleSolveNow = async () => {
        const body = {
            specialPlayer: data.problem.specialPlayer,
            normalPlayers: data.problem.players,
            fitnessFunction: data.problem.fitnessFunction,
            defaultPayoffFunction: data.problem.playerPayoffFunction,
            conflictSet: data.problem.conflictSet,
            algorithm: algorithm
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
        setData({ ...data, result: res.data.data, estimatedWaitingTime: Math.round(estimatedWaitingTime)});
        setIsLoading(false);
        navigate('/result')
    }



    return (
        <div className='input-processing-page'>
            <Loading isLoading={isLoading} message='Solve your problem...'/>
            <h1 className="Problem">{data.problem.name}</h1>
            
            <button className="click" onClick={handleSolveNow}>Solve now</button>
            <select name="" id="" value={algorithm} onChange={handleChange} className='algorithm-select'>
                <option value="NSGAII">NSGAII</option>
                <option value="eMOEA">εMOEA</option>
                <option value="PESA2">PESA2</option>
                <option value="VEGA">VEGA</option>
            </select>
            <p className="playerNum">{data.problem.players.length} players</p>
            <div className="scrollBar">
                {data.problem.players.map((player, index) => (
                    <div key={index}>
                        <Player name={player.name} strategies={player.strategies} />
                    </div>
                ))}
            </div>
        </div>
    )
}
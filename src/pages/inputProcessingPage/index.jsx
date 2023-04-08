// Phuc
import React from 'react'
import "./style.scss"
import { useNavigate } from 'react-router'

import { useContext, useState } from 'react'
import Player from '../../components/Player';
import axios from 'axios';
import DataContext from "../../context/DataContext"
import NothingToShow from '../../components/NothingToShow';
import Loading from '../../components/Loading';


export default function InputProcessingPage() {
    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    // navigate to home page if there is no problem data
    if (!data || !data.problem) {
        return (
            <NothingToShow/>
        )
    }

    const handleSolveNow = async () => {
        const body = {
            specialPlayer: null,
            normalPlayers: data.problem.players,
            fitnessFunction: data.problem.fitnessFunction,
            defaultPayoffFunction: data.problem.playerPayoffFunction
        }
        setIsLoading(true);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/game-theory-solver`, body);
        setData({ ...data, result: res.data.data });
        setIsLoading(false);
        navigate('/result')
    }



    return (
        <div className='input-processing-page'>
            <Loading isLoading={isLoading} message='Solve your problem...'/>
            <h1 className="Problem">{data.problem.name}</h1>
            <button className="click" onClick={handleSolveNow}>Solve now</button>
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
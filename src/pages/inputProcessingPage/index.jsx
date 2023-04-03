// Phuc
import React from 'react'
import "./style.scss"
import { useNavigate } from 'react-router'
import DataContext from "../../context/DataContext"

import { useContext, useState } from 'react'
import Player from '../../components/Player';
export default function InputProcessingPage() {
    const navigate = useNavigate();
    const handleSolveNow = () => {
        navigate('/result')
    }
    const { data, setData } = useContext(DataContext);
    console.log(data);

    return (
        <div className='input-processing-page'>
            <h1 className="Problem">Oil Price Problem</h1>
            <button className="click" onClick={handleSolveNow}>Solve now</button>
            <p className="playerNum">players</p>
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
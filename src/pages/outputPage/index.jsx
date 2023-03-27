// Lam
import React from 'react'
import "./style.scss"
import PlayerResult from '../../components/PlayerResult'
import ExcelImage from '../../images/excel.png'
import GraphImage from '../../images/graph1.png'

export default function OutputPage() {
    return (
        <div className='output-page'>
            <p class='header-text'>Oil Price Problem</p>
            <br />
            <p class='below-headertext'> Optimal solution</p>
            <div className="output-container">
                <div className="row">
                    <div className="btn" >
                        <p>Export to Excel</p>
                        <img src={ExcelImage} alt="" />
                    </div>
                    <div className="btn" >
                        <p>Get more insights</p>
                        <img src={GraphImage} alt="" />
                    </div>
                </div>
            </div>
            <br />
            <p class='below-headertext'> Fitness value: 15821810.1241</p>
            <br />

            <div className="table-container">
                <div className="grid-container">
                    <div className="column head-column">No</div>
                    <div className="column head-column">Player Name</div>
                    <div className="column head-column">Choosen strategy name</div>
                    <div className="column head-column">Payoff value</div>
                </div>

                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
                <PlayerResult />
            </div>


        </div>
    )
}
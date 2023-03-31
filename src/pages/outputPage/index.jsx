// Lam
import React from 'react'
import "./style.scss"
import PlayerResult from '../../components/PlayerResult'
import ExcelImage from '../../images/excel.png'
import GraphImage from '../../images/graph1.png'

export default function OutputPage() {
    const data = {
        problem: {
            name: "Oil Price Problem",
            fitness: 15821810.1241,
            players: {
                problem: {
                    name: "Oil Price Problem",
                    fitness: 15821810.1241,
                    players: [
                        {
                            name: "Player 1",
                            choosenStrategy: "Strategy 3",
                            payoffValue: 0.20028350308120002
                        },
                        {
                            name: "Player 2",
                            choosenStrategy: "Strategy 2",
                            payoffValue: 0.44126170431689626
                        },
                        {
                            name: "Player 3",
                            choosenStrategy: "Strategy 5",
                            payoffValue: 0.8663174343245001
                        },
                        {
                            name: "Player 4",
                            choosenStrategy: "Strategy 1",
                            payoffValue: 0.9092766191717305
                        },
                        {
                            name: "Player 5",
                            choosenStrategy: "Strategy 1",
                            payoffValue: 0.8671769111013774
                        },
                        {
                            name: "Player 6",
                            choosenStrategy: "Strategy 2",
                            payoffValue: 0.0685257356799478
                        },
                        {
                            name: "Player 7",
                            choosenStrategy: "Strategy 2",
                            payoffValue: 0.32624460862736093
                        },
                        {
                            name: "Player 8",
                            choosenStrategy: "Strategy 4",
                            payoffValue: 0.07888482214902304
                        },
                        {
                            name: "Player 9",
                            choosenStrategy: "Strategy 2",
                            payoffValue: 0.6083824549909775
                        },
                        {
                            name: "Player 10",
                            choosenStrategy: "Strategy 3",
                            payoffValue: 0.006841291194771726
                        }
                    ]
                }
            }
        }
    }
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
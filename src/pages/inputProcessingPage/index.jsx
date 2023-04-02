// Phuc
import React from 'react'
import "./style.scss"
import { useNavigate } from 'react-router'
import InputPrcs from '../../components/InputProcessing';
export default function InputProcessingPage() {
    const navigate = useNavigate();
    const handleSolveNow = () => {
        navigate('/result')
    }
    const data = {
        problem: {
            name: "Oil Price Problem",
            players: [
                {
                    name: "Player 1",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        },
                        {
                            name: "Strategy 4"
                        }
                    ]
                },
                {
                    name: "Player 2",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        },
                        {
                            name: "Strategy 4"
                        }
                    ]
                },
                {
                    name: "Player 3",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        },
                        {
                            name: "Strategy 4"
                        }
                    ]
                },
                {
                    name: "Player 4",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        }
                    ]
                },
                {
                    name: "Player 5",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        }
                    ]
                },
                {
                    name: "Player 6",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        },
                        {
                            name: "Strategy 4"
                        },
                        {
                            name: "Strategy 5"
                        }
                    ]
                },
                {
                    name: "Player 7",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        }
                    ]
                },
                {
                    name: "Player 8",
                    strategies: [
                        {
                            name: "Strategy 1"
                        }
                    ]
                },
                {
                    name: "Player 9",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        }
                    ]
                },
                {
                    name: "Player 10",
                    strategies: [
                        {
                            name: "Strategy 1"
                        },
                        {
                            name: "Strategy 2"
                        },
                        {
                            name: "Strategy 3"
                        }
                    ]
                }
            ]

        }
    }
    return (
        <div className='input-processing-page'>
            <h1 className ="Problem">Oil Price Problem</h1>
            <button className= "click" onClick={handleSolveNow}>Solve now</button>
            <p className ="playerNum">players</p>
            <div className ="scrollBar">
               {data.problem.players.map((player,index) => (
                <div key={index}>
                    <h2><InputPrcs name ={player.name}/></h2>
                    <ul className='menubar'>
                        {player.strategies.map((strategy,strategyIndex)=>(
                            <div className='menubar'>
                                <ul></ul>
                            <li key ={strategyIndex}>{strategy.name}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                
               ))}
            </div>
        </div>
    )
}
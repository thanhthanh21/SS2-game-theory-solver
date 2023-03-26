// Lam
import React from 'react'
import "./style.scss"
export default function OutputPage() {
    return (
        <div className='output-page'>
            <p class='header-text'>Oil Price Problem</p>
            <br />
            <p class='below-headertext'> Optimal solution</p>
            <div className="output-container">
                <div className="row">
                    <div className='button'>
                        <button type="button" >Export to Excel</button>
                    </div>
                    <div className='button'>
                        <button type="button"  >Get more insights</button>
                    </div>
                </div>
            </div>
            <br />
            <p class='below-headertext'> Fitness value: 15821810.1241</p>
            <br />

            <div className="table-container">
                <div className="grid-container">
                    <div className="column">No</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>

                <div className="grid-item-container">
                    <div className="column">#1</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#2</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#3</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#4</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#5</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#6</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#7</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#8</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
                <div className="grid-item-container">
                    <div className="column">#9</div>
                    <div className="column">Player Name</div>
                    <div className="column">Choosen strategy name</div>
                    <div className="column">Payoff value</div>
                </div>
            </div>


        </div>
    )
}
import React from 'react'
import "./style.scss"
import PlayerResult from '../../components/PlayerResult'
import ExcelImage from '../../images/excel.png'
import GraphImage from '../../images/graph1.png'

export default function OutputPage() {
  const players = [
    {
      idex: 1,
      name: "Player 1",
      choosenStrategy: "Strategy 3",
      payoffValue: 0.20028350308120002
    },
    {
      idex: 2,
      name: "Player 2",
      choosenStrategy: "Strategy 2",
      payoffValue: 0.44126170431689626
    },
    {
      idex: 3,
      name: "Player 3",
      choosenStrategy: "Strategy 5",
      payoffValue: 0.8663174343245001
    },
    {
      idex: 4,
      name: "Player 4",
      choosenStrategy: "Strategy 1",
      payoffValue: 0.9092766191717305
    },
    {
      idex: 5,
      name: "Player 5",
      choosenStrategy: "Strategy 1",
      payoffValue: 0.8671769111013774
    },
    {
      idex: 6,
      name: "Player 6",
      choosenStrategy: "Strategy 2",
      payoffValue: 0.0685257356799478
    },
    {
      idex: 7,
      name: "Player 7",
      choosenStrategy: "Strategy 2",
      payoffValue: 0.32624460862736093
    },
    {
      idex: 8,
      name: "Player 8",
      choosenStrategy: "Strategy 4",
      payoffValue: 0.07888482214902304
    },
    {
      idex: 9,
      name: "Player 9",
      choosenStrategy: "Strategy 2",
      payoffValue: 0.6083824549909775
    },
    {
      idex: 10,
      name: "Player 10",
      choosenStrategy: "Strategy 3",
      payoffValue: 0.006841291194771726
    }
  ];

  return (
    <div className='output-page'>
      <p className='header-text'>Oil Price Problem</p>
      <br />
      <p className='below-headertext'> Optimal solution</p>
      <div className="output-container">
        <div className="row">
          <div className="btn">
            <p>Export to Excel</p>
            <img src={ExcelImage} alt="" />
          </div>
          <div className="btn">
            <p>Get more insights</p>
            <img src={GraphImage} alt="" />
          </div>
        </div>
      </div>
      <br />
      <p className='below-headertext'> Fitness value: 15821810.1241</p>
      <br />

      <div className="table-container">
        <div className="grid-container">
          <div className="column head-column">No</div>
          <div className="column head-column">Player Name</div>
          <div className="column head-column">Choosen strategy name</div>
          <div className="column head-column">Payoff value</div>
        </div>

        {players.map((player, index) => (
          <PlayerResult key={index} player={player} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

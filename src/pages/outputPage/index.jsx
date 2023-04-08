import React from 'react'
import "./style.scss"
import PlayerResult from '../../components/PlayerResult'
import ExcelImage from '../../images/excel.png'
import GraphImage from '../../images/graph1.png'
import { useContext, useEffect } from 'react'
import DataContext from "../../context/DataContext"
import { useNavigate } from 'react-router-dom';
import NothingToShow from '../../components/NothingToShow';
export default function OutputPage() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext)
  const navigateToHome = () => {
    setData(null)
    navigate('/')
  }
  if (data == null) {
    return (
      <NothingToShow />
    )
  }
  
  return (
    <div className='output-page'>
      <p className='header-text'>{ data.problem.name }</p>
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
      <p className='below-headertext'> Fitness value: { data.result.fitnessValue}</p>
      <br />

      <div className="table-container">
        <div className="grid-container">
          <div className="column head-column">No</div>
          <div className="column head-column">Player Name</div>
          <div className="column head-column">Choosen strategy name</div>
          <div className="column head-column">Payoff value</div>
        </div>

        {data.result.players?.map((player, index) => (
          <PlayerResult key={index} player={player} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

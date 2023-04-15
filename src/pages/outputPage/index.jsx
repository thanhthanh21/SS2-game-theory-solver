import React from 'react'
import "./style.scss"
import PlayerResult from '../../components/PlayerResult'
import ExcelImage from '../../images/excel.png'
import GraphImage from '../../images/graph.png'
import { useContext, useEffect, useState } from 'react'
import DataContext from "../../context/DataContext"
import { useNavigate } from 'react-router-dom';
import NothingToShow from '../../components/NothingToShow';
import Loading from '../../components/Loading';
import { ms, s, m, h, d } from 'time-convert'
import axios from 'axios'
export default function OutputPage() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext)
  const [isLoading, setIsLoading] = useState(false);
  const navigateToHome = () => {
    setData(null)
    navigate('/')
  }
  if (data == null) {
    return (
      <NothingToShow />
    )
  }
//TODO: estimaet time to get more insights, x70 times slower than solve now
  const handleGetMoreInsights = async () => {
    console.log('clicked');
    const body = {
      specialPlayer: data.problem.specialPlayer,
      normalPlayers: data.problem.players,
      fitnessFunction: data.problem.fitnessFunction,
      defaultPayoffFunction: data.problem.playerPayoffFunction
    }
    setIsLoading(true);
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/problem-result-insights`, body);
    setIsLoading(false);
    setData({ ...data, insights: res.data.data });
    navigate('/insights')
  }

  return (
    <div className='output-page'>
      <Loading isLoading={isLoading} message={`Get more detailed insights. This can take estimated ${data.estimatedWaitingTime} minute(s)...`} />
      <p className='header-text'>{data.problem.name}</p>
      <br />
      <p className='below-headertext'> Optimal solution</p>
      <div className="output-container">
        <div className="row">
          <div className="btn">
            <p>Export to Excel</p>
            <img src={ExcelImage} alt="" />
          </div>
          <div className="btn" onClick={handleGetMoreInsights}>
            <p>Get more insights</p>
            <img src={GraphImage} alt="" />
          </div>
        </div>
      </div>
      <br />
      <p className='below-headertext'> Fitness value: {data.result.fitnessValue}</p>
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

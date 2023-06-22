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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Popup from '../../components/Popup';
import axios from 'axios'
import EvaluationChooser from '../../components/EvaluationChooser';


export default function OutputPage() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext)
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [evaluationParam, setEvaluationParam] = useState(100)



  const navigateToHome = () => {
    setData(null)
    navigate('/')
  }


  if (data == null) {
    return (
      <NothingToShow />
    )
  }

  const handleExportToExcel = async () => {
    const workbook = XLSX.utils.book_new();
    const sheet1 = XLSX.utils.aoa_to_sheet([
      ["Fitness value", data.result.fitnessValue],
      ["Used algorithm", data.result.algorithm],
      ["Player name", "Choosen strategy name", "Payoff value"],
    ]);

    data.result.players.forEach(player => {
      const row = [player.playerName, player.strategyName, player.payoff];
      XLSX.utils.sheet_add_aoa(sheet1, [row], { origin: -1 });
    })

    XLSX.utils.book_append_sheet(workbook, sheet1, 'Optiomal solution');

    const wbout = await XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'result.xlsx');
  };

  const handleGetMoreInsights = () => {
    setIsShowPopup(true);
  }

  const handlePopupOk = async () => {
    setIsShowPopup(false);
    const body = {
      specialPlayer: data.problem.specialPlayer,
      normalPlayers: data.problem.players,
      fitnessFunction: data.problem.fitnessFunction,
      defaultPayoffFunction: data.problem.playerPayoffFunction,
      conflictSet: data.problem.conflictSet,
      isMaximizing: data.problem.isMaximizing,
      evaluation: evaluationParam

    }
    setIsLoading(true);
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/problem-result-insights`, body);
    setIsLoading(false);
    setData({ ...data, insights: res.data.data });
    navigate('/insights')
  }

  return (
    <div className='output-page'>
      <Popup
        isShow={isShowPopup}
        setIsShow={setIsShowPopup}
        message={`This process can take estimated ${data.estimatedWaitingTime || 1} minute(s) and you will be redirected to another page. Do you want to continue?`}
        okCallback={handlePopupOk}
      />

      <Loading isLoading={isLoading} message={`Get more detailed insights. This can take estimated ${data.estimatedWaitingTime || 1} minute(s)...`} />
      <h1 className="problem-name">{data.problem.name}</h1>
      <br />
      <p className='below-headertext'> Optimal solution</p>
      <div className="output-container">
        <div className="row">
          <div className="btn" onClick={handleExportToExcel}>
            <p>Export to Excel</p>
            <img src={ExcelImage} alt="" />
          </div>
        </div>
        <div className="param-box">
          {/* <p className='estimated-time'>Estimated time for insight running: <span className="bold">{` ${data.estimatedWaitingTime || 1} minute(s)`}</span> </p> */}
          <EvaluationChooser
            evaluation={evaluationParam}
            setEvaluation={setEvaluationParam}
          />
          <div className="btn insight-btn" onClick={handleGetMoreInsights}>
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

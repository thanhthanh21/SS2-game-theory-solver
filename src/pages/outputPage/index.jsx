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
import PopupContext from '../../context/PopupContext'

import SockJS from 'sockjs-client';
import { v4 } from 'uuid';
import { overWS } from 'stompjs'
import { over } from 'stompjs';

let stompClient = null
export default function OutputPage() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext)
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [evaluationParam, setEvaluationParam] = useState(100)
  const { displayPopup } = useContext(PopupContext)
  const [sessionCode, setSessionCode] = useState(v4())
  const [loadingMessage, setLoadingMessage] = useState("Processing to get problem insights, please wait...")
  const [loadingEstimatedTime, setLoadingEstimatedTime] = useState(null)
  const [loadingPercentage, setLoadingPercentage] = useState("0%")

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
    try {
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
      await connectWebSocket()
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/problem-result-insights/${sessionCode}`, body);
      setIsLoading(false);
      setData({ ...data, insights: res.data.data });
      navigate('/insights')
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      displayPopup("Something went wrong!", "Get insights failed!, please contact the admin!", true)
    }

  }

  const connectWebSocket = async () => {
    let Sock = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    stompClient = over(Sock);
    await stompClient.connect({}, onConnected, onError);
  }
  const onConnected = () => {
    stompClient.subscribe('/session/' + sessionCode + '/progress', onPrivateMessage);
    console.log('Connected to websocket server!');
  }

  const onError = (err) => {
    console.log(err);
    // displayPopup("Something went wrong!", "Connect to server failed!, please contact the admin!", true)
  }

  const closeWebSocketConnection = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
  }

  const onPrivateMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log('hihihih');
    console.log(payload.body);

    const message = payloadData.message;

    // some return data are to show the progress, some are not
    if (payloadData.inProgress) {
      const isFirstRun = payloadData.firstRun
      const percentage = Math.floor((payloadData.generation / 40) * 100) + "%"// there will be 40 run for the problem

      // showing estimated time, percentage and message
      if (!loadingEstimatedTime) {
        // the estimated time is calculated by multiply the first run time with 70 (run 10 times for each of 4 algorithms, with e-MOEa takes long as 3 times as other algorthms)
        const totalEstimatedTime = "Estimated total " + (Math.floor(payloadData.runtime * 70 / 60) || 1) + " minute(s)" // in minutes
        setLoadingEstimatedTime(totalEstimatedTime)
        setLoadingMessage(message)
      } else {
        setLoadingMessage(message)
      }
      setLoadingPercentage(percentage)
    } else {
      // only show message
      setLoadingMessage(message)

    }
  }



  return (
    <div className='output-page'>
      <Popup
        isShow={isShowPopup}
        setIsShow={setIsShowPopup}
        title={"Get detailed insights"}
        // message={`This process can take estimated ${data.estimatedWaitingTime || 1} minute(s) and you will be redirected to another page. Do you want to continue?`}
        message={`This process can take a while do you to continue?`}
        okCallback={handlePopupOk}
      />

      {/* <Loading isLoading={isLoading} message={`Get more detailed insights. This can take estimated ${data.estimatedWaitingTime || 1} minute(s)...`} /> */}
      <Loading isLoading={isLoading}
        percentage={loadingPercentage}
        estimatedTime={loadingEstimatedTime}
        message={loadingMessage} />
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

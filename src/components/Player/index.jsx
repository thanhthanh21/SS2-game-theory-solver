import React from "react"
import "./style.scss";
import { useState } from 'react'
export default function Player({ name, strategies }) {
  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <div className="contend">
      <div className="name1">
        <div className="comp nameComp">
          <p>{name}</p>
          </div>
        <p className="comp strategyComp">{strategies.length} Strategies</p>
        <label className="comp">
        <span className={showMore ? 'fas fa-caret-up' : 'fas fa-caret-down'} onClick={toggleShowMore}></span>
      </label>  
      </div>
      {showMore && <div className="menubar">
        <ul>
          {strategies.map((strategy, index) => (
            <li>{strategy.name}</li>
          ))}
        </ul>

      </div>}


    </div>
  )
}



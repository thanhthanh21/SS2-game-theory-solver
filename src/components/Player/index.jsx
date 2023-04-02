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
      <p className="name1">{name}</p>
      <p className="name1">{strategies.length}  Strategies</p>
      <label >
        <span className={showMore ? 'fas fa-caret-up' : 'fas fa-caret-down'} onClick={toggleShowMore}></span>
      </label>
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



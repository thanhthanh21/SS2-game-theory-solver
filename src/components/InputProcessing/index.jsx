import React from "react"
import "./style.scss";

export default function InputPrcs(props) {
    return(
        <div className ="contend">
                    <p className="name1">{props.name}</p>
                    <p className= "name1">{props.strNum} Strategies</p>
                    <label for="btn">
                        <span className="fas fa-caret-down name1"></span>
                    </label>
                    <input type="checkbox" name="btn" id="btn" className='inputs' />
                    <div className="menubar">
      <ul>
        <li key={props.index}>{props.st}</li>
      </ul>
    </div>
    </div>
    )
}



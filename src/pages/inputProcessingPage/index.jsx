// Phuc
import React from 'react'
import "./style.scss"
export default function InputProcessingPage() {
    return (
        <div className='input-processing-page'>
            <h1 class ="Problem">Oil Price Problem</h1>
            <button class= "click">Solve now</button>
            <p class ="playerNum">20 players</p>
            <div class ="scrollBar">
                <div class ="contend">
                    <p class="name1">Oil Producing country A</p>
                    <p class= "name1">3 Strategy</p>
                    <label for="btn">
                        <span class="fas fa-caret-down name1"></span>
                    </label>
                    <input type="checkbox" name="btn" id="btn" />
                    <div class = "menubar">
                    <ul>    
                            <li>
                                <p>Stratey 1: Lower the price</p>
                            </li>
                            <li>
                                <p>Stratey 2: higher the price</p>
                            </li>
                            <li>
                                <p>Stratey 3: remain the price</p>
                            </li>
                    </ul>
                    </div>
                </div>
                        
                <div class ="contend">
                    <p class="name1">Oil Producing country B</p>
                    <p class= "name1">5 Strategy</p>
                    <label for="btn1">
                        <span class="fas fa-caret-down name1"></span>
                    </label>
                    <input type="checkbox" name="btn" id="btn1" />
                    <div class = "menubar">
                    <ul>    
                            <li class = "divcon">
                                <p>Stratey 1: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 2: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 3: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 4: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 5: bla bla the price</p>
                            </li>
                    </ul>
                    </div>        
                </div>
                <div class ="contend">
                    <p class="name1">Oil Producing country C</p>
                    <p class= "name1">5 Strategy</p>
                    <label for="btn2">
                        <span class="fas fa-caret-down name1"></span>
                    </label>
                    <input type="checkbox" name="btn" id="btn2" />
                    <div class = "menubar">
                    <ul>    
                            <li class = "divcon">
                                <p>Stratey 1: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 2: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 3: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 4: bla bla</p>
                            </li>
                            <li>
                                <p>Stratey 5: bla bla the price</p>
                            </li>
                    </ul>
                    </div>        
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import "./style.scss";

export default function InputPage() {
    return (
        <div className="input-page">
            <p class='header-text'>Enter information about your problem</p>
            <div className="input-container">
                <div className="row">
                    <div className="input">
                        <input type="text" placeholder="You problem name" id="problem-name" />
                        <i class="info fa-solid fa-info"></i>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="You problem name" id="problem-name" />
                        <i class="info fa-solid fa-info"></i>
                    </div>
                </div>

                <div className="row">
                    <div className="input">
                        <input type="text" placeholder="You problem name" id="problem-name" />
                        <i class="info fa-solid fa-info"></i>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="You problem name" id="problem-name" />
                        <i class="info fa-solid fa-info"></i>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="You problem name" id="problem-name" />
                        <i class="info fa-solid fa-info"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
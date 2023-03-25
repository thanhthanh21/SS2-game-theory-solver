import React from 'react';
import "./style.scss";

export default function SpecialPlayerInput({message}) {
    return (
        <div className="input">
            <input type="text" placeholder={message} id="problem-name" />
            <i class="info fa-solid fa-info"></i>
        </div>
    )
}
import React from 'react';
import "./style.scss";
import Input from "../../components/input";
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function SpecialPlayerInput() {
    const [checked, setChecked] = useState(false);
    const handleCheck = (e) => {
        setChecked(e.target.checked);
    }

    const handleHidingAnimationEnd = (e) => {
        if (style === 'hiding') {
            e.target.classList.add('hidden');
        }
    }
    const style = checked ? "showing" : "hiding";
    return (
        <div className={`special-player-input`}>
            <label htmlFor="special-player-checkbox" className='special-player-label'>
                <input type="checkbox" placeholder="You problem name" id="special-player-checkbox" onChange={handleCheck} />
                <p>Special player exists</p>
            </label>

            {/* {checked && */}
            <div className={style} onAnimationEnd={handleHidingAnimationEnd}> <Input message="Number of properties of special player" /></div>
            {/* } */}

        </div>
    )
}
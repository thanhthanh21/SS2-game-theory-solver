import React from 'react';
import "./style.scss";
import Input from "../../components/input";
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function SpecialPlayerInput() {
    const [checked, setChecked] = useState(false);
    const [style, setStyle] = useState("hidden");

    const handleCheck = (e) => {
        setChecked(e.target.checked);
    }

    const handleHidingAnimationEnd = (e) => {
        if (style === 'hiding') {
            e.target.classList.add('hidden');
        } else {
            e.target.classList.remove('hidden');
        }

    }

    useEffect(() => {
        if (checked) {
            setStyle('showing');
        } else {
            setStyle('hidden');
        }
    }, [checked]);
    return (
        <div className={`special-player-input`}>
            <label htmlFor="special-player-checkbox" className='special-player-label'>
                <input type="checkbox" placeholder="You problem name" id="special-player-checkbox" onChange={handleCheck} />
                <p>Special player exists</p>
            </label>

            {/* {checked && */}
            <div className={`${style}`} onAnimationEnd={handleHidingAnimationEnd}> <Input message="Number of properties of special player" /></div>
            {/* } */}

        </div>
    )
}
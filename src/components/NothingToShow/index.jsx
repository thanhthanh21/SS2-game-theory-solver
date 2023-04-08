
import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
export default function NothingToShow() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/')
    }

    return (
        <div className='nothing-to-show'>
            <p>Nothing to show here</p>
            <img src="https://iogames.onl/themes/iogames/rs/images/io-games.png" alt="" />
            <button class='btn' onClick={navigateToHome}>Back to homepage</button>
        </div>
    );
}

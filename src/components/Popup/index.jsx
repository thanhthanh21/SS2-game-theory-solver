import React from 'react';
import './style.scss';
export default function Popup({ isShow, setIsShow, message, okCallback }) {

    const handleCancelClick = () => {
        setIsShow(false);
    }

    if (!isShow) return null;
    return (
        <div className="popup">
            <div className="background" onClick={handleCancelClick}></div>
            <div className="popup-content">
                <div className="popup-title">
                    <p className='title'>Get problem insights</p>
                    <p className='exit-btn' onClick={handleCancelClick}>&times;</p>
                </div>
                <div className='popup-message'>
                    <p>{message}</p>
                </div>
                <div className="btn-container">
                    <p class='ok-btn' onClick={okCallback}>Ok</p>
                    <p class='cancel-btn' onClick={handleCancelClick}>Cancel</p>
                </div>
            </div>

        </div>
    )
}
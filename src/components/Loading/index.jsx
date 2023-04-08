import React from 'react';
import './style.scss';
export default function Loading({isLoading, message}) {
    if (!isLoading) return (<></>);
    return (
        <div className='loading'>
            <div className="background"></div>
            <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p class='loading-message'>{ message }</p>
        </div>

    );
}

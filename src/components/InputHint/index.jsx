import React from 'react';
import "./style.scss";
import { Link } from 'react-router-dom'
export default function InputHint({ showHint, setShowHint, heading, desciption }) {
// onMouseLeave={setShowHint(false)}
    const handleMouseLeave = () => {
        setShowHint(false);
    }
    return (

        showHint &&

        <div className="input-hint" onMouseLeave={handleMouseLeave}>
            <h1>{heading}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nulla neque eaque libero tenetur eius facilis tempore consectetur possimus accusantium.</p>
            <Link to='/guide' className='btn'>Learn more</Link>
        </div>


    )
}
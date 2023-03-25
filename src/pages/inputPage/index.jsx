import React from 'react';
import "./style.scss";
import SpecialPlayerInput from "../../components/specialPlayerInput";
import Input from "../../components/input";

export default function InputPage() {
    return (
        <div className="input-page">
            <p class='header-text'>Enter information about your problem</p>
            <div className="input-container">
                <div className="row">
                    <Input message='Your problem name'/>
                </div>
                <div className="row">
                    <SpecialPlayerInput />
                </div>

                <div className="row">
                    <Input message='Number of normal players'/>
                    <Input message='Number of properties each strategy of normal player'/>

                </div>

                <div className="row">
                    <Input message='Fitness function'/>
                </div>

                <div className="row">
                    <Input message='Player payoff function'/>
                </div>
            </div>
        </div>
    )
}
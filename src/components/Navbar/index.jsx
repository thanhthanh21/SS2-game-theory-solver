import React from "react";
import "./style.scss";

export default function Header() {
    return (
        <>
            <header className="Navbar">
                <div className="container">
                    <div className="app-name">Game Theory Solver</div>
                    <div className="nav-item-container">
                        <div className="nav-item highlight">Home</div>
                        <div className="nav-item">About</div>
                        <div className="nav-item">Guide</div>
                    </div>
                </div>


            </header>
            <a className="app-info" href="http://moeaframework.org/" target="_blank">
                <img className='moea-framework-logo' src="https://th.bing.com/th/id/R.813fc73036588da433a26877f9738f63?rik=QW%2fZfuTteoFJug&riu=http%3a%2f%2fmoeaframework.org%2fimages%2flogo2_small.png&ehk=Yj9EPtTmS%2brN1WGUO7EUHyKgEVdiu9Drs0y9NoLKJXM%3d&risl=&pid=ImgRaw&r=0" alt="" />
                <p>Powered by MOEA Framework</p>
            </a>
        </>

    );
}

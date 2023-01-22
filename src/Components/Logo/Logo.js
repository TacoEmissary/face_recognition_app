import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return(
        <div style={{ display: 'flex', justifyContent: "left" }}>
            <Tilt tiltReverse={true} tiltMaxAngleX={25} tiltMaxAngleY={25}>
                <div className="tiltContainer ma4 mt0 br2 shadow-2" style={{ height: '100px', width: '100px', display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <img src={brain} alt={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
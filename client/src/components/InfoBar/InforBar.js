import React from "react";

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InforBar.css';

const InforBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            <h3> {room} </h3>
        </div>

        <div className="rightInnerContainer">
            <a href="/"> <img src={closeIcon} alt="close" /> </a>
        </div>
    </div>
)

export default InforBar;
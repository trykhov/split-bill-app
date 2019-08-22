import React from 'react';
import logo from '../logo.png';
import '../css/numPeople.css';
import { Link } from 'react-router-dom';

class NumPeople extends React.Component {
    render() {
        return (
            <div id="numPeoplePage">
                <div className="appName">
                    {/* this will be the container that holds the app logo and name at the top left corner */}
                    <img className="appLogo" src={logo} alt="logo"/> 
                    <label>SplitBill</label>
                </div>
                <div id="numBox">
                    <label id="howMany">How Many People?</label>
                    <input id="enterNum" />
                </div>
            </div>
        )
    }
};

export default NumPeople;
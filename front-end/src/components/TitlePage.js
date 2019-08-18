import React from 'react';
import titlePage from '../css/titlePage.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

export default function TitlePage() {
    return(
        <div id="homepage">
            <h3 id="title">SplitBill</h3>
            <img id="logo" src={logo}/>
            <label id="titleDesc">The easiest way to split the bill with your friends</label>
            <div id="startButton">
                <Link to="total" style={{textDecoration: 'none'}}>
                    <label>Start</label>
                </Link>
            </div>
        </div>
    )
}
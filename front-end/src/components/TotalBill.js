import React from 'react';
import logo from '../logo.png';
import totalBillPage from '../css/totalBillPage.css';
import { Link } from 'react-router-dom';

class TotalBill extends React.Component {
    render() {
        return(
            <div id="totalBillPage"> 
                <div className="appName">
                    {/* this will be the container that holds the app logo and name at the top left corner */}
                    <img className="appLogo" src={logo}/> 
                    <label>SplitBill</label>
                </div>
                <div id="billInfo">
                    <div id="billTotal">
                        <label className="info">Bill Total (without tip)</label>
                        <input className="inputAmount" />
                    </div>
                    <div id="tip">
                        <label className="info">Tip Amount</label>
                        <input className="inputAmount" />
                    </div>
                    <div id="total">
                        <label className="info">Total</label>
                        <input className="inputAmount" />
                    </div>
                    <div className="doneButton">
                        <Link to="numberOfPeople" style={{textDecoration: 'none'}}>
                            <label>Next</label>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default TotalBill;
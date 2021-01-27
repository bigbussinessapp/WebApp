import React from 'react';
import '../Header/Header.css';
import { TransactionsTable } from '../Tables/TransactionsTable';

//this func returns header and Transaction table as of now
function Header() {
    return (
        <header>
            <ul className="ul">
                <li className="li"><a href="/">BigBusiness</a></li>
                <li className="li"><a href="/transaction">Transaction History</a></li>
                <li className="li"><a href="contact.asp">Reminders and Dues</a></li>
            </ul>
            <br/>
            <TransactionsTable/>
        </header>
    )
}

export default Header;

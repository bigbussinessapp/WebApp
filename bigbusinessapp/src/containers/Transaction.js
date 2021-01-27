import React, { Component } from 'react';
// import { getListData } from '../API';
import { TransactionsTable } from '../components/Tables/TransactionsTable';


//this class does nothing major as of now!
export class Transaction extends Component {
    state = {
        transacdata: null
    }

    // async componentDidMount() {
    //     const result = await getListData();
    //     this.setState({
    //         transacdata: result
    //     })
    //     console.log(this.state.transacdata);
    // }


    // render() {
    //     const { transacdata } = this.state;
    //     return transacdata
    //         ? <ul>
    //             {
    //                 transacdata.map(transacdata => (
    //                     <li key={transacdata.id}>{transacdata.title}</li>
    //                 ))
    //             }
    //         </ul>
    //         : <h3>Loading..!</h3>
    // }

    render() {
        return (<TransactionsTable />);
    }
}

export default Transaction

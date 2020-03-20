import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import ReactTable from 'react-table'  ;
import 'react-table/react-table.css';
import moment from 'moment';



export class Alert extends Component  {


    constructor(props) {
        super(props);
        this.state = { alerts: [], loading: true };        
        
    }
      componentDidMount() {
        this.populateAlerts();
      }



render(){
  

    const columns = [       
        
        {Header:'Date', accessor: 'lastDate', show: false},
        {Cell: ({row, original}) =>  moment(original.lastDate).format('LL'), Header: 'Last Date'},

    {
        Header: 'FirstDate', accessor: 'firstDate', show: false        
    },
            {Cell: ({row, original}) =>  moment(original.firstDate).format('LL'), Header: 'First Date'},  
    
    {
        Header: 'Days',
        accessor: 'days' // String-based value accessors!
    },
    {
        Header: 'Card number',
        accessor: 'cardNumber' // String-based value accessors!
    },
    {
        Header: 'Alert name',
        accessor: 'alertName' // String-based value accessors!
    },
    {
        Header: 'Alert receiver',
        accessor: 'receiver' // String-based value accessors!
    }    
    ];    

return (
    <div>
        <h1>Alerts:</h1>        
        <ReactTable data={this.state.alerts} columns={columns} sortable={true} filterable={true} defaultPageSize={10} />
    </div>
    )
}

async populateAlerts() {
    const token = await authService.getAccessToken();
    const response = await fetch('api/PrimusAlerts', {
     headers: !token ? {} : { 'Authorization': `Bearer ${token}`}
    });
    const data = await response.json();
    console.log(data);
    this.setState({ alerts: data, loading: false });
  }

}

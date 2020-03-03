import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import ReactTable from 'react-table-v6'  ;
import 'react-table-v6/react-table.css';


export class AlertType extends Component  {


    constructor(props) {
        super(props);
        this.state = { alerttypes: [], loading: true };        
        
    }
      componentDidMount() {
        this.populateAlertTypes();
      }



render(){
    const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
    },
    {
        Header: 'Description',
        accessor: 'description' // String-based value accessors!
    },
    {
        Header: 'PQ Query',
        accessor: 'queryString' // String-based value accessors!
    },
    {
        Header: 'Query Name',
        accessor: 'queryName' // String-based value accessors!
    },
    {
        Header: 'Alert Message',
        accessor: 'alertMsgText' // String-based value accessors!
    },
    {
        Header: 'Subject',
        accessor: 'alertMsgSubject' // String-based value accessors!
    },
    {
        Header: 'In use?',
        accessor: 'isInUse' // String-based value accessors!
    }
    ];    

return (
    <div>
        <h1>Alert types:</h1>
        <ReactTable data={this.props.alerttypes} columns={columns} sortable={true} defaultPageSize={10} />
    </div>
    )
}

async populateAlertTypes() {
    const token = await authService.getAccessToken();
    const response = await fetch('api/primustypes/1', {
     headers: !token ? {} : { 'Authorization': `Bearer ${token}`}
    });
    const data = await response.json();
    console.log(data);
    this.setState({ alerttypes: data, loading: false });
  }

}

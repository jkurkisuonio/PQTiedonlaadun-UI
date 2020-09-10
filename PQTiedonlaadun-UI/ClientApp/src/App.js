import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import {AlertType} from './components/AlertType';
import { Alert } from './components/Alert';
import { GraphData } from './components/GraphData';
import './custom.css'
import { withAuth } from './msal/MsalAuthProvider';

class RootApp extends Component {
  // static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/alert-types' component={AlertType} />
            <Route path='/alerts' component={Alert} />
            <Route exact path='/graph-data' component={GraphData} />
        
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
export const App = withAuth(RootApp);

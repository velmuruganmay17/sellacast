import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import Dashboard from './Dashboard';
import {Route} from 'react-router-dom';
import Users from './Users';
import NewUser from './NewUser';
import Feed from './Feed';
class Home extends Component{ 
     render() {
        return (
            <div>
            <Route 
            exact
            path="/Dashboard"
            component={Dashboard} 
          />
           <Route 
            exact
            path="/Feed"
            component={Feed} 
          />
          <Route 
            exact
            path="/Users"
            component={Users} 
          />
          <Route 
            exact
            path="/newUser"
            component={NewUser} 
          />
          </div>
        )    
} 
}

export default Home;
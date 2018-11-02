import React,{Component} from 'react';
import {
    Collapse, 
    Nav,
    NavItem   } from 'reactstrap';
import {NavLink} from 'react-router-dom';
class SideMenu extends Component{ 
     constructor() {
        super();  
        this.state = {
          isOpen: false,
          applicationName : "Sella Cast",
        };
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
        return (
            <div>
                <Nav vertical>
                <NavItem>
                    <NavLink to="/Dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/Feed">Content Feed</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/Users">Users</NavLink>
                </NavItem>
                </Nav> 
            </div>
        )    
} 
}

export default SideMenu;
import React,{Component} from 'react';
import { Alert } from 'reactstrap';
class Header extends Component{ 
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
               <Alert color="light">
                    Sella Cast
                </Alert>
          </div>    
        )    
} 
}

export default Header;
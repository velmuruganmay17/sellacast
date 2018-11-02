import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import apiCall from '../../services/apicall';
import '../../css/Users.css';

class Dashboard extends Component{ 
     constructor() {
        super();  
        this.state = {
          isOpen: false,
          applicationName : "Sella Cast",
          contentfeeds : [],
          cardStyle : {"max-height":"100px","overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis",},

        };
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      componentWillMount() {
          debugger;
        const body = { 
            filename: 'feeder', 
          };

            apiCall(`contentfeed`)
            .then(contentfeeds => {
                console.log(contentfeeds);
                this.setState({ contentfeeds }); 
            })
            .catch(error => {
                this.setState({ hasError: true });
                console.error(error);
            });
    }

    render() {
        return (
            <div>
            <Row>
                <Col sm="3" md="3" lg="3" ></Col>
                <Col sm="7" md="7" lg="7" ></Col>
                <Col sm="2" md="2" lg="2" >
                <Button color="primary" onClick={this.toggle}>Refresh Stations</Button>{' '}
                </Col>
            </Row>
            <Row className="row-height"></Row>
            <Row className="row-height"><h4>Casting now</h4></Row>
            <Row className="row-height"></Row>
            <Row className="justify-content-center" > 
                 {
                 this.state.contentfeeds.map((contentfeed, index) => 
                <Col xs="5" sm="4" md="3" lg="3" xl="3"
                style={{ margin: "0 10px 10px 0",
                border: "1px solid lightgrey", borderRadius: "10px" }} > 
                    <Card style={{ border: "1px solid white" }} >
                        <CardImg  top style={{ "min-height":"100px","max-height":"80%","max-width":"80%",overflow: "hidden" }} src={`${contentfeed.image}`} alt="Card image cap" />
                        <CardBody>
                        <CardTitle>{contentfeed.categories}</CardTitle>
                        <CardSubtitle style={{ "min-height":"100px","max-height":"100px",overflow: "hidden" }} >{contentfeed.headline}</CardSubtitle> 
                        <CardText style = {{ "min-height":"100px","max-height": "100px",overflow: "hidden"}}>{contentfeed.description}</CardText>
                        <Button>View</Button>
                        </CardBody>
                    </Card>
                </Col> 
                 )
                }  
            </Row>
            </div>
        )    
} 
}

export default Dashboard;
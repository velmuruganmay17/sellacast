import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/Toggle.css';
import Header from './pages/Header/Header';
import { Container, Row, Col } from 'reactstrap';
import SideMenu from './pages/SideMenu/SideMenu';
import Home from './pages/Content/Home';
import {withRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
           <Col><Header /> </Col>
        </Row>
        <Row>
           <Col xs="12" sm="2" md="2" lg="2" ><SideMenu /> </Col>
           <Col xs="12" sm="10" md="10" lg="10" ><Home /> </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(App);

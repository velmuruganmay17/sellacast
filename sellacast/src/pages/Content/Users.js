import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../css/Users.css';
import { InputGroup, InputGroupAddon, InputGroupText,Input } from 'reactstrap';
import { Table } from 'reactstrap';
import apiCall from '../../services/apicall';
import NewUser from './NewUser';
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
import Toggle from '../../Util/Toggle';

let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

class Users extends Component{ 
     constructor() {
        super();  
        this.state = {
          users:[],
          searchUsers:[],
          hasError: false,
          modal : false,
          currentPage: 1,
          dataPerPage: 10,
          searchedData: '',
        };
        this.toggle = this.toggle.bind(this);
        this.editEntries = this.editEntries.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
        this.editSearchedData = this.editSearchedData.bind(this);
      }

      componentWillMount() {
        apiCall(`users`)
            .then(users => {
                this.setState({ users });
                console.log(users);
            })
            .catch(error => {
                this.setState({ hasError: true });
                console.error(error);
            });
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    editEntries(event) {
        this.setState({
            dataPerPage: event.target.value
        });    
    }

    editSearchedData(event) { 		
      var updatedList = this.state.users;
      updatedList = updatedList.filter((item) => 
      item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
     this.setState({searchUsers: updatedList});
    } 

    handleClick(event) {
        event.preventDefault();
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
  
      handleLastClick(event) {
        event.preventDefault();
        this.setState({
          currentPage:last
        });
      }

      handleFirstClick(event) {
        event.preventDefault();
        this.setState({
          currentPage:1
        });
    }
    

    render() {
    let { users, currentPage, dataPerPage,searchUsers } = this.state;

      // Logic for displaying current todos
      let indexOfLastTodo = currentPage * dataPerPage;
      let indexOfFirstTodo = indexOfLastTodo - dataPerPage;
      let currentUsers = (searchUsers.length >0 ? searchUsers : users).slice(indexOfFirstTodo, indexOfLastTodo);
       prev  = currentPage > 0 ? (currentPage -1) :0;
       last = Math.ceil((searchUsers.length >0 ? searchUsers : users).length/dataPerPage);
       next  = (last === currentPage) ?currentPage: currentPage +1;

      // Logic for displaying page numbers
      let pageNumbers = [];
      for (let i = 1; i <=last; i++) {
        pageNumbers.push(i);
      }
        return (
            <div>
            <Row>
                <Col sm="3" md="3" lg="3" >SELLA CAST USERS </Col>
                <Col sm="7" md="7" lg="7" ></Col>
                <Col sm="2" md="2" lg="2" >
                <Button color="primary" onClick={this.toggle}>Create New User</Button>{' '}
                </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>New User</ModalHeader>
            <ModalBody>
                <NewUser />
            </ModalBody>
            <ModalFooter>
                <Button color="light" onClick={this.toggle}>Close</Button>
            </ModalFooter>
            </Modal>
            <Row className="row-height"></Row>
            <Row>
                <Col lg="3">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Show</InputGroupAddon>
                        <Input value={this.state.dataPerPage} onChange={this.editEntries}  />
                        <InputGroupAddon addonType="append">entries</InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col lg="5"></Col>
                <Col lg="4">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Search:</InputGroupAddon>
                        <Input onChange={this.editSearchedData}  />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="table-height"></Row>
            <Row>
            <Table hover>
                <thead>
                <tr>
                    <th>GBSID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>ROLE</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                    currentUsers.map((user, index) =>
                        <tr key={indexOfFirstTodo+index}>
                            <th scope="row">{user.gbsId}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td><h6><Badge color="secondary">{user.role}</Badge></h6></td>
                            <td><Toggle isChecked /></td>
                            <td>
                            <img src={require("../../img/si-glyph-trash.svg")} className="img-width"/>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            </Row>
            <Row>
                <Col>
                <nav>
           <Pagination>
           <PaginationItem>
           { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
               <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
           }
           </PaginationItem>
           <PaginationItem>
           { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
               <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
           }
           </PaginationItem>
              {
               pageNumbers.map((number,i) =>
               <Pagination key= {i}>
               <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                {number}
                </PaginationLink>
                </PaginationItem>
               </Pagination>
             )}

          <PaginationItem>
          {
            currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
            <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
          }
          </PaginationItem>

          <PaginationItem>
          {
            currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
            <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
          }
          </PaginationItem>
          </Pagination>
           </nav>
                </Col>
            </Row>
        </div>
        )
    }
}
export default Users;
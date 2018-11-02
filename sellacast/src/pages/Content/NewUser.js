import React,{Component} from 'react';
import PostInputField from './components/PostInputField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import uuidv4 from 'uuid/v4';
import apiCall from '../../services/apicall';

export default class NewUser extends Component{

    constructor(){
        super();

        this.state = {
            gbsId : '',
            name : '',
            email : '',
            phone : '',
            password : '',
            role : '',
            hasError : '',
        };
        this.editGbsId = this.editGbsId.bind(this);
        this.editName = this.editName.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.editPhone = this.editPhone.bind(this);
        this.editPassword = this.editPassword.bind(this);
        this.editRole = this.editRole.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

        editGbsId(event){
            this.setState({gbsId : event.target.value});
        }

        editName(event){
            this.setState({name : event.target.value});
        }

        editEmail(event){
            this.setState({email : event.target.value});
        }

        editPhone(event){
            this.setState({phone : event.target.value});
        }

        editRole(event){
            this.setState({role : event.target.value});
        }

        editPassword(event){
            this.setState({password : event.target.value});
        }

        handleClick(){
            if(this.state.gbsId && this.state.name && this.state.password) {
              //  this.setState({loading: true});
          
                const isActive = "true";
                const body = {
                  id: uuidv4(),
                  gbsId: this.state.gbsId,
                  name: this.state.name,
                  password: this.state.password,
                  email: this.state.email,
                  phone: this.state.phone,
                  role: this.state.role,
                  active: isActive,
                };
          
                apiCall(`adduser`, 'POST', body)
                .then(() => {
                  this.setState({
                    gbsId: '',
                    name: '',
                    password: '',
                    email: '',
                    phone: '',
                    role: '',
                    active: '',
                  });
                })
                .catch(error => {
                  this.setState({hasError: true});
                  console.error(error);
                });
          
              } else {
                alert('Please Fill in all the fields');
              }

        }

        render(){
            return(
                <div>
                    <h4>Create a new Sella Cast User</h4>

                    <PostInputField
                        className={'gbsId-input'}
                        id={'gbsId'}
                        title={'GBS CODE'}
                        value={this.state.gbsId}
                        onChange={this.editGbsId}
                        />

                    <PostInputField
                        className={'name-input'}
                        id={'name'}
                        title={'NAME'}
                        value={this.state.name}
                        onChange={this.editName}
                         />

                    <PostInputField
                        className={'email-input'}
                        id={'email'}
                        title={'EMAIL'}
                        value={this.state.email}
                        onChange={this.editEmail}
                         />

                    <PostInputField
                        className={'phone-input'}
                        id={'phone'}
                        title={'PHONE'}
                        value={this.state.phone}
                        onChange={this.editPhone}
                         />

                    <PostInputField
                        className={'password-input'}
                        id={'password'}
                        title={'PASSWORD'}
                        value={this.state.password}
                        onChange={this.editPassword}
                         />

                    <FormGroup>
                    <Label for="role">ROLE</Label>
                    <Input type="select" name="role" id="role" multiple>
                        <option>Admin</option>
                        <option>Moderator</option>
                        <option>Publisher</option>
                    </Input>
                    </FormGroup>
                    <Button color="primary" onClick={this.handleClick}>Add</Button>
                </div>
            )
        }

}
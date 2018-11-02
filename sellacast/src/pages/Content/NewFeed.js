import React,{Component} from 'react';
import PostInputField from './components/PostInputField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class NewFeed extends Component{

    constructor(){
        super();

        this.state = {
            type : '',
            title : '',
            description : '',
            reflink : '',
            scheduler : '',
            rtime : '',
            upload : '',
            hasError : '',
        };
        this.editType = this.editType.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.editScheduler = this.editScheduler.bind(this);
        this.editRTime = this.editRTime.bind(this);
        this.editUpload = this.editUpload.bind(this);
    }

        editType(event){
            this.setState({type : event.target.value});
        }

        editTitle(event){
            this.setState({title : event.target.value});
        }

        editDescription(event){
            this.setState({description : event.target.value});
        }

        editScheduler(event){
            this.setState({scheduler : event.target.value});
        }

        editRTime(event){
            this.setState({rtime : event.target.value});
        }

        editRefLink(event){
            this.setState({reflink : event.target.value});
        }

        editUpload(event){
            this.setState({upload : event.target.value});
        }

        render(){
            return(
                <div>
                    <h4>Create a new Feed</h4>
                    <FormGroup>
                    <Input type="select" name="type" id="type" bsSize="sm">
                        <option>TYPE</option>
                    </Input>
                    </FormGroup>
                    <PostInputField
                        className={'title-input'}
                        id={'title'}
                        title={'TITLE'}
                        value={this.state.title}
                        onChange={this.editTitle}
                        />

                    <PostInputField
                        className={'description-input'}
                        id={'description'}
                        title={'DESCRIPTION'}
                        value={this.state.description}
                        onChange={this.editDescription}
                         />

                    <PostInputField
                        className={'refLink-input'}
                        id={'refLink'}
                        title={'REFERENCE LINK'}
                        value={this.state.reflink}
                        onChange={this.editRefLink}
                         />
                    <Button color="primary">Add</Button>
                </div>
            )
        }

}
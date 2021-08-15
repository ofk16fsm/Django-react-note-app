import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

class ModalForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeItem: {
				date: '',
				description: '',
			},
			notesides: this.props.notesides
		};
	}
	/*
	onChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}
	*/
	/*
	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState(state => ({
			activeItem: {
			...state.activeItem, [name]:value}
		}));
	}
	*/
	handleChange = (e) => {        
        let name = e.target.name;
        let value = e.target.value;
		
        const activeItem = {...this.state.activeItem, [name]: value};
		const notesides = this.props.notesides;
		notesides[this.id] = activeItem;
		this.setState({activeItem,
			notesides: this.props.notesides});
		
    }
	
	render(){
		const {modal, setModal} = this.props;
		const toggle = () => setModal(!modal);
		const {saveNote} = this.props;
		const {id} = this.props;
		const {notesides} = this.props;
		return(
			<div>
			<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader> Note Item {"#"+id} </ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Date:</InputGroupText>
						</InputGroupAddon>
							<Input type="text" name="date" placeholder="YY-MM-DD" onChange={this.handleChange}/>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Text:</InputGroupText>
						</InputGroupAddon>
							<Input type="text" name="description" placeholder="Enter your text" onChange={this.handleChange}/>
						</InputGroup>						
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={(activeItem) => saveNote(notesides[id])}>Save</Button>
			</ModalFooter>
		</Modal>
		</div>
		);		
	}
}

export default ModalForm;
import React, {Component} from 'react';
import {Container, Button, Card, CardHeader, CardBody, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem,
 Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {IconContext} from 'react-icons';
import {FiEdit, FiTrash2} from 'react-icons/fi';
import ModalForm from './components/Modal';
/*
const ModalExample = (props) => {

  const {modal, setModal} = props;

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
*/
/*
const Div = (props) => (
    <div {...props}></div>
);

/*
const noteItems = [
	{
		id: 0,
		date: "2018-02-17",
		description: "Hello world"
	},
	{
		id: 1,
		date: "2015-04-19",
		description: "Hello JavaScript"
	},
];
*/
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			index: 0,
			activeItem: {
				date: '',
				description: '',
			},
			note: '',
            notesides: [],
            visible: false,
			modal: false,
            nextClick: -1,
            previousClick: 0,
        };
		 this.onChange = this.onChange.bind(this);
	}
	
	componentDidMount() {
		this.readApi();
	}
	
	onChange = (e) => {        
        let name = e.target.name;
        let value = e.target.value;
		
        const activeItem = {...this.state.activeItem, [name]: value};
		this.setState({activeItem});
    }
	
	readApi = () => {
		fetch('http://127.0.0.1:8000/api/notes/')
		.then(response => response.json())
		.then(data => {
			console.log('Successful');
			this.setState({notesides: data})})
		.catch(err => console.error('Error: ', err));
	}
	
	increaseIndex = () => {
       let next = this.state.index;	   
       this.setState({
			index: next
       });
	   return next;
    }
	
	addNote = () => {
        let notes = this.state.notesides;
		//let index = notes[notes.length -1].id + this.increaseIndex();
		//console.log(index);
		let date = this.state.activeItem.date;
		let description = this.state.activeItem.description;
        let note = this.state.activeItem;
		console.log(this.state.activeItem.description);
        note = {
				date: date,
				description: description
		};
		
        /*
        if(note.date == "" || note.text == ""){
            alert("Date & text must be filled out");
            return false;
        }*/
        notes.push(note);
        this.setState({
            notesides: notes,
        });
		this.handleApi(note);
    }
	
	handleApi = (item) => {
		fetch('http://127.0.0.1:8000/api/notes/', {
		  method: 'POST', // or 'PUT'
		  credentials: 'same-origin',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(item),
		}).then((response) => {
			return response.json()
		}).then(data => {
		  this.readApi();
		  console.log('Success:', data);
		}).catch((error) => {
		  console.error('Error:', error);
		});		
	}
	
	sortNote = () => {
        let sides = this.state.notesides;
        this.setState({
            notesides: sides.sort((a, b) => (a.date > b.date) ? 1 : -1),
            visible: true
        });
    }
	
	toggleList = () => {
        this.setState({visible: !this.state.visible});
    }
	
	setModal = () => {
		this.setState({modal: !this.state.modal});
	}
	
	nextNote = () => {
       let next = this.state.nextClick + 1;
       let noteNext = `${this.browse(next)}`;
       this.setState({
            note: noteNext,
			nextClick: next
       });
    }
    
    previousNote = () => {
		let previous = this.state.previousClick - 1;
        let notePrevious = `${this.browse(previous)}`;
        this.setState({
            note: notePrevious,
			previousClick: previous
        });
    }
    
    getModulo = (n, m) => {
        return ((n % m) + m) % m;
    }
    
    browse = (rotation) =>{
        let sides = this.state.notesides;
        let sidenum = sides.indexOf(sides[0]);
        try{
            if(sidenum < sides.length){
                sidenum += rotation;
            }
            else{
                sidenum = 0;
            }
            let noteItem = this.state.activeItem;
			noteItem = sides[this.getModulo(sidenum, sides.length)];
			console.log(noteItem);
			let note = this.state.note;
			note = `${noteItem.date}: ${noteItem.description}`;
			this.setState({
				note: note,
				activeItem: noteItem
			});
            return note;			
        }
        catch(err){
            console.log(err);
        }
    }
	
	deleteFromApi = (note) => {
		// eslint-disable-next-line
		fetch('http://127.0.0.1:8000/api/notes/' + `${note.id}`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((data) => {
			console.log('Removed:', data);
			this.readApi();
		}).catch((error) => {
			console.error('Error:', error);
		});
	}
	
	deleteNote = () => {
        let notes = this.state.notesides;
        let index = notes.indexOf(this.state.activeItem);
        //console.log(notes[index].id);
        if(index !== -1){
            this.deleteFromApi(notes[index]);
			//notes.splice(index, 1);
        }
        this.setState({
            notesides: notes
        });
        console.log(this.state.activeItem);    
    }
	
	editFromApi = (id) => {
		// eslint-disable-next-line
		fetch('http://127.0.0.1:8000/api/notes/' + `${id}`, {
			method: 'HEAD',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((data) => {
			//return data;
			console.log('Edited:', data);
			this.readApi();
		}).catch((error) => {
			console.error('Error:', error);
		});
		console.log("Save"+JSON.stringify(this.state.notesides[id]));
	}
	
	handleSubmit = item => {
		this.editFromApi(item);
        this.setModal();
        console.log("save" + JSON.stringify(item));
    };
	
	handleClick = (id) => {
		console.log('This is: ', id);
		this.setState({
			index: id
		});
		this.setModal();
	}
	
	render(){
		return (
			<main className="content">
			<h1 className="text-navy text-uppercase text-center my-4">Note app</h1>
			<Container>
			<Card>
				<CardHeader className="btn-group">                
					<Button color="info" onClick={this.addNote}>Add</Button>					
                    <Button color="info" onClick={this.previousNote}>Previous</Button>
                    <Button color="info" onClick={this.nextNote}>Next</Button>
                </CardHeader>
				<CardHeader className="btn-group">
					<Button color="info" onClick={this.toggleList}>Toggle</Button>
                    <Button color="info" onClick={this.sortNote}>Sort</Button>
                    <Button color="info" >Save</Button>
				</CardHeader>            
			
				<CardBody>
                <Form>
				<FormGroup>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                <InputGroupText>Date:</InputGroupText>
                </InputGroupAddon>
					<Input type="text" name="date" placeholder="YYYY-MM-DD" onChange={this.onChange}/>
                <InputGroupAddon addonType="prepend">
                <InputGroupText>Text:</InputGroupText>
                </InputGroupAddon>
					<Input type="text" name="description" placeholder="Enter your text" onChange={this.onChange}/>
               </InputGroup>               

                <br/>
				<Input type="textarea" name="text" placeholder="You will read your note here" value={this.state.note} readOnly onChange={this.browse}/>
                <br/>
				{this.state.visible ? (
				<ListGroup>                    
					{this.state.notesides.map((note, index) => (
						<ListGroupItem key={note.id}>
							{note.date}: {note.description}								
								<IconContext.Provider value={{color:"red"}}>
									<Button close onClick={(id) => this.deleteFromApi(note)}><FiTrash2/></Button>
								</IconContext.Provider>
								<IconContext.Provider value={{color:"grey"}}>
									<Button close onClick={(index) => this.handleClick(note.id)}><FiEdit/></Button>
								</IconContext.Provider>
						</ListGroupItem>)
					)}                   
                </ListGroup>) : null}
				</FormGroup>
                </Form>
				</CardBody>
			</Card>
			<ModalForm
			id={this.state.index}
			notesides={this.state.notesides}
			modal={this.state.modal}
			setModal={this.setModal}
			saveNote={(note) => this.editFromApi(this.state.index)}/>
            </Container>			
			</main>
		);
	}
}	

export default App;

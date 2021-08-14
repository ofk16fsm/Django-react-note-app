import React, {Component} from 'react';

const Div = (props) => {
	return(
		<div {...props}></div>
	);
};

const Button = (props) => {
    return(
			<input type={props.type} value={props.name} className={props.className} onClick={props.onClick} {...props} />
        );
};
	
const Textfield = (props) => {
	return(
		<input type={props.type} className={props.className} name={props.name} placeholder={props.placeholder} {...props}/>      
	);
};

const Form = (props) => {
	return(
		<form {...props}></form>
	);
}
/*
const Textarea = (props) => {
	return(
		<textarea name={props.name} value={props.value} className={props.className} readOnly {...props}/>
	);
};
*/
const List = (props) => {
	return(
		<ul className={props.className} {...props}>{props.listvalue} </ul>
	);
}

const ListItem = (props) => {
	return(
		<li className={props.className}>{props.item}</li>
	);
}

class Tags extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
        return (
			<Div {...this.props}>

            <Button {...this.props}/>
			<Textfield {...this.props}/>
			<Form {...this.props}/>
			<List {...this.props} />
			<ListItem {...this.props} />
			</Div>
        );
    }
}

export default Tags;
import React, {Component} from 'react';

class Button extends Component {
	// eslint-disable-next-line
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <input type={this.props.type} value={this.props.name} className={this.props.className} onClick={this.props.onClick} />
        );
    }
}

export default Button;
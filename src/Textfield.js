import React from 'react';

const Textfield = (props) => {
    return(
    <input type={props.type} className={props.className} name={props.name} placeholder={props.placeholder} {...props}/>      
    );
};

export default Textfield;
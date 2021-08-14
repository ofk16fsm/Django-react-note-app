import React from 'react';

const List = (props) =>  {
    return(
		<ul className={props.className} {...props}>{props.listvalue} </ul>
    );
};

export default List;
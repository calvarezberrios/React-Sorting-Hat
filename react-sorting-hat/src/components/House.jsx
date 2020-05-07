import React from 'react';

const House = props => {
    return (
        <div>
            <h2>{`Welcome to the ${props.user.house} house, You must be ${props.user.name}`}</h2>
        </div>
    );
};

export default House;
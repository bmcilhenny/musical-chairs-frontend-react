import React from 'react';
import {Message} from 'semantic-ui-react';

const ErrorMessage = ({error}) => {
    return (
        <Message negative>
            <Message.Header>There was an error fetching some data.</Message.Header>
            <p>{error}</p>
        </Message>
    )
}

export default ErrorMessage;

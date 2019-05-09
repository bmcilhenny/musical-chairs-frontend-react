import React from 'react';
import {Message} from 'semantic-ui-react';

const ErrorMessage = ({error}) => {
    return (
        <Message negative>
            <Message.Header>There was an error fetching some data. </Message.Header><span>Try refreshing the page.</span>
            <p>{error.message}</p>
        </Message>
    )
}

export default ErrorMessage;

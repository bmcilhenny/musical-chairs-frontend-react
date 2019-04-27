import React, {Fragment} from 'react';
import { Button } from 'semantic-ui-react';

const Login = ({handleLogin}) => {
    return (
        <Fragment>
           <Button positive onClick={handleLogin}>Log in</Button>
        </Fragment>
    )
}

export default Login;
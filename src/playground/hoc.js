//Higher Order  Component (HOC) - A component (HOC) that renders another component


import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
);

//This is the HOC
//the {...props} means that u are taking all the props on the higher component(AdminInfo) and putting it into the lower component(WrappedComponent)
const withAdminWarning = (WrappedComponent) => {
return (props) => (
    <div>
    {props.isAdmin && <p>This is private info. Please don't share</p>}
    <WrappedComponent {...props}/>
    </div>
)
};

const AdminInfo = withAdminWarning(Info);   

//ReactDOM.render(<AdminInfo isAdmin = {false} info = "This are the details" />, document.getElementById('app'));


//----Exercise -------//


const requireAuthentication = (WrappedComponent) => {
  //notice the return => "(" note that it is not "{"
    return (props) => (
        <div>
        {props.isAuthenticated ? (
            <WrappedComponent {...props} />
        ): (<p>Please login to view the info</p>) }
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated = {true} info = "There are the details" />, document.getElementById('app'));
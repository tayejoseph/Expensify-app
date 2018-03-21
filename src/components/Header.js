import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
    <header className = "header">
    <div className = "content-container">
    <div className = "header__content">
    <Link className = "header__title" to="/dashboard">
        <h1>Expensify</h1>
    </Link>
    <button className = "button button--link"
    onClick = {startLogout}>Logout</button>
    </div>
    </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
//the connect() enables us to be able to use the dispatch func
 startLogout: () => dispatch(startLogout())
});

// I think we use this connect() so that we can be able to use the dispatch
export default connect(undefined, mapDispatchToProps)(Header);
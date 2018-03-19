import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dash Board</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick = {startLogout}>Logout</button>
        </header>
);

const mapDispatchToProps = (dispatch) => ({
//the connect() enables us to be able to use the dispatch func
 startLogout: () => dispatch(startLogout())
});

// I think we use this connect() so that we can be able to use the dispatch
export default connect(undefined, mapDispatchToProps)(Header);
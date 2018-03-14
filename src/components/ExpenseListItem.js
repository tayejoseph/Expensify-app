import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
//the link to id is gotten from the destructure id in the object above
    <div>
    <Link to = {`/edit/${id}`}>
    <h3>{description}</h3>
    </Link>
    <p>{amount} - {createdAt}</p>
    </div>
);


export default ExpenseListItem;